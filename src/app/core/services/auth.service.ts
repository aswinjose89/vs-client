import { Injectable } from "@angular/core";

import { ApiService } from "../services/api.service";
import { TokenService } from "../authentication/token.service";
import { SettingsService } from "@core/bootstrap/settings.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private api: ApiService,
    private token: TokenService,
    private settings: SettingsService
  ) {}

  refreshToken() {
    let data = {
      refresh: this.token.get().refreshToken,
    };
    return this.api.post("accounts/token/refresh", data);
  }

  setUpdatedTokenValues(tokenData) {
    let accessTokenDtls = JSON.parse(atob(tokenData.access.split(".")[1]));
    const { token, uid, username } = {
      token: tokenData.access,
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
    let refreshToken = this.token.get().refreshToken;
    // Set token info
    this.token.set({ token, refreshToken, uid, username });
  }
}
