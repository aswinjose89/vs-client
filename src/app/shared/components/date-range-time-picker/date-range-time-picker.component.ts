import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import * as moment from "moment";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Component({
  selector: "shd-date-range-time-picker",
  templateUrl: "./date-range-time-picker.component.html",
  styleUrls: ["./date-range-time-picker.component.scss"],
})
export class DateRangeTimePickerComponent implements OnInit {
  @Output() change = new EventEmitter<string>();
  @Input() model: { startDate: moment.Moment; endDate: moment.Moment };
  alwaysShowCalendars: boolean;
  title = this.translate.stream("shared.date_range");
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };
  invalidDates: moment.Moment[] = [
    moment().add(2, "days"),
    moment().add(3, "days"),
    moment().add(5, "days"),
  ];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, "day"));
  };

  constructor(private translate: TranslateService) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit(): void {}

  dateRangeChange(data) {
    this.change.emit(data);
  }
}
