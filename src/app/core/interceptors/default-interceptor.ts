import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, catchError, switchMap } from "rxjs/operators";
import { environment } from "@env/environment";
import { CookieService } from "ngx-cookie";

import { ToastrService } from "ngx-toastr";
import { TokenService } from "../authentication/token.service";
import { SettingsService } from "@core/bootstrap/settings.service";
import { AuthService } from "../services/auth.service";
import { GlobalService } from "@shared/services";
import { ReloginComponent } from "@shared/components";

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  showReloginAlert = true;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private token: TokenService,
    private settings: SettingsService,
    public _cookieSvc: CookieService,
    private globalSvc: GlobalService,
    public auth?: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_ORIGIN + req.url;

    // Only intercept API url
    // if (!url.includes('/api/')) {
    //   return next.handle(req);
    // }

    // All APIs need JWT authorization
    let headers = this.createHeader();

    const newReq = req.clone({ setHeaders: headers, withCredentials: true });
    return next.handle(newReq).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) =>
        this.handleErrorReq(error, newReq, next)
      )
    );
  }

  private createHeader() {
    // All APIs need JWT authorization
    let headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Accept-Language": this.settings.language,
    };

    if (this.token.get().token) {
      headers["Authorization"] = `Bearer ${this.token.get().token}`;
    }
    if (this._cookieSvc.get("csrftoken")) {
      headers["X-CSRFToken"] = this._cookieSvc.get("csrftoken");
    }
    return headers;
  }

  private handleToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.auth.refreshToken().pipe(
      switchMap((tokenData: any) => {
        this.auth.setUpdatedTokenValues(tokenData);
        return next.handle(this.addTokenHeader(request));
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  private addTokenHeader(request: HttpRequest<any>) {
    return request.clone({
      headers: request.headers.set(
        "Authorization",
        `Bearer ${this.token.get().token}`
      ),
    });
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      if (body && body.code && body.code !== 0) {
        if (body.msg && body.msg !== "") {
          this.toastr.error(body.msg);
        }
        return throwError([]);
      } else {
        return of(event);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }

  private handleErrorReq(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    switch (error.status) {
      case 401:
        return this.handle401Error(error, req, next);
        break;
      case 403:
      case 404:
      case 500:
        this.goto(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.error("ERROR", error);
          this.toastr.error(
            error.error.msg || `${error.status} ${error.statusText}`
          );
        }
        break;
    }
    return throwError(error);
  }

  private handle401Error(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (error.error && error.error.code === "token_not_valid") {
      if (error.url && error.url.endsWith("token/refresh")) {
        let config = {
          width: "20%",
          data: {
            message: "Refresh Token is invalid or expired. Kindly relogin",
          },
        };
        if (this.showReloginAlert) {
          this.globalSvc.openDialog(ReloginComponent, config);
          this.showReloginAlert = false;
        }
      } else {
        return this.handleToken(req, next);
      }
    } else {
      // this.goto(`/auth/login`);
      return throwError(error);
    }
  }
}
