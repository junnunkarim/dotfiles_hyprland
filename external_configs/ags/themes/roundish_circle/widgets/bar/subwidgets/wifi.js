// import { toggle_popup_applications } from "../../helpers/utils.js";
const { toggle_popup_applications } = await import(
  `file://${App.configDir}/helpers/utils.js`
);

const lib_network = await Service.import("network");

const wifi_icon = Widget.Icon({
  class_name: "wifi_icon all_icons",
  icon: lib_network.wifi.bind("icon_name"),
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
    tooltipText: lib_network.wifi
      .bind("ssid")
      .as((ssid) => `Wifi SSID: ${ssid}` || "unknown"),

    on_clicked: () =>
      toggle_popup_applications("nm-connection-editor", "nm-connection-editor"),

    child: wifi_icon,
  });
