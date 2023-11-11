import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

import { RoutesRoutingModule } from "./routes-routing.module";
import { SessionsModule } from "./sessions/sessions.module";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./sessions/login/login.component";
import { RegisterComponent } from "./sessions/register/register.component";

const COMPONENTS = [DashboardComponent, LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule,
    SessionsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  exports: [],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
