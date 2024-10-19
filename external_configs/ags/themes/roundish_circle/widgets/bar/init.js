import widget_clock from "./subwidgets/clock.js";
import widget_client_title from "./subwidgets/client_title.js";
import widget_workspaces from "./subwidgets/workspaces.js";
import widget_sys_tray from "./subwidgets/sys_tray.js";
import widget_wifi from "./subwidgets/wifi.js";
import widget_volume from "./subwidgets/volume.js";
import widget_brightness from "./subwidgets/brightness.js";
import widget_battery from "./subwidgets/battery.js";

// import { create_revealer_box } from "../helpers/revealer_box.js";
const { create_revealer_box } = await import(
  `file://${App.configDir}/helpers/revealer_box.js`
);

const clock_box = widget_clock();
const client_title_box = widget_client_title();
const workspace_box = widget_workspaces();
const sys_tray_box = widget_sys_tray();
const volume_box = widget_volume();
const brightness_box = widget_brightness();
const wifi_box = widget_wifi();
const battery_box = widget_battery();

const sys_tray_reveal_box = create_revealer_box({
  widgets: [sys_tray_box],
  revealer_box_class: "sys_tray_reveal_box",
  revealer_button_class: "sys_tray_reveal_button",
  revealer_class: "sys_tray_reveal",
  revealer_space_class: "sys_tray_reveal_space",
  animation: "slide_down",
  animation_duration_ms: 1000,
});
// const utility_reveal_box = create_revealer_box({
//   widgets: [volume_box, wifi_box],
//   revealer_box_class: "utility_reveal_box",
//   revealer_button_class: "utility_reveal_button",
//   revealer_class: "utility_reveal",
//   revealer_space_class: "utility_reveal_space",
// });

const start_widget = Widget.Box({
  vertical: true,
  // spacing: 10,
  children: [clock_box, client_title_box],
});
const center_widget = Widget.Box({
  vertical: true,
  children: [workspace_box],
});
const end_widget = Widget.Box({
  vertical: true,
  vpack: "end",
  // hpack: "end",
  // spacing: 10,
  children: [
    sys_tray_reveal_box,
    wifi_box,
    volume_box,
    brightness_box,
    battery_box,
  ],
  // children: [sys_tray_reveal_box, utility_reveal_box, battery_box],
});

// layout of the bar
export default (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["left", "top", "bottom"],
    exclusivity: "exclusive",
    // widthRequest: 40,
    child: Widget.CenterBox({
      // css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      startWidget: start_widget,
      centerWidget: center_widget,
      endWidget: end_widget,
    }),
  });
