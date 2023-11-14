import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import * as moment from "moment";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { GlobalService } from "@shared/services";
import { DashboardService } from "./dashboard.service";
import { ApiService } from "../../core/services";
import { DashboardConstant } from "./dashboard.constant";
import { dashboardConfig } from "./configs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  // chart1 = null;
  // chart2 = null;

  stats = this.dashboardSrv.getStats();

  dashBoardHighcharts = {};
  attackDistChart = null;
  geoMapData = null;

  selectedDateRange: any = {
    startDate: moment()
      .subtract(DashboardConstant.defaultOnloadDays, "days")
      .startOf("day"),
    endDate: moment().endOf("day"),
  };

  public predictedDataChange = new BehaviorSubject(null);

  constructor(
    private dashboardSrv: DashboardService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    public dialog: MatDialog,
    private globalSvc: GlobalService,
    private translate: TranslateService
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit() {
    this.OnLoad();
    // this.langTranslator();
  }

  OnLoad() {
    // if (this.selectedDateRange.startDate && this.selectedDateRange.endDate) {
    //   let inputData= {
    //     startDate: moment(this.selectedDateRange.startDate._d).format(DashboardConstant.dateTimeFormat),
    //     endDate: moment(this.selectedDateRange.endDate._d).format(DashboardConstant.dateTimeFormat),
    //     size: DashboardConstant.size
    //   }
    //   this.globalSvc.updateQueryParam(['dashboard'], inputData);
    //   this.OnLoadApi(inputData);
    // }
  }

  OnLoadApi(inputData = {}) {
    this.getNidsDetailsApi(inputData);
    this.getPredictedNidsApi(inputData);
    // this.getAttackAggregationApi(inputData);
    this.getZeekAggregationApi(inputData);
  }

  langTranslator() {
    let hcLangMap = new Map([
      ["attackDistChart", ["dashboard.attack_distribution"]],
      ["weirdTrafficChart", ["dashboard.weird_connection"]],
      ["topSenderIpTrafficChart", ["dashboard.top_sender_ip_traffic"]],
      ["topReceiverIpTrafficChart", ["dashboard.top_receiver_ip_traffic"]],
      ["topUrlTrafficChart", ["dashboard.top_url_traffic"]],
      ["topProtocolChart", ["dashboard.top_protocol"]],
      ["topSenderByBytesChart", ["dashboard.top_sender_by_bytes"]],
      ["topReceiverByBytesChart", ["dashboard.top_receiver_by_bytes"]],
      ["topSenderByCountriesChart", ["dashboard.top_sender_by_countries"]],
      ["topReceiverByCountries", ["dashboard.top_receiver_by_countries"]],
      ["attackTimeLineChart", ["dashboard.traffic_timeline"]],
    ]);
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
      hcLangMap.forEach((obj, key) => {
        this.dashBoardHighcharts[key].setTitle({
          text: this.translate.instant(obj[0]),
        });
      });
      this.dashBoardHighcharts["attackTimeLineChart"].setSubtitle({
        text: this.translate.instant("dashboard.traffic_timeline.subtitle"),
      });
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.loadOutsideAngular();
  }

  dateRangeChange(data) {
    if (data.startDate && data.endDate) {
      let inputData = {
        startDate: moment(data.startDate.$d).format(
          DashboardConstant.dateTimeFormat
        ),
        endDate: moment(data.endDate.$d).format(
          DashboardConstant.dateTimeFormat
        ),
        size: DashboardConstant.size,
      };
      this.globalSvc.updateQueryParam(["dashboard"], inputData);
      this.OnLoadApi(inputData);
    }
  }

  getNidsDetailsApi(inputData: any = {}) {
    this.api.get("nids/network_details", inputData).subscribe(
      (data) => {
        if (data.status == "success") {
          this.bindDashboardGeneralData(data["result"]);
          this.cdr.detectChanges();
        }
      },
      (error) => {
        this.api.errorResponse(error);
      }
    );
  }

  getPredictedNidsApi(inputData: any = {}) {
    this.api.get("nids/attack_prediction", inputData).subscribe(
      (data) => {
        if (data.status == "success") {
          let records = data.result["hits"]["hits"].map((x) => x._source);
          if (records.length > 0) {
            this.predictedDataChange.next(records);
            let appSettings = this.globalSvc.getAppSettings();
            if (appSettings.is_app_demo_mode == "True") {
              Highcharts.getJSON(
                "https://demo-live-data.highcharts.com/aapl-c.json",
                (timelineArr) => {
                  this.bindDashboardTimelineChart(timelineArr);
                  this.cdr.detectChanges();
                }
              );
            } else {
              let timelineArr = [];
              records.forEach((rec) => {
                let millisecondstime = moment(rec.modified_date).valueOf();
                // rec.duration=Math.round(Math.random() * 100)
                if (rec.duration != null && rec.duration < 200) {
                  timelineArr.push([millisecondstime, rec.duration]);
                }
              });
              this.bindDashboardTimelineChart(timelineArr);
              this.cdr.detectChanges();
            }
          } else {
            this.predictedDataChange.next("NO_RECORD");
          }
        }
      },
      (error) => {
        this.api.errorResponse(error);
      }
    );
  }

  getAttackAggregationApi(inputData: any = {}) {
    this.api.get("nids/attack_aggregation", inputData).subscribe(
      (data) => {
        if (data.status == "success") {
          this.cdr.detectChanges();
        }
      },
      (error) => {
        this.api.errorResponse(error);
      }
    );
  }

  getZeekAggregationApi(inputData: any = {}) {
    inputData["field_query"] = JSON.stringify({
      log: "weird",
      group_by: "name",
    }); //Provide log file name
    this.api.get("nids/zeek_aggregation", inputData).subscribe(
      (data) => {
        if (data.status == "success") {
          this.bindZeekDataChart(data.result);
          this.cdr.detectChanges();
        }
      },
      (error) => {
        this.api.errorResponse(error);
      }
    );
  }

  tableData(records) {
    let processedRecords = [];
    records.forEach((val, idx) => {
      let temp = {};
      temp["position"] = idx + 1;
      temp["_id"] = val._id;
      processedRecords.push({ ...temp, ...val._source });
    });
    return processedRecords;
  }

  loadOutsideAngular() {
    this.loadCharts();
  }

  bindZeekDataChart(result) {
    this.updatePieChartHC(
      result["agg_results"]["weird_name"]["buckets"],
      "weirdTrafficChart"
    );
  }

  bindDashboardGeneralData(result) {
    this.stats[0]["amount"] = result["total_records"];
    this.stats[0]["left"] = {
      label: this.translate.stream("dashboard.total_traffic.benign"),
      value: result["agg_results"]["attack_type"]["buckets"]
        .filter((x) => x.key == "normal")
        .map((y) => y.doc_count)
        .reduce((partialSum, a) => partialSum + a, 0),
    };
    this.stats[0]["right"] = {
      label: this.translate.stream("dashboard.total_traffic.anomaly"),
      value: result["agg_results"]["attack_type"]["buckets"]
        .filter((x) => x.key != "normal")
        .map((y) => y.doc_count)
        .reduce((partialSum, a) => partialSum + a, 0),
    };

    this.stats[1]["amount"] =
      result["agg_results"]["src_ip"]["buckets"].length +
      result["agg_results"]["dst_ip"]["buckets"].length;
    this.stats[1]["left"] = {
      label: this.translate.stream("dashboard.total_ip.src"),
      value: `${result["agg_results"]["src_ip"]["buckets"].length}`,
    };
    this.stats[1]["right"] = {
      label: this.translate.stream("dashboard.total_ip.dst"),
      value: `${result["agg_results"]["dst_ip"]["buckets"].length}`,
    };
    this.stats[2]["amount"] =
      (result["agg_results"]["total_src_bytes"]["value"] +
        result["agg_results"]["total_dst_bytes"]["value"]) /
        1000 +
      " kbps"; //1 kbps= 1000 bytes(In decimal)
    this.stats[2]["left"] = {
      label: this.translate.stream("dashboard.total_ip_bytes.src"),
      value: `${
        result["agg_results"]["total_src_bytes"]["value"] / 1000 + " kbps"
      }`,
    };
    this.stats[2]["right"] = {
      label: this.translate.stream("dashboard.total_ip_bytes.dst"),
      value: `${
        result["agg_results"]["total_dst_bytes"]["value"] / 1000 + " kbps"
      }`,
    };
    this.stats[3]["amount"] =
      result["agg_results"]["attack_type"]["buckets"].length;
    this.stats[3]["left"] = {
      label: this.translate.stream("dashboard.threat_categories.benign"),
      value: `${
        result["agg_results"]["attack_type"]["buckets"].filter(
          (x) => x.key == "normal"
        ).length
      }`,
    };
    this.stats[3]["right"] = {
      label: this.translate.stream("dashboard.threat_categories.anomaly"),
      value: `${
        result["agg_results"]["attack_type"]["buckets"].filter(
          (x) => x.key != "normal"
        ).length
      }`,
    };

    this.stats[4]["amount"] =
      result["agg_results"]["total_src_cc"]["buckets"].length +
      result["agg_results"]["total_dst_cc"]["buckets"].length;
    this.stats[4]["left"] = {
      label: this.translate.stream("dashboard.countries.src"),
      value: `${result["agg_results"]["total_src_cc"]["buckets"].length}`,
    };
    this.stats[4]["right"] = {
      label: this.translate.stream("dashboard.countries.dst"),
      value: `${result["agg_results"]["total_dst_cc"]["buckets"].length}`,
    };

    this.bindGeneralChartData(result);
  }

  bindGeneralChartData(result) {
    this.updatePieChartHC(
      result["agg_results"]["attack_type"]["buckets"],
      "attackDistChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_src_ip"]["buckets"],
      "topSenderIpTrafficChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_dst_ip"]["buckets"],
      "topReceiverIpTrafficChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_dns_query"]["buckets"],
      "topUrlTrafficChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_proto"]["buckets"],
      "topProtocolChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_src_ip_by_bytes"]["buckets"],
      "topSenderByBytesChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_dst_ip_by_bytes"]["buckets"],
      "topReceiverByBytesChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_src_cc"]["buckets"],
      "topSenderByCountriesChart"
    );
    this.updatePieChartHC(
      result["agg_results"]["top_resp_cc"]["buckets"],
      "topReceiverByCountries"
    );
  }

  updatePieChartHC(data, chartName) {
    //Show top Source traffic IP
    let updateData = data;
    updateData = updateData.map((x) => {
      return { name: x.key, y: x.doc_count };
    });
    if (updateData.length > 0) {
      updateData[0]["sliced"] = true;
      updateData[0]["selected"] = true;
    }
    this.dashBoardHighcharts[chartName].series[0].update({
      data: updateData,
    });
  }

  bindDashboardTreeChart(result) {
    let treeData = this.dashboardSrv.generateAttackTreeData(result);
    this.dashBoardHighcharts["attackNetworkTreeChart"].series[0].update({
      data: treeData,
    });
  }

  bindDashboardSunBurstChart(result) {
    let sunBurstData = this.dashboardSrv.generateAttackSunBurstData(result);
    this.dashBoardHighcharts["attackDistSunBurstChart"].series[0].update({
      data: sunBurstData,
    });
  }

  bindDashboardTimelineChart(result) {
    let timelineData = this.dashboardSrv.generateAttackTimelineData(result);
    this.dashBoardHighcharts["attackTimeLineChart"].series[0].update({
      data: timelineData,
    });
  }

  loadCharts() {
    // this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    // this.chart1.render();
    this.loadHighCharts();
  }

  loadHighCharts() {
    // this.attackDistChartRender();
    // this.topCategoriesRender();
    // this.timelineChartRender();
  }

  attackDistChartRender() {
    this.dashBoardHighcharts["attackDistChart"] = Highcharts.chart(
      document.querySelector("#attackDistChart"),
      this.dashboardSrv.getAttackDistributionHC()
    );
    this.dashBoardHighcharts["attackDistChart"].render();
  }

  attackTreeChartRender() {
    Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
      var colors = Highcharts.getOptions().colors,
        i = 0,
        nodes = {};

      if (
        this instanceof Highcharts.seriesTypes.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          if (link[0] === "Network Attacks") {
            nodes["Network Attacks"] = {
              id: "Network Attacks",
              marker: {
                radius: 30,
              },
            };
            nodes[link[1]] = {
              id: link[1],
              marker: {
                radius: 20,
              },
              color: colors[i++],
            };
          } else if (nodes[link[0]] && nodes[link[0]].color) {
            nodes[link[1]] = {
              id: link[1],
              color: nodes[link[0]].color,
            };
          }
        });

        e.options.nodes = Object.keys(nodes).map(function (id) {
          return nodes[id];
        });
      }
    });
    this.dashBoardHighcharts["attackNetworkTreeChart"] = Highcharts.chart(
      document.querySelector("#attackTreeChart"),
      this.dashboardSrv.getAttackTreeHC()
    );
    this.dashBoardHighcharts["attackNetworkTreeChart"].render();
  }

  attackDistSunBurstChartRender() {
    this.dashBoardHighcharts["attackDistSunBurstChart"] = Highcharts.chart(
      document.querySelector("#attackDistSunBurstChart"),
      this.dashboardSrv.getAttackDistSunBurstHC()
    );
    this.dashBoardHighcharts["attackDistSunBurstChart"].render();
  }

  topCategoriesRender() {
    this.dashBoardHighcharts["topSenderIpTrafficChart"] = Highcharts.chart(
      document.querySelector("#topSenderIpTrafficChart"),
      this.dashboardSrv.getTopSenderIpTrafficChartHC()
    );
    this.dashBoardHighcharts["topSenderIpTrafficChart"].render();

    this.dashBoardHighcharts["topReceiverIpTrafficChart"] = Highcharts.chart(
      document.querySelector("#topReceiverIpTrafficChart"),
      this.dashboardSrv.getTopReceiverIpTrafficChartHC()
    );
    this.dashBoardHighcharts["topReceiverIpTrafficChart"].render();

    this.dashBoardHighcharts["topUrlTrafficChart"] = Highcharts.chart(
      document.querySelector("#topUrlTrafficChart"),
      this.dashboardSrv.getTopUrlTrafficChartHC()
    );
    this.dashBoardHighcharts["topUrlTrafficChart"].render();

    this.dashBoardHighcharts["topProtocolChart"] = Highcharts.chart(
      document.querySelector("#topProtocolChart"),
      this.dashboardSrv.getTopProtocolChartHC()
    );
    this.dashBoardHighcharts["topProtocolChart"].render();

    this.dashBoardHighcharts["topSenderByBytesChart"] = Highcharts.chart(
      document.querySelector("#topSenderByBytesChart"),
      this.dashboardSrv.getTopSenderByBytesChartHC()
    );
    this.dashBoardHighcharts["topSenderByBytesChart"].render();

    this.dashBoardHighcharts["topReceiverByBytesChart"] = Highcharts.chart(
      document.querySelector("#topReceiverByBytesChart"),
      this.dashboardSrv.getTopReceiverByBytesChartHC()
    );
    this.dashBoardHighcharts["topReceiverByBytesChart"].render();

    this.dashBoardHighcharts["topSenderByCountriesChart"] = Highcharts.chart(
      document.querySelector("#topSenderByCountriesChart"),
      this.dashboardSrv.getTopSenderByCountriesChartHC()
    );
    this.dashBoardHighcharts["topSenderByCountriesChart"].render();

    this.dashBoardHighcharts["topReceiverByCountries"] = Highcharts.chart(
      document.querySelector("#topReceiverByCountries"),
      this.dashboardSrv.getTopReceiverByCountriesHC()
    );
    this.dashBoardHighcharts["topReceiverByCountries"].render();

    this.dashBoardHighcharts["topReceiverByCountries"] = Highcharts.chart(
      document.querySelector("#topReceiverByCountries"),
      this.dashboardSrv.getTopReceiverByCountriesHC()
    );
    this.dashBoardHighcharts["topReceiverByCountries"].render();

    this.dashBoardHighcharts["weirdTrafficChart"] = Highcharts.chart(
      document.querySelector("#weirdTrafficChart"),
      this.dashboardSrv.getWeirdTrafficHC()
    );
    this.dashBoardHighcharts["weirdTrafficChart"].render();
  }

  timelineChartRender() {
    this.dashBoardHighcharts["attackTimeLineChart"] = Highcharts.stockChart(
      document.querySelector("#attackTimeLineChart"),
      this.dashboardSrv.getAttackTimelineHC()
    );
    this.dashBoardHighcharts["attackTimeLineChart"].render();
  }

  ngOnDestroy() {
    let hcKeys = Object.keys(this.dashBoardHighcharts);
    if (hcKeys.length > 0) {
      hcKeys.forEach((key) => {
        this.dashBoardHighcharts[key].destroy();
      });
    }
  }
}
