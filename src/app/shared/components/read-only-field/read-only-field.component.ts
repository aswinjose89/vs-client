import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "shd-read-only-field",
  templateUrl: "./read-only-field.component.html",
  styleUrls: ["./read-only-field.component.scss"],
})
export class ReadOnlyFieldComponent implements OnInit {
  @Input() value: string;
  @Input() title: string;
  @Input() comment: string;
  @Input() class: string;
  @Input() formControl?: any;

  constructor() {}

  ngOnInit(): void {
    if (!this.formControl) {
      // assign form control if its not defined otherwise its throw error
      this.formControl = new FormControl();
    }
    if (this.value === undefined || (this.value && this.value === "")) {
      this.value = "-";
    }
  }
}
