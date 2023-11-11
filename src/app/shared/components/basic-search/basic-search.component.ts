import { Component, OnInit, forwardRef } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from "@angular/animations";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "shd-basic-search",
  templateUrl: "./basic-search.component.html",
  styleUrls: ["./basic-search.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicSearchComponent),
      multi: true,
    },
  ],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(600)]),
    ]),
  ],
})
export class BasicSearchComponent implements ControlValueAccessor, OnInit {
  modelValue: string;
  // Function to call when the value changes.
  onChange: any = () => {};

  // Function to call when the input is touched.
  onTouched: any = () => {};

  showSearch: boolean = false;
  showButton: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        this.showButton = !this.showSearch;
      }, 600); // 600ms matches animation duration
    } else {
      this.showButton = !this.showSearch;
    }
  }

  constructor() {
    setTimeout(() => {
      this.showButton = true;
    }, 600); // delay of 600ms
  }

  ngOnInit() {}

  writeValue(val: string): void {
    this.modelValue = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  search() {}
}
