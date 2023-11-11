interface Packet {
  //Custom Properties for Prediction
  attack_type: string;
  sl_attack_type1: string;
  sl_attack_type2: string;
  usl_attack_type: string;
  usl_attack_type1: string;
  usl_attack_type2: string;
  conn_state: string;
  uid: string;
  src_ip: string;
  src_port: string;
  dst_ip: string;
  dst_port: string;
  proto: string;
  service: string;
  duration: string;
  src_bytes: string;
  dst_bytes: string;
  missed_bytes: string;
  src_pkts: string;
  src_ip_bytes: string;
  dst_pkts: string;
  dst_ip_bytes: string;
  src_cc: string;
  src_city: string;
  dst_cc: string;
  dst_city: string;
  src_lat: string;
  src_lon: string;
  dst_lat: string;
  dst_lon: string;
  dns_qclass: string;
  dns_query: string;
  dns_qtype: string;
  dns_rcode: string;
  dns_RA: string;
  dns_RD: string;
  dns_AA: string;
  dns_rejected: string;
  created_date: string;
  modified_date: string;

  //Zeek Properties conn.log
  ts: string;
  "id.orig_h": string;
  "id.orig_p": string;
  "id.resp_h": string;
  "id.resp_p": string;
  orig_ip_bytes: string;
  orig_l2_addr: string;
  orig_lon: string;
  resp_ip_bytes: string;
  resp_l2_addr: string;
  orig_pkts: string;
  resp_pkts: string;
  orig_cc: string;
  history: string;
  orig_lat: string;

  //Zeek Properties dns.log
  trans_id: string;
  query: string;
  rcode: string;
  rcode_name: string;
  AA: string;
  TC: string;
  RD: string;
  RA: string;
  Z: string;
  answers: string;
  TTLs: string;
  rejected: string;

  //Zeek Properties ssl.log
  version: string;
  cipher: string;
  curve: string;
  resumed: string;
  established: string;
  ssl_history: string;

  //Zeek Properties http.log
  trans_depth: string;
  host: string;
  tags: string;
  method: string;
  uri: string;
  user_agent: string;
  request_body_len: string;
  response_body_len: string;

  //Zeek Properties weird.log
  name: string;
  notice: string;
  peer: string;
  source: string;

  //Zeek Properties files.log
  fuid: string;
  tx_hosts: string;
  rx_hosts: string;
  conn_uids: string;
  depth: string;
  analyzers: string;
  mime_type: string;
  is_orig: string;
  seen_bytes: string;
  total_bytes: string;
  missing_bytes: string;
  overflow_bytes: string;
  timedout: string;
  md5: string;
  sha1: string;

  //Zeek Properties ssh.log
  auth_attempts: string;
  server: string;
}

