import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../material.module";
import { MaterialExtensionsModule } from "@ng-matero/extensions";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgProgressRouterModule } from "ngx-progressbar/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { ToastrModule } from "ngx-toastr";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { MonacoEditorModule, NgxMonacoEditorConfig } from "ngx-monaco-editor";

import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";

import { DisableControlDirective } from "./directives/disable-control.directive";

import { SafeUrlPipe } from "./pipes/safe-url.pipe";
import { ToObservablePipe } from "./pipes/to-observable.pipe";
import {
  NgMatTableComponent,
  DetailsComponent,
  ReadOnlyFieldComponent,
  DateRangeTimePickerComponent,
  ErrorCodeComponent,
  ReloginComponent,
  AlertMessageComponent,
  DualListboxComponent,
  BasicSearchComponent,
  MonacoEditorComponent,
} from "./components";
import { GlobalService } from "./services";
import { NgMatNestedTableComponent } from "./components/ng-mat-nested-table/ng-mat-nested-table.component";

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: "assets", // configure base path cotaining monaco-editor directory after build default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => {
    console.log((<any>window).monaco);
  }, // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

const MODULES = [
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgSelectModule,
  FormlyModule,
  FormlyMaterialModule,
  ToastrModule,
  TranslateModule,
];
const COMPONENTS = [
  BreadcrumbComponent,
  PageHeaderComponent,
  ErrorCodeComponent,
  NgMatTableComponent,
  NgMatNestedTableComponent,
  DetailsComponent,
  ReadOnlyFieldComponent,
  DateRangeTimePickerComponent,
  ReloginComponent,
  AlertMessageComponent,
  DualListboxComponent,
  BasicSearchComponent,
  MonacoEditorComponent,
];
const COMPONENTS_DYNAMIC = [];
const DIRECTIVES = [DisableControlDirective];
const PIPES = [SafeUrlPipe, ToObservablePipe];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    ...DIRECTIVES,
    ...PIPES,
    ReadOnlyFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
    ...MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [GlobalService],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
