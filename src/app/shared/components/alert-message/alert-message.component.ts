import { Component, OnInit, Inject, EventEmitter } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-alert-message",
  templateUrl: "./alert-message.component.html",
  styleUrls: ["./alert-message.component.scss"],
})
export class AlertMessageComponent implements OnInit {
  onSubmit = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<AlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {}

  get data() {
    return this.dialogData;
  }

  get config() {
    return this.dialogData.config;
  }

  action(item) {
    if (item.type == "close") {
      this.dialogRef.close();
    } else if (item.type == "ok") {
      this.onSubmit.emit({ ...item, ...this.data });
    }
  }
}
