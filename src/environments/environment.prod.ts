const _api_url = window["env"]["api_url"] || "//86.98.4.105:8081/";
const _socket_url = window["env"]["socket_url"] || "//86.98.4.105:8082/";
const _vulnerability_scan_url =
  window["env"]["vulnerability_scan_url"] || "//86.98.4.105:80/";
export const environment = {
  SERVER_ORIGIN: "",
  production: true,
  useHash: true,
  hmr: false,
  api_url: _api_url,
  socket_url: _socket_url,
  vulnerability_scan_url: _vulnerability_scan_url,
};
