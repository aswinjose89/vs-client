import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostBinding,
  ElementRef,
  Inject,
  Optional,
  ViewEncapsulation,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Directionality } from "@angular/cdk/bidi";
import { MatSidenav, MatSidenavContent } from "@angular/material/sidenav";

import { SettingsService, AppSettings } from "@core";
import { AppDirectionality } from "@shared";

const MOBILE_MEDIAQUERY = "screen and (max-width: 599px)";
const TABLET_MEDIAQUERY =
  "screen and (min-width: 600px) and (max-width: 959px)";
const MONITOR_MEDIAQUERY = "screen and (min-width: 960px)";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  @ViewChild("content", { static: true }) content: MatSidenavContent;

  options = this.settings.getOptions();

  private layoutChangesSubscription: Subscription;

  get isOver(): boolean {
    return this.isMobileScreen;
  }
  private isMobileScreen = false;

  @HostBinding("class.matero-content-width-fix") get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === "side" &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }
  private isContentWidthFixed = true;

  @HostBinding("class.matero-sidenav-collapsed-fix") get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === "top" ||
        (this.options.sidenavOpened && this.isOver))
    );
  }
  private isCollapsedWidthFixed = true;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private overlay: OverlayContainer,
    private element: ElementRef,
    private settings: SettingsService,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    this.dir.value = this.options.dir;
    this.document.body.dir = this.dir.value;

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    // TODO: Scroll top to container
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.content.scrollTo({ top: 0 });
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  ngOnInit() {
    setTimeout(
      () => (this.isContentWidthFixed = this.isCollapsedWidthFixed = false)
    );
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    // TODO: Trigger when transition end
    setTimeout(() => {
      this.settings.setNavState("collapsed", this.options.sidenavCollapsed);
    }, timer);
  }

  sidenavCloseStart() {
    this.isContentWidthFixed = false;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.options.sidenavOpened = isOpened;
    this.settings.setNavState("opened", isOpened);

    this.isCollapsedWidthFixed = !this.isOver;
    this.resetCollapsedState();
  }

  /** Demo purposes only */

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === "dark") {
      this.element.nativeElement.classList.add("theme-dark");
      this.overlay.getContainerElement().classList.add("theme-dark");
    } else {
      this.element.nativeElement.classList.remove("theme-dark");
      this.overlay.getContainerElement().classList.remove("theme-dark");
    }
  }

  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir;
    this.document.body.dir = this.dir.value;
  }
}
