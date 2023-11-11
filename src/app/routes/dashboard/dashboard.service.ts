import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { GlobalService } from "@shared/services";
import { Router, ActivatedRoute } from "@angular/router";

import { sunBurstAttackData } from "../../data/demo/dashboard/sunBurstAttackData";
import { attackTreeChartData } from "../../data/demo/dashboard/attackTreeChartData";

export interface NidsElement {
  name: string;
  position: number;
  weight: string;
  symbol: number;
  attack: string;
}

const ELEMENT_DATA: NidsElement[] = [
  {
    position: 1,
    name: "192.168.1.190",
    weight: "192.168.1.255",
    symbol: 9600,
    attack: "Ransomware",
  },
  {
    position: 2,
    name: "192.168.1.190",
    weight: "224.0.0.252",
    symbol: 9600,
    attack: "Dos",
  },
  {
    position: 3,
    name: "192.168.1.190",
    weight: "224.0.0.251",
    symbol: 9600,
    attack: "Dos",
  },
  {
    position: 4,
    name: "192.168.1.190",
    weight: "203.119.86.101",
    symbol: 9200,
    attack: "DDos",
  },
  {
    position: 5,
    name: "192.168.1.193",
    weight: "ff02::fb",
    symbol: 9600,
    attack: "Password",
  },
  {
    position: 6,
    name: "192.168.1.193",
    weight: "ff02::1:3",
    symbol: 9600,
    attack: "Injection",
  },
  {
    position: 7,
    name: "192.168.1.193",
    weight: "192.5.6.30",
    symbol: 9600,
    attack: "Dos",
  },
];

