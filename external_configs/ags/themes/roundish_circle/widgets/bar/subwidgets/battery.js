const lib_hyprland = await Service.import("hyprland");
const lib_battery = await Service.import("battery");
const battery_percent = lib_battery.bind("percent");

const battery_icon = Widget.Icon({
  class_name: "battery_icon__icn",
  icon: battery_percent.as(
    (p) => `battery-level-${Math.floor(p / 10) * 10}-symbolic`,
  ),
});
const battery_level = Widget.Label({
  class_name: "battery_level__lbl",
  label: battery_percent.as((p) => `${Math.round(p)}`),
});

export default () =>
  Widget.Box({
    class_name: "battery_container__box",
    vertical: true,
    visible: lib_battery.bind("available"),
    tooltipText: battery_percent.as(
      (level) => ` Battery Level: ${Math.round(level)}%`,
    ),

    children: [battery_level, battery_icon],

    setup: (self) => {
      const notify_low_threshold = 15;
      const notify_extreme_low_threshold = 5;
      let notify_low_battery = true;
      let notify_extreme_low_battery = true;

      self.hook(lib_battery, () => {
        const battery_is_charging =
          lib_battery.bind("percent").emitter._charging;

        // self.tooltipText = Object.entries(
        //   lib_battery.bind("percent").emitter,
        // ).toString();

        self.toggleClassName(
          "battery_container_charging__box",
          battery_is_charging ? true : false,
        );

        // for changing battery icon color when it is charging
        battery_icon.toggleClassName(
          "battery_icon_charging__icn",
          battery_is_charging ? true : false,
        );
        // for changing battery level color when it is charging
        battery_level.toggleClassName(
          "battery_level_charging__lbl",
          battery_is_charging ? true : false,
        );

        const battery_percent = Math.round(
          lib_battery.bind("percent").emitter._percent,
        );

        if (notify_low_battery && battery_percent <= notify_low_threshold) {
          // hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
          lib_hyprland.message(
            `notify 0 10000 0 fontsize:25  ${battery_percent}% battery charge remaining! Plug-in the adaptor immediately!`,
          );

          notify_low_battery = false;
        } else if (
          !notify_low_battery &&
          battery_percent > notify_low_threshold
        ) {
          notify_low_battery = true;
        }

        if (
          notify_extreme_low_battery &&
          battery_percent <= notify_extreme_low_threshold
        ) {
          // hyprctl notify [ICON] [TIME_MS] [COLOR] [MESSAGE]
          lib_hyprland.message(
            `notify 0 10000 0 fontsize:25  Your battery is dying! ${battery_percent}% battery charge remaining!`,
          );

          notify_extreme_low_battery = false;
        } else if (
          !notify_extreme_low_battery &&
          battery_percent > notify_extreme_low_threshold
        ) {
          notify_extreme_low_battery = true;
        }
      });
    },
  });
