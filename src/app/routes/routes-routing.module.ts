import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { environment } from "@env/environment";

import { AdminLayoutComponent } from "../theme/admin-layout/admin-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: "Dashboard", titleI18n: "dashboard" },
      },
      {
        path: "material",
        loadChildren: () =>
          import("./material/material.module").then((m) => m.MaterialModule),
        data: { title: "Material", titleI18n: "material" },
      },
      {
        path: "permissions",
        loadChildren: () =>
          import("./permissions/permissions.module").then(
            (m) => m.PermissionsModule
          ),
      },
      {
        path: "sessions",
        loadChildren: () =>
          import("./sessions/sessions-routing.module").then(
            (m) => m.SessionsRoutingModule
          ),
      },
      // { path: '**', pathMatch: 'full', redirectTo: 'sessions/404' },
    ],
  },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent, data: { title: 'Login', titleI18n: 'login' } },
  //     {
  //       path: 'register',
  //       component: RegisterComponent,
  //       data: { title: 'Register', titleI18n: 'register' },
  //     }
  //   ],
  // },
  { path: "**", pathMatch: "full", redirectTo: "login" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
