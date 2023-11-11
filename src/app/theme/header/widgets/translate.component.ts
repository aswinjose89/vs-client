import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "@core";

@Component({
  selector: "app-translate",
  template: `
    <button mat-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <img
        class="matero-avatar"
        [src]="selectedLanguage.flag"
        width="20"
        alt="avatar"
      />
      {{ selectedLanguage.language }}
    </button>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of langs | keyvalue"
        (click)="useLanguage(lang.key)"
      >
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
})
export class TranslateComponent {
  langs = {
    "en-US": "English(US)",
    "zh-CN": "中文简体(CN)",
    "zh-TW": "中文繁体(TW)",
    "ja-JP": "英語(JP)",
    "fr-FR": "France(FR)",
  };
  selectedLanguage = {
    language: "US",
    flag: `../../../../assets/images/flags/us.svg`,
  };
  constructor(
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    translate.addLangs(["en-US", "zh-CN", "zh-TW", "ja-JP", "fr-FR"]);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
    this.selectedLanguage = {
      language: language.split("-")[1],
      flag: `../../../../assets/images/flags/${language
        .split("-")[1]
        .toLocaleLowerCase()}.svg`,
    };
  }
}
