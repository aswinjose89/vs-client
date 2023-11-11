import { Injectable } from "@angular/core";
import { LocalStorageService } from "@shared/services/storage.service";
import { BehaviorSubject, Observable } from "rxjs";
import { AppSettings, defaults } from "../settings";

export const USER_KEY = "usr";
export const APP_SETTINGS_KEY = "app_settings"; // ke is used to set/get data from django server
export const COUNTRY_DETAILS_KEY = "country_details";

export interface User {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private store: LocalStorageService) {}

  private options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }
  private notify$ = new BehaviorSubject<any>({});

  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  /** User information */

  get user() {
    return this.store.get(USER_KEY);
  }

  setUser(value: User) {
    this.store.set(USER_KEY, value);
  }

  removeUser() {
    this.store.remove(USER_KEY);
  }

  /** System language */

  get language() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }

  get getAppSettings() {
    return this.store.get(APP_SETTINGS_KEY);
  }

  setAppSettings(value: User) {
    this.store.set(APP_SETTINGS_KEY, value);
  }

  get getCountryDetails() {
    return this.store.get(COUNTRY_DETAILS_KEY);
  }

  setCountryDetails(value: User) {
    this.store.set(COUNTRY_DETAILS_KEY, value);
  }
}
