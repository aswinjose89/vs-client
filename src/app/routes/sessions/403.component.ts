import { Component } from "@angular/core";

@Component({
  selector: "app-error-403",
  template: `
    <shd-error-code
      code="403"
      [title]="'Permission denied!'"
      [message]="'You do not have permission to access the requested data.'"
    ></shd-error-code>
  `,
})
export class Error403Component {}
