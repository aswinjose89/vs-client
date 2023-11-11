import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

import { allColumnConfig } from "../configs/all-column-config";
import { SettingsService } from "../../core/bootstrap/settings.service";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private settings: SettingsService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  getColumns(columns) {
    const columnConfig = allColumnConfig;
    const temp = [];
    columns.forEach((field) => {
      if (field.children) {
        //Nested loop for child table
        columnConfig["children"] = {
          children: this.getColumns(field.children),
        };
        field = "children";
      }
      columnConfig[field].header = this.translate.stream(
        `shared.fields.${field}`
      );
      temp.push(columnConfig[field]);
    });
    return temp;
  }

  getDefinedDict(obj) {
    const temp = {};
    for (const key in obj) {
      const value = obj[key];
      if (value) {
        temp[key] = value;
      }
    }
    return temp;
  }

  redirect(url = ["traffic-analyzer"], queryParams, instance = {}) {
    this.router.navigate(url, {
      queryParams,
      queryParamsHandling: "merge",
      ...instance,
    });
  }

  redirectToNewWindow(url = "traffic-analyzer", queryParams, instance = {}) {
    const objString = "?" + new URLSearchParams(queryParams).toString();
    window.open(url + objString, "_blank");
  }

  getBaseUrl() {
    const baseUrl = window.location.href.replace(this.router.url, "");
    return baseUrl;
  }

  openDialog(component, config = {}) {
    const dialogRef = this.dialog.open(component, {
      restoreFocus: false,
      width: "80%",
      data: {},
      ...config,
    });
    return dialogRef;
  }

  createInputPayload(globalSearch, allFieldSearch) {
    /*
    follow below format as input or string
     allFieldSearch= { uid:"3456" }
    */
    let query = {};
    if (globalSearch) {
      query["query"] = globalSearch; //Global search value
    }
    if (allFieldSearch) {
      query["field_query"] =
        typeof allFieldSearch === "string"
          ? allFieldSearch
          : JSON.stringify(allFieldSearch); // Advance search field
    }
    return query;
  }

  updateQueryParam(urlArr, query) {
    this.router.navigate(urlArr, { queryParams: query });
  }

  getAppSettings() {
    return this.settings.getAppSettings;
  }

  getAllCountryDtls() {
    return this.settings.getCountryDetails;
  }
  /*Defaults arguments with country code and property name*/
  getCountryDtls(value = "RU", prop = "alpha-2") {
    let countryDetails = this.settings.getCountryDetails;
    countryDetails = countryDetails.find((x) => x[prop] == value);
    return countryDetails;
  }

  isJobValid(rows) {
    let status = true,
      msg = null;
    if (rows.length == 0) {
      status = false;
      msg = "No Records Selected";
    }
    return { status, msg };
  }

  openSnackBar(message: string, action: string, config = {}) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      ...config,
    });
  }
}
