import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgMatTableComponent } from "./ng-mat-table.component";

describe("NgMatTableComponent", () => {
  let component: NgMatTableComponent;
  let fixture: ComponentFixture<NgMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgMatTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
