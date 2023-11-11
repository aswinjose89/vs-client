import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgMatNestedTableComponent } from "./ng-mat-nested-table.component";

describe("NgMatNestedTableComponent", () => {
  let component: NgMatNestedTableComponent;
  let fixture: ComponentFixture<NgMatNestedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgMatNestedTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatNestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
