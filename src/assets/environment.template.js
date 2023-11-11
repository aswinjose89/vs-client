(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables from docker
  window["env"]["api_url"] = "${API_URL}";
  window["env"]["socket_url"] = "${SOCKET_URL}";
  window["env"]["vulnerability_scan_url"] = "${VULNERABILITY_SCAN_URL}";
})(this);
