const lib_hyprland = await Service.import("hyprland");
const lib_battery = await Service.import("battery");
const battery_percent = lib_battery.bind("percent");

const battery_icon = Widget.Icon({
  class_name: "battery_icon all_icons",
  icon: battery_percent.as(
    (p) => `battery-level-${Math.floor(p / 10) * 10}-symbolic`,
  ),
});
const battery_label = Widget.Label({
  class_name: "battery_label all_labels",
  label: battery_percent.as((p) => `${Math.round(p)}`),
});

export default () =>
  Widget.Box({
    class_name: "battery_box all_widget_boxs",
    visible: lib_battery.bind("available"),
    vertical: true,
    tooltipText: battery_percent.as((p) => `${Math.round(p)}%`),

    children: [battery_label, battery_icon],

    setup: (self) => {
      const notify_threshold = 15;
      let notify_low_battery = true;

      self.hook(lib_battery, () => {
        const battery_is_charging =
          lib_battery.bind("percent").emitter._charging;

        // self.tooltipText = Object.entries(
        //   lib_battery.bind("percent").emitter,
        // ).toString();

        self.toggleClassName(
          "battery_charging_box",
          battery_is_charging ? true : false,
        );

        battery_icon.toggleClassName(
          "battery_charging_icon",
          battery_is_charging ? true : false,
        );
        battery_label.toggleClassName(
          "battery_charging_label",
          battery_is_charging ? true : false,
        );

        const battery_percent = Math.round(
          lib_battery.bind("percent").emitter._percent,
        );

        if (notify_low_battery && battery_percent <= notify_threshold) {
          // hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
          lib_hyprland.message(
            `notify 0 10000 0 fontsize:25  ${battery_percent}% battery charge remaining! Plug-in the adaptor immediately!`,
          );

          notify_low_battery = false;
        } else if (!notify_low_battery && battery_percent > notify_threshold) {
          notify_low_battery = true;
        }
      });
    },
  });
