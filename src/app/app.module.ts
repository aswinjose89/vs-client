import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HttpClientXsrfModule,
} from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieModule } from "ngx-cookie";

import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./theme/theme.module";
import { RoutesModule } from "./routes/routes.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";

import { ToastrModule } from "ngx-toastr";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

import { httpInterceptorProviders } from "@core/interceptors";
import { appInitializerProviders } from "@core/initializers";
import { FormlyConfigModule } from "./formly-config.module";

import { coreServices } from "@core/services";
import { APP_CONFIG } from "@core/app-config";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: APP_CONFIG.CSRF_COOKIE_NAME,
      headerName: APP_CONFIG.CSRF_HEADER_NAME,
    }),
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CookieModule.forRoot(),
  ],
  providers: [httpInterceptorProviders, appInitializerProviders, coreServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
