import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "shd-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {}
}
