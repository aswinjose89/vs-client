import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { MenuService } from "./menu.service";
import { SettingsService } from "./settings.service";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StartupService {
  constructor(
    private menu: MenuService,
    private http: HttpClient,
    private settings: SettingsService
  ) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get("assets/data/menu.json?_t=" + Date.now())
        .pipe(
          catchError((res) => {
            resolve(null);
            return throwError(res);
          })
        )
        .subscribe(
          (res: any) => {
            this.menu.recursMenuForTranslation(res.menu, "menu");
            this.menu.set(res.menu);

            // Refresh user info
            // In a real app, user data will be fetched from API
            // this.settings.setUser({
            //   id: 1,
            //   name: 'Aswin',
            //   email: 'aswin@quantumventura.com',
            //   avatar: './assets/images/avatar.jpg',
            // });
          },
          () => reject(),
          () => resolve(null)
        );
    });
  }

  loadAppSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      const api_url = `${environment.api_url}app_settings?_t=${Date.now()}`;
      this.http
        .get(api_url)
        .pipe(
          catchError((res) => {
            resolve(null);
            return throwError(res);
          })
        )
        .subscribe(
          (res: any) => {
            if (res && res.status == "success") {
              const app_settings = res.result.app_settings;
              this.settings.setAppSettings(app_settings);
            } else {
              console.error(res);
            }
          },
          () => reject(),
          () => resolve(null)
        );
    });
  }
}
