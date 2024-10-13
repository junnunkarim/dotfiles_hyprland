import lib_brightness from "../../services/brightness.js";

const icons = {
  100: "high",
  66: "medium",
  33: "low",
  0: "off",
};

const brightness_icon = Widget.Icon({
  class_name: "brightness_icon",
});

const brightness_button = Widget.Button({
  class_name: "brightness_button all_buttons",
  child: brightness_icon,
});

const brightness_label = Widget.Label({
  class_name: "brightness_label all_labels",
  label: lib_brightness
    .bind("screen-value")
    .as((v) => `${Math.round(v * 100)}`),
});

export default () =>
  Widget.Box({
    class_name: "brightness_box all_widget_boxs",
    vertical: true,

    children: [brightness_button, brightness_label],

    setup: (self) =>
      self.hook(lib_brightness, (self) => {
        const brightness_value = Math.round(lib_brightness.screen_value * 100);
        const icon = [100, 66, 33, 0].find(
          (threshold) => threshold <= brightness_value,
        );

        brightness_icon.icon = `display-brightness-${icons[icon]}-symbolic`;
        brightness_label.label = `${brightness_value}`;

        self.tooltipText = `Brightness Level: ${brightness_value}`;
      }),
  });