const MESSAGES = [
  {
    img: "assets/images/avatars/avatar-1.jpg",
    subject: "Ransomware Attack",
    content: `Ransomware is a type of malware from cryptovirology that threatens to publish the 
    victim's personal data or permanently block access to it unless a ransom is paid.`,
  },
  {
    img: "assets/images/avatars/avatar-2.jpg",
    subject: "Dos Attack",
    content: `A Denial-of-Service (DoS) attack is an attack meant to shut down a machine or network, making 
    it inaccessible to its intended users. DoS attacks accomplish this by flooding the target with traffic, or sending it information that triggers a crash.`,
  },
  {
    img: "assets/images/avatars/avatar-3.jpg",
    subject: "DDos Attack",
    content: `In a distributed denial-of-service attack (DDoS attack), the incoming traffic flooding the victim originates from many different sources. More sophisticated 
    strategies are required to mitigate against this type of attack, as simply attempting to block a single source is insufficient because there are multiple sources.`,
  },
  {
    img: "assets/images/avatars/avatar-4.jpg",
    subject: "Password Attack",
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: "assets/images/avatars/avatar-6.jpg",
    subject: "Injection Attack",
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
];

@Injectable()
export class DashboardService {
  stats: any = [
    {
      title: this.translate.stream("dashboard.total_traffic"),
      amount: "1,291,922",
      color: "bg-teal-500",
      icon: "network_check",
    },
    {
      title: this.translate.stream("dashboard.total_ip"),
      amount: "180,200",
      color: "bg-indigo-500",
      icon: "room",
    },
    {
      title: this.translate.stream("dashboard.total_ip_bytes"),
      amount: "70,205",
      color: "bg-blue-500",
    },
    {
      title: this.translate.stream("dashboard.threat_categories"),
      amount: "70,205",
      color: "bg-blue-500",
      icon: "category",
    },
    {
      title: this.translate.stream("dashboard.countries"),
      amount: "10",
      color: "bg-teal-500",
    },
  ];

  charts = [
    {
      chart: {
        height: 350,
        type: "area",
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      series: [
        {
          name: "UV",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Download",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      xaxis: {
        type: "datetime",
        categories: [
          "2019-11-24T00:00:00",
          "2019-11-24T01:30:00",
          "2019-11-24T02:30:00",
          "2019-11-24T03:30:00",
          "2019-11-24T04:30:00",
          "2019-11-24T05:30:00",
          "2019-11-24T06:30:00",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
    },
    {
      chart: {
        height: 350,
        type: "radar",
      },
      series: [
        {
          name: "Weekly Revenue",
          data: [20, 100, 40, 30, 50, 80, 33],
        },
      ],
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val;
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (val: number, i: number) => {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
        },
      },
    },
  ];

  attackDistPieChartHC: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Attack Distribution",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("attack_type", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  weirdTrafficPieChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Weird Connection",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          //   {
          //   name: 'active_connection_reuse',
          //   y: 70.67,
          //   sliced: true,
          //   selected: true
          // }, {
          //   name: 'connection_originator_SYN_ack',
          //   y: 14.77
          // },  {
          //   name: 'bad_TCP_checksum',
          //   y: 4.86
          // }, {
          //   name: 'data_before_established',
          //   y: 2.63
          // }, {
          //   name: 'inappropriate_FIN',
          //   y: 1.53
          // }
        ],
      },
    ],
    lang: {
      noData: "No Data To Display On Date Range",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030",
      },
    },
  };

  topSenderIpTrafficChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Sender IP Traffic",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("src_ip", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topIpReceiverTrafficChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Receiver IP Traffic",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("dst_ip", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topUrlTrafficChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Url Traffic",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("dns_query", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topProtocolChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Protocol",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("proto", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topSenderByBytesChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Sender By Bytes",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("src_ip_bytes", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topReceiverByBytesChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Receiver By Bytes",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("dst_ip_bytes", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topSenderByCountriesChartHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Sender By Countries",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("src_cc", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topReceiverByCountriesHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top Receiver By Countries",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
        events: {
          click: (event) => {
            let fieldValue = event.point.name;
            this.piechartLinking("resp_cc", fieldValue);
          },
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  topIpByAttacksHC = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Top IP By Attacks",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        type: undefined,
        data: [
          {
            name: "Normal",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Password",
            y: 14.77,
          },
          {
            name: "Dos",
            y: 4.86,
          },
          {
            name: "DDos",
            y: 2.63,
          },
          {
            name: "Ransomware",
            y: 1.53,
          },
        ],
      },
    ],
  };

  attackTreeHC = {
    chart: {
      type: "networkgraph",
      height: "100%",
    },
    title: {
      text: "Attack Network Tree",
    },
    subtitle: {
      text: "Descibing the network relationship via attacks and ip address",
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9,
        },
      },
    },
    series: [
      {
        accessibility: {
          enabled: false,
        },
        dataLabels: {
          enabled: true,
          linkFormat: "",
        },
        id: "lang-tree",
        data: attackTreeChartData.sort(),
      },
    ],
  };

  attackDistSunBurstHC = {
    chart: {
      height: "100%",
    },

    // Let the center circle be transparent
    colors: ["transparent"].concat(Highcharts.getOptions().colors),

    title: {
      text: "Attack Network Sunburst",
    },

    subtitle: {
      text: 'Source <a href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>',
    },

    series: [
      {
        type: "sunburst",
        data: sunBurstAttackData,
        name: "Root",
        allowDrillToNode: true,
        cursor: "pointer",
        dataLabels: {
          format: "{point.name}",
          filter: {
            property: "innerArcLength",
            operator: ">",
            value: 16,
          },
          rotationMode: "circular",
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 64,
              },
            },
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.5,
            },
          },
        ],
      },
    ],

    tooltip: {
      headerFormat: "",
      pointFormat:
        "The population of <b>{point.name}</b> is <b>{point.value}</b>",
    },
  };

  attackTimelineHC = {
    chart: {
      height: 400,
    },

    title: {
      text: "Network Traffic",
    },

    subtitle: {
      text: "Showing Traffic Based On Response Time",
    },

    rangeSelector: {
      selected: 1,
    },

    series: [
      {
        name: "Response Time",
        data: [],
        type: "area",
        threshold: null,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 300,
            },
            subtitle: {
              text: null,
            },
            navigator: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private globalSvc: GlobalService,
    private router: Router
  ) {}

  getData() {
    return ELEMENT_DATA;
  }

  getMessages() {
    return MESSAGES;
  }

  getCharts() {
    return this.charts;
  }

  getStats() {
    return this.stats;
  }

  getAttackDistributionHC() {
    return this.attackDistPieChartHC;
  }

  getWeirdTrafficHC() {
    return this.weirdTrafficPieChartHC;
  }

  getAttackTreeHC() {
    return this.attackTreeHC;
  }

  getAttackDistSunBurstHC() {
    return this.attackDistSunBurstHC;
  }

  getTopSenderIpTrafficChartHC() {
    return this.topSenderIpTrafficChartHC;
  }

  getTopReceiverIpTrafficChartHC() {
    return this.topIpReceiverTrafficChartHC;
  }

  getTopUrlTrafficChartHC() {
    return this.topUrlTrafficChartHC;
  }

  getTopProtocolChartHC() {
    return this.topProtocolChartHC;
  }

  getTopSenderByBytesChartHC() {
    return this.topSenderByBytesChartHC;
  }

  getTopReceiverByBytesChartHC() {
    return this.topReceiverByBytesChartHC;
  }

  getTopSenderByCountriesChartHC() {
    return this.topSenderByCountriesChartHC;
  }

  getTopReceiverByCountriesHC() {
    return this.topReceiverByCountriesHC;
  }

  getTopIpByAttacksHC() {
    return this.topIpByAttacksHC;
  }

  getAttackTimelineHC() {
    return this.attackTimelineHC;
  }

  generateAttackTreeData(data) {
    let newTreeData = [],
      looperKeys = ["dst_ip", "attack_type"];
    // data['attack_type']['buckets'].forEach(parentData => {
    //   this.recursiveAttackTreeGenerator('src_ip', parentData, newTreeData, looperKeys)
    // });
    // newTreeData= newTreeData.sort();
    // data['attack_type']['buckets']= data['attack_type']['buckets'].filter(x=>x.key!=='normal')
    newTreeData = this.attackTreeGenerator("attack_type", data, newTreeData);
    return newTreeData;
  }

  recursiveAttackTreeGenerator(key, data, newTreeData, looperKeys) {
    data[key]["buckets"].forEach((childData) => {
      newTreeData.push([data.key, childData.key]);
      let nextKey = this.intersection(Object.keys(childData), looperKeys);
      if (nextKey.length > 0) {
        this.recursiveAttackTreeGenerator(
          nextKey[0],
          childData,
          newTreeData,
          looperKeys
        );
      }
    });
    return newTreeData;
  }

  intersection(arr1, arr2) {
    return arr1.filter((elem) => arr2.includes(elem));
  }

  attackTreeGenerator(key, data, newTreeData) {
    data[key]["buckets"].forEach((element1) => {
      newTreeData.push(["Network Attacks", element1.key]);
      element1["src_ip"]["buckets"].forEach((element2) => {
        newTreeData.push([element1.key, element2.key]);
        element2["dst_ip"]["buckets"].forEach((element3) => {
          newTreeData.push([element2.key, element3.key]);
          element3["attack_type"]["buckets"].forEach((element4) => {
            newTreeData.push([element3.key, element4.key]);
          });
        });
      });
    });
    return newTreeData;
  }

  generateAttackSunBurstData(data) {
    let newTreeData = [],
      looperKeys = ["dst_ip", "attack_type"];
    // data['attack_type']['buckets'].forEach(parentData => {
    //   this.recursiveAttackTreeGenerator('src_ip', parentData, newTreeData, looperKeys)
    // });
    // newTreeData= newTreeData.sort();
    // data['attack_type']['buckets']= data['attack_type']['buckets'].filter(x=>x.key!=='normal')
    newTreeData = this.attackSunBurstGenerator(
      "attack_type",
      data,
      newTreeData
    );
    return newTreeData;
  }

  attackSunBurstGenerator(key, data, newTreeData) {
    newTreeData.push({
      id: "Network Attacks" + 1,
      parent: "",
      name: "Network Attacks",
    });
    data[key]["buckets"].forEach((element1) => {
      // newTreeData.push(['Network Attacks', element1.key]);
      newTreeData.push({
        id: element1.key + 1,
        parent: "Network Attacks" + 1,
        name: element1.key,
        value: element1.doc_count,
      });
      element1["src_ip"]["buckets"].forEach((element2) => {
        // newTreeData.push([element1.key, element2.key]);

        newTreeData.push({
          id: element2.key + 1,
          parent: element1.key + 1,
          name: element2.key,
          value: element2.doc_count,
        });

        element2["dst_ip"]["buckets"].forEach((element3) => {
          // newTreeData.push([element2.key, element3.key]);
          newTreeData.push({
            id: element3.key + 1,
            parent: element2.key + 1,
            name: element3.key,
            value: element3.doc_count,
          });
          // element3['attack_type']['buckets'].forEach(element4 => {
          //   // newTreeData.push([element3.key, element4.key]);
          //   newTreeData.push({
          //     id: element4.key+1,
          //     parent: element3.key+1,
          //     name: element4.key,
          //     value: element4.doc_count
          //   });
          // });
        });
      });
    });
    return newTreeData;
  }

  piechartLinking(fieldKey, fieldValue) {
    if (fieldValue) {
      let temp = {};
      temp[fieldKey] = fieldValue;
      let query_param = {
        field_query: JSON.stringify(temp),
        size: 10, //Adding size to override exiting attribute in queryparam and apply only 10 record in analyst page
      };
      let baseUrl = this.globalSvc.getBaseUrl();
      this.globalSvc.redirectToNewWindow(
        baseUrl + "/traffic-analyzer",
        query_param
      );
    }
  }

  generateAttackTimelineData(data) {
    return data;
  }
}
