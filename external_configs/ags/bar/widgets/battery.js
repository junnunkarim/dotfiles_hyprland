const lib_battery = await Service.import("battery");
const battery_percent = lib_battery.bind("percent");

const battery_icon = Widget.Icon({
  class_name: "battery_icon all_icons",
  icon: battery_percent.as(
    (p) => `battery-level-${Math.floor(p / 10) * 10}-symbolic`,
  ),

  setup: (self) => {
    self.hook(lib_battery, () => {
      self.toggleClassName(
        "battery_charging_icon",
        lib_battery.bind("charging").emitter._proxy.State === 4 ? true : false,
      );
    });
  },
});
const battery_label = Widget.Label({
  class_name: "battery_label all_labels",
  label: battery_percent.as((p) => `${p}`),

  setup: (self) => {
    self.hook(lib_battery, () => {
      self.toggleClassName(
        "battery_charging_label",
        lib_battery.bind("charging").emitter._proxy.State === 4 ? true : false,
      );
    });
  },
});

export default () =>
  Widget.Box({
    class_name: "battery_box all_widget_boxs",
    visible: lib_battery.bind("available"),
    vertical: true,
    tooltipText: battery_percent.as((p) => `${p}%`),
    // tooltipText: Object.entries(
    //   lib_battery.bind("charging").emitter._proxy,
    // ).toString(),

    children: [battery_label, battery_icon],

    setup: (self) => {
      self.hook(lib_battery, () => {
        self.toggleClassName(
          "battery_charging_box",
          lib_battery.bind("charging").emitter._proxy.State === 4
            ? true
            : false,
        );
      });
    },
  });
