import { Injectable } from "@angular/core";
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  static instance: ApiService;

  constructor(private http?: HttpClient) {
    ApiService.instance = this;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  upload(path: string, body): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }

  buildFilter(filters) {
    let params = new HttpParams();
    for (const field in filters) {
      if (filters[field]) {
        const value = filters[field];
        params = params.append(field, value);
      }
    }
    return params;
  }

  getRequest(url, filters): Observable<any> {
    const params = this.buildFilter(filters);
    return this.get(url, params);
  }

  errorResponse(err) {
    alert("Internal Error");
  }

  getBlob(
    path: string,
    params: HttpParams = new HttpParams(),
    httpOptions = {}
  ): Observable<any> {
    httpOptions = {
      responseType: "blob" as "json",
      params,
      ...httpOptions,
    };
    return this.http
      .get(`${environment.api_url}${path}`, httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  postBlob(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, {
        responseType: "blob" as "json",
      })
      .pipe(catchError(this.formatErrors));
  }

  download(
    path: string,
    params: HttpParams = new HttpParams(),
    httpOptions = {}
  ): Observable<any> {
    httpOptions = {
      responseType: "arraybuffer",
      params,
      ...httpOptions,
    };
    return this.http
      .get(`${environment.api_url}${path}`, httpOptions)
      .pipe(catchError(this.formatErrors));
  }
}
