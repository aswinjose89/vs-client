// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const _api_url = window["env"]["api_url"] || "//localhost:8085/";
const _socket_url = window["env"]["socket_url"] || "//localhost:8082/";
const _vulnerability_scan_url =
  window["env"]["vulnerability_scan_url"] || "//localhost:80/";

export const environment = {
  SERVER_ORIGIN: "",
  production: false,
  useHash: true,
  hmr: false,
  api_url: _api_url,
  socket_url: _socket_url,
  vulnerability_scan_url: _vulnerability_scan_url,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
