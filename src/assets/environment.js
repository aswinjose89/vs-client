(function (window) {
  window["env"] = window["env"] || {};
  const _api_url = "//localhost:8099/";
  const _socket_url = "//localhost:8082/";
  const _vulnerability_scan_url = "//localhost:80/";

  // Environment variables
  window["env"]["api_url"] = _api_url;
  window["env"]["socket_url"] = _socket_url;
  window["env"]["vulnerability_scan_url"] = _vulnerability_scan_url;
})(this);
