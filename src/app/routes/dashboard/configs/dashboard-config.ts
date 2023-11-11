export const dashboardConfig = {
  trafficGridConfig: {
    columns: [
      {
        columnDef: "attack_type",
        header: "attack_type",
        show: true,
      },
      {
        columnDef: "src_ip",
        header: "src_ip",
        show: false,
      },
      {
        columnDef: "src_port",
        header: "src_port",
        show: true,
      },
      {
        columnDef: "dst_ip",
        header: "dst_ip",
        show: true,
      },
      {
        columnDef: "dst_port",
        header: "dst_port",
        show: true,
      },
      {
        columnDef: "proto",
        header: "proto",
        show: true,
      },
      {
        columnDef: "src_bytes",
        header: "src_bytes",
        show: true,
      },
      {
        columnDef: "dst_bytes",
        header: "dst_bytes",
        show: true,
      },
      {
        columnDef: "conn_state",
        header: "conn_state",
        show: true,
      },
      {
        columnDef: "missed_bytes",
        header: "missed_bytes",
        show: true,
      },
    ],
  },
};
