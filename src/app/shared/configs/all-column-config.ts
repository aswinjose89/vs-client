/*
Column Prefix Descriptions
-------------------------------
pm = Packet Management
pmd = Packet Management Details
*/

const zeekColumnConfig = {
  "id.orig_h": {
    columnDef: "id.orig_h",
    header: "Source IP",
    show: false,
    filter: true,
  },
  "id.orig_p": {
    columnDef: "id.orig_p",
    header: "Source Port",
    show: true,
    filter: true,
  },
  "id.resp_h": {
    columnDef: "id.resp_h",
    header: "Destination IP",
    show: true,
    filter: true,
  },
  "id.resp_p": {
    columnDef: "id.resp_p",
    header: "Destination Port",
    show: true,
    filter: true,
  },
};

const multiModelColumnConfig = {
  sl_hist_attack_type0: {
    columnDef: "sl_hist_attack_type0",
    header: "M0 Att. Type (Supervised)",
    show: true,
    filter: true,
  },
  sl_hist_attack_type1: {
    columnDef: "sl_hist_attack_type1",
    header: "M1 Att. Type (Supervised)",
    show: true,
    filter: true,
  },
  sl_hist_attack_type2: {
    columnDef: "sl_hist_attack_type2",
    header: "M2 Att. Type (Supervised)",
    show: true,
    filter: true,
  },
  sl_hist_attack_type3: {
    columnDef: "sl_hist_attack_type3",
    header: "M3 Att. Type (Supervised)",
    show: true,
    filter: true,
  },
  usl_hist_attack_type0: {
    columnDef: "usl_hist_attack_type0",
    header: "M0 Att. Type (UnSupervised)",
    show: true,
    filter: true,
  },
  usl_hist_attack_type1: {
    columnDef: "usl_hist_attack_type1",
    header: "M1 Att. Type (UnSupervised)",
    show: true,
    filter: true,
  },
  usl_hist_attack_type2: {
    columnDef: "usl_hist_attack_type2",
    header: "M2 Att. Type (UnSupervised)",
    show: true,
    filter: true,
  },
  usl_hist_attack_type3: {
    columnDef: "usl_hist_attack_type3",
    header: "M3 Att. Type (UnSupervised)",
    show: true,
    filter: true,
  },
};

