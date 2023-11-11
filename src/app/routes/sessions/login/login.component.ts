import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SettingsService, StartupService, TokenService } from "@core";

import { ApiService } from "../../../core/services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationErrors: any;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private api: ApiService
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  login() {
    if (this.loginForm.valid) {
      this.api.post("accounts/login", this.loginForm.value).subscribe(
        (data) => {
          if (data?.access && data?.refresh) {
            let accessTokenDtls = JSON.parse(atob(data.access.split(".")[1]));
            const { token, refreshToken, uid, username } = {
              token: data.access,
              refreshToken: data.refresh,
              uid: accessTokenDtls.user_id,
              username: accessTokenDtls.username,
            };
            // Set user info
            this.settings.setUser({
              id: uid,
              name: username,
              email: accessTokenDtls?.email || "QuantumVentura@gmail.com",
              avatar: "./assets/images/avatar.jpg",
            });
            // Set token info
            this.token.set({ token, refreshToken, uid, username });
            // Regain the initial data
            this.startup.load().then(() => {
              let url = this.token.referrer!.url || "/dashboard";
              if (url.includes("/auth")) {
                url = "/";
              }
              this.router.navigateByUrl(url);
            });
            this.validationErrors = undefined;
          }
        },
        (error) => {
          this.validationErrors = error;
        }
      );
    }
  }
}
