import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { GlobalService } from "@shared/services";

@Component({
  selector: "app-relogin",
  templateUrl: "./relogin.component.html",
  styleUrls: ["./relogin.component.scss"],
})
export class ReloginComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ReloginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalSvc: GlobalService
  ) {}

  ngOnInit(): void {}

  getData() {
    return this.data;
  }

  relogin(): void {
    this.router.navigate(["/auth/login"]);
    this.dialogRef.close();
  }
}