const ensembleColumnConfig = {
  sl_model_version: {
    columnDef: "model_version",
    header: "Model Name",
    type: "link",
    route: "sl-model-details",
    show: true,
    filter: true,
    helpText: "",
  },
  usl_model_version: {
    columnDef: "model_version",
    header: "Model Name",
    type: "link",
    route: "usl-model-details",
    show: true,
    filter: true,
    helpText: "",
  },
  model_type: {
    columnDef: "model_type",
    header: "Model Type",
    show: true,
    filter: true,
  },
  model_training_accuracy: {
    columnDef: "model_training_accuracy",
    header: "Model Accuracy",
    show: true,
    filter: true,
  },
};
export const allColumnConfig = {
  ...ensembleColumnConfig,
  ...zeekColumnConfig,
  ...multiModelColumnConfig,
  checkbox: {
    columnDef: "select",
    header: "select",
    type: "checkbox",
    show: true,
  },
  uid: {
    columnDef: "uid",
    header: "Traffic ID",
    type: "link",
    route: "details",
    show: true,
    filter: true,
    helpText: "",
    target: "_blank",
    // cell: (element: any) => `${element._id}`
  },
  attack_type: {
    columnDef: "attack_type",
    header: "Attack Type (Supervised)",
    type: "template",
    show: true,
    filter: true,
    cellTemplate: null,
    headerTemplate: null,
  },
  usl_attack_type: {
    columnDef: "usl_attack_type",
    header: "Attack Type (UnSupervised)",
    type: "template",
    show: true,
    filter: true,
    cellTemplate: null,
    headerTemplate: null,
  },
  src_ip: {
    columnDef: "src_ip",
    header: "Source IP",
    show: false,
    filter: true,
  },
  src_port: {
    columnDef: "src_port",
    header: "Source Port",
    show: true,
    filter: true,
  },
  dst_ip: {
    columnDef: "dst_ip",
    header: "Destination IP",
    show: true,
    filter: true,
  },
  dst_port: {
    columnDef: "dst_port",
    header: "Destination Port",
    show: true,
    filter: true,
  },
  proto: {
    columnDef: "proto",
    header: "Protocol",
    show: true,
    filter: true,
  },
  src_bytes: {
    columnDef: "src_bytes",
    header: "Source Bytes",
    show: true,
    filter: true,
  },
  dst_bytes: {
    columnDef: "dst_bytes",
    header: "Destination Bytes",
    show: true,
    filter: true,
  },
  conn_state: {
    columnDef: "conn_state",
    header: "Connection State",
    show: true,
    filter: true,
  },
  missed_bytes: {
    columnDef: "missed_bytes",
    header: "Missed Bytes",
    show: true,
    filter: true,
  },
  dns_query: {
    columnDef: "dns_query",
    header: "Dns Query",
    show: true,
    filter: true,
  },
  akida_attack_type: {
    columnDef: "akida_attack_type",
    header: "Akida Attack Type",
    show: true,
    filter: true,
  },
  comments: {
    columnDef: "comments",
    header: "Comments",
    show: true,
    filter: true,
  },
  results: {
    columnDef: "results",
    header: "Results",
    show: true,
  },
  tpl_results: {
    columnDef: "tpl_results",
    header: "Results",
    type: "template",
    cellTemplate: null,
    headerTemplate: null,
  },
  created_date: {
    columnDef: "created_date",
    header: "Created Date",
    show: true,
  },
  modified_date: {
    columnDef: "modified_date",
    header: "Updated Date",
    show: true,
    filter: true,
  },
  modified_by: {
    columnDef: "modified_by",
    header: "Modified By",
    show: true,
    filter: true,
  },
  managers: {
    columnDef: "managers",
    header: "Managers",
    show: true,
    filter: true,
  },
  priority: {
    columnDef: "priority",
    header: "Priority",
    show: true,
    filter: true,
  },
  src_cc: {
    columnDef: "src_cc",
    header: "Source Country Code",
    show: true,
    filter: true,
  },
  dst_cc: {
    columnDef: "dst_cc",
    header: "Destination Country Code",
    show: true,
    filter: true,
  },
  pm_id: {
    columnDef: "id",
    header: "ID",
    show: true,
    type: "link",
    route: "details",
    helpText: "",
    target: "_blank",
  },
  pm_network_interface: {
    columnDef: "network_interface",
    header: "Network Interface",
    show: true,
  },
  pm_file_size: {
    columnDef: "file_size",
    header: "File Size",
    show: true,
  },
  pm_end_time: {
    columnDef: "end_time",
    header: "End Time",
    show: true,
  },
  pm_duration: {
    columnDef: "duration",
    header: "Duration",
    show: true,
  },
  pm_pid: {
    columnDef: "pid",
    header: "Process ID",
    show: true,
  },
  pm_status: {
    columnDef: "status",
    header: "Status",
    type: "template",
    show: true,
    cellTemplate: null,
    headerTemplate: null,
  },
  pm_created_at: {
    columnDef: "created_at",
    header: "Created Date",
    show: true,
  },
  pmd_total_packets: {
    columnDef: "total_packets",
    header: "Total Packets",
    show: true,
  },
  file_name: {
    columnDef: "file_name",
    header: "File Name",
    show: true,
  },
  total_src_bytes: {
    columnDef: "total_src_bytes",
    header: "Total Source Bytes",
    show: true,
    filter: true,
  },
  total_src_pkts: {
    columnDef: "total_src_pkts",
    header: "Total Source Packets",
    show: true,
    filter: true,
  },
  total_durations: {
    columnDef: "total_durations",
    header: "Total Duration",
    show: true,
  },
  total_dst_bytes: {
    columnDef: "total_dst_bytes",
    header: "Total Destination Bytes",
    show: true,
    filter: true,
  },
  total_dst_pkts: {
    columnDef: "total_dst_pkts",
    header: "Total Destination Packets",
    show: true,
    filter: true,
  },
  sno: {
    columnDef: "sno",
    header: "S.NO",
    show: true,
  },
};