export const packetKeyLabelConfig: Packet = {
  //Custom Properties for Prediction
  attack_type: "Supervised Attack Type",
  sl_attack_type1: "Supervised Attack Type1",
  sl_attack_type2: "Supervised Attack Type2",
  usl_attack_type: "UnSupervised Attack Type",
  usl_attack_type1: "UnSupervised Attack Type1",
  usl_attack_type2: "UnSupervised Attack Type2",
  conn_state: "Connection State",
  uid: "Unique Id",
  src_ip: "Source Ip",
  src_port: "Source Port",
  dst_ip: "Destination Ip",
  dst_port: "Destination Port",
  proto: "Protocol",
  service: "Service",
  duration: "Duration",
  src_bytes: "Source Bytes",
  dst_bytes: "Destination Bytes",
  missed_bytes: "Missed Bytes",
  src_pkts: "Source Packets",
  src_ip_bytes: "Source IP Bytes",
  dst_pkts: "Destination Packets",
  dst_ip_bytes: "Destination IP Bytes",
  src_cc: "Source Country Code",
  src_city: "Source City",
  dst_cc: "Destination Country Code",
  dst_city: "Destination City",
  src_lat: "Source Latitude",
  src_lon: "Source Longitude",
  dst_lat: "Destination Latitude",
  dst_lon: "Destination Longitude",
  dns_qclass: "DNS Query Class",
  dns_query: "DNS Query",
  dns_qtype: "DNS Query Type",
  dns_rcode: "DNS Response Code",
  dns_RA: "DNS Recursive Available",
  dns_RD: "DNS Recursive Desired",
  dns_AA: "DNS Authoritative Answer",
  dns_rejected: "DNS Query Rejected",
  created_date: "Created Date",
  modified_date: "Modified Date",

  //Zeek Properties conn.log
  ts: "TimeStamp",
  "id.orig_h": "Source Ip",
  "id.orig_p": "Source Port",
  "id.resp_h": "Destination Ip",
  "id.resp_p": "Destination Port",
  orig_ip_bytes: "Source IP Bytes",
  orig_l2_addr: "Source Link-layer Address",
  resp_ip_bytes: "Destination IP Bytes",
  resp_l2_addr: "Destination Link-layer Address",
  orig_pkts: "Source Packets Count",
  resp_pkts: "Destination Packets Count",
  orig_lon: "Source IP Longitude",
  orig_lat: "Source IP Latitude",
  orig_cc: "Source IP Country Code",
  history: "History",

  //Zeek Properties dns.log
  trans_id: "Trans ID",
  query: "Query Url",
  rcode: "Response Code",
  rcode_name: "Response Code Name",
  AA: "Authoritative Answer",
  TC: "Truncation",
  RD: "Recursion Desired",
  RA: "Recursion Available",
  Z: "Reserved Field",
  answers: "Answers",
  TTLs: "Caching Intervals",
  rejected: "Rejected",

  //Zeek Properties ssl.log
  version: "SSL version",
  cipher: "SSL cipher",
  curve: "Curve",
  resumed: "Resumed",
  established: "Connection Established",
  ssl_history: "SSL History",

  //Zeek Properties http.log
  trans_depth: "Trans Depth",
  host: "Host Header",
  tags: "Tags",
  method: "Method",
  uri: "URI",
  user_agent: "User Agent",
  request_body_len: "Source Content Size",
  response_body_len: "Destination Content Size",

  //Zeek Properties weird.log
  name: "Name",
  notice: "Notice",
  peer: "Peer",
  source: "Source",

  //Zeek Properties files.log
  fuid: "File Unique identifier",
  tx_hosts: "TX Hosts",
  rx_hosts: "RX Hosts",
  conn_uids: "Connection UID",
  depth: "Depth",
  analyzers: "Analyzers",
  mime_type: "MIME Type",
  is_orig: "Is Source",
  seen_bytes: "Number Of Bytes",
  total_bytes: "Total Bytes",
  missing_bytes: "Missing Bytes",
  overflow_bytes: "Overflow Bytes",
  timedout: "TimeOut",
  md5: "MD5",
  sha1: "SHA1",

  //Zeek Properties ssh.log
  auth_attempts: "Auth Attempt",
  server: "Server",
};

