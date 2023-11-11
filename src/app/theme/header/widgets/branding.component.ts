import { Component } from "@angular/core";

@Component({
  selector: "app-branding",
  template: `
    <a
      class="matero-branding"
      href="https://www.quantumventura.com/"
      target="_blank"
      style="display: flex;"
    >
      <img
        src="./assets/images/cybersecurity.png"
        class="matero-branding-logo-expanded"
        alt="logo"
      />
      <h1 class="matero-branding-name" style="color: blue;">
        {{ "layout.side_bar_title" | translate }}
      </h1>
    </a>
  `,
})
export class BrandingComponent {}
