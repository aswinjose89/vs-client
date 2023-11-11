import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DateRangeTimePickerComponent } from "./date-range-time-picker.component";

describe("DateRangeTimePickerComponent", () => {
  let component: DateRangeTimePickerComponent;
  let fixture: ComponentFixture<DateRangeTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangeTimePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