export const packetKeyCommentConfig: Packet = {
  //Custom Properties for Prediction
  attack_type: "Supervised Attack From First ML Model",
  sl_attack_type1: "Supervised Attack From Second ML Model",
  sl_attack_type2: "Supervised Attack From Third ML Model",
  usl_attack_type: "UnSupervised Attack From First ML Model",
  usl_attack_type1: "UnSupervised Attack From Second ML Model",
  usl_attack_type2: "UnSupervised Attack From Third ML Model",
  conn_state: "Connection State",
  uid: "Unique ID of the connection",
  src_ip: "Source Ip",
  src_port: "Source Port",
  dst_ip: "Destination Ip",
  dst_port: "Destination Port",
  proto: "Transport layer protocol of connection",
  service: "Detected application protocol, if any",
  duration: "Connection length",
  src_bytes: "Source Bytes",
  dst_bytes: "Destination Bytes",
  missed_bytes: "Missed Bytes",
  src_pkts: "Source Packets",
  src_ip_bytes: "Source IP Bytes",
  dst_pkts: "Destination Packets",
  dst_ip_bytes: "Destination IP Bytes",
  src_cc: "Source Country Code",
  src_city: "Source City",
  dst_cc: "Destination Country Code",
  dst_city: "Destination City",
  src_lat: "Source Latitude",
  src_lon: "Source Longitude",
  dst_lat: "Destination Latitude",
  dst_lon: "Destination Longitude",
  dns_qclass: "DNS Query Class",
  dns_query: "DNS Query",
  dns_qtype: "DNS Query Type",
  dns_rcode: "DNS Response Code",
  dns_RA: "DNS Recursive Available",
  dns_RD: "DNS Recursive Desired",
  dns_AA: "DNS Authoritative Answer",
  dns_rejected: "DNS Query Rejected",
  created_date: "Created Date",
  modified_date: "Modified Date",

  //Zeek Properties conn.log
  ts: "TimeStamp",
  "id.orig_h": "Originating endpoint’s IP address (Orig)",
  "id.orig_p": "Originating endpoint’s TCP/UDP port(or ICMP code)",
  "id.resp_h": "Responding endpoint’s IP address (Resp)",
  "id.resp_p": "Responding endpoint’s TCP/UDP port(or ICMP code)",
  orig_ip_bytes: "Number of Source IP bytes(via IP total_length header field)",
  orig_l2_addr: "Link-layer address of the originator/source",
  resp_ip_bytes:
    "Number of Response/Destination IP bytes(via IP total_length header field)",
  resp_l2_addr: "Link-layer address of the responder",
  orig_pkts: "Number of Orig packets",
  resp_pkts: "Number of Resp packets",
  orig_lon: "Source IP Longitude",
  orig_lat: "Source IP Latitude",
  orig_cc: "Source IP Country Code",
  history: "Connection state history(see conn.log > history)",

  //Zeek Properties dns.log
  trans_id: "16 bit identifier assigned by DNS client;responses match",
  query: "Domain name subject of the query",
  rcode: "Response code value in the DNS response",
  rcode_name: "Descriptive name of response code(e.g., NXDOMAIN, NODATA)",
  AA: "Authoritative answer:T = server is authoritative for the query",
  TC: "Truncation: T = the message was truncated",
  RD: "Recursion desired:T = recursive lookup of query requested",
  RA: "Recursion available:T = server supports recursive queries",
  Z: "Reserved field, should be zero in all queries and responses",
  answers: "List of resource descriptions in answer to the query",
  TTLs: "Caching intervals of the answers",
  rejected: "Whether DNS query was rejected by server",

  //Zeek Properties ssl.log
  version: "SSL version that the server offered",
  cipher: "SSL cipher suite that the server chose",
  curve: "Elliptic curve server chose if using ECDH/ECDHE",
  resumed: "Flag that indicates the session was resumed",
  established: "Was this connection established successfully?",
  ssl_history: "SSL History",

  //Zeek Properties http.log
  trans_depth: "Pipelined depth into the connection",
  host: "Value of the Host header",
  tags: "Indicators of various attributes discovered",
  method: "HTTP Request verb: GET, POST, HEAD, etc",
  uri: "URI used in the request",
  user_agent: "Value of the User-Agent header",
  request_body_len: "Uncompressed content size of Orig data",
  response_body_len: "Uncompressed content size of Resp data",

  //Zeek Properties weird.log
  name: "Name",
  notice: "Notice",
  peer: "Peer",
  source: "Source",

  //Zeek Properties files.log
  fuid: "Unique identifier for a single file",
  tx_hosts: "Host(s) that sourced the data",
  rx_hosts: "Host(s) that received the data",
  conn_uids: "Connection UID(s) over which file transferred",
  depth: "Depth of file related to source(e.g., HTTP request depth)",
  analyzers: "Set of analyzers attached during file analysis",
  mime_type: "File type, as determined by Bro’s signatures",
  is_orig: "Was the file sent by the Originator?",
  seen_bytes: "Number of bytes provided to file analysis engine",
  total_bytes: "Total number of bytes that should comprise the file",
  missing_bytes: "Number of bytes in file stream missed",
  overflow_bytes: "Out-of-sequence bytes in the stream dueto overflow",
  timedout: "If the file analysis timed out at least once",
  md5: "hash of the file",
  sha1: "hash of the file",

  //Zeek Properties ssh.log
  auth_attempts: "Auth Attempt",
  server: "Software string from the server",
};
