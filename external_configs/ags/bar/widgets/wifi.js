const lib_network = await Service.import("network");

const wifi_icon = Widget.Icon({
  class_name: "wifi_icon all_icons",
  icon: lib_network.wifi.bind("icon_name"),
  tooltipText: lib_network.wifi.bind("ssid").as((ssid) => ssid || "unknown"),
  // setup: (self) => {
  // const wifi_name = lib_network.wifi
  //   .bind("ssid")
  //   .as((ssid) => ssid || "Unknown");

  // self.set_tooltip_text(wifi_name);

  // self.hook(lib_network.wifi, () => {
  // self.icon = lib_network.wifi.bind("icon_name");
  // });
  // },
});

export default () =>
  Widget.Button({
    class_name: "wifi_box all_widget_boxs",

    child: wifi_icon,
  });
