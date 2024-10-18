import GLib from "gi://GLib";
import lib_brightness from "../../services/brightness.js";

// for tracking timer used
let timer_id = null;

const icons = {
  100: "high",
  66: "medium",
  33: "low",
  0: "off",
};

const brightness_icon = Widget.Icon({
  class_name: "brightness_icon",
});

// contains the icon widget
const brightness_button = Widget.Button({
  class_name: "brightness_button all_buttons",

  // on_clicked: () => (brightness_label.visible = !brightness_label.visible),

  child: brightness_icon,
});

const brightness_label = Widget.Label({
  class_name: "brightness_label all_labels",
  label: lib_brightness
    .bind("screen-value")
    .as((v) => `${Math.round(v * 100)}`),
});

// contains both the button and the label widgets
const brightness_box = Widget.Box({
  class_name: "brightness_box all_widget_boxs",
  vertical: true,

  children: [brightness_button, brightness_label],
});

// contains the box widget
const brightness_revealer = Widget.Revealer({
  revealChild: true,
  transitionDuration: 2000,
  transition: "slide_up",

  child: brightness_box,
});

const hide_widget = (revealer_widget) => {
  revealer_widget.reveal_child = false;
};

const reset_timer = (revealer_widget) => {
  // clear any existing timer
  if (timer_id !== null) {
    GLib.Source.remove(timer_id);
    timer_id = null;
  }

  // show the widget
  revealer_widget.reveal_child = true;

  // set a timer to hide the widget after 3 seconds
  timer_id = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 3000, () => {
    hide_widget(revealer_widget);
    // reset timer_id after it runs
    timer_id = null;

    // ensures the timer runs only once
    return GLib.SOURCE_REMOVE;
  });
};

// hook on revealer widget when brightness changes
brightness_revealer.hook(lib_brightness, (self) => {
  const brightness_value = Math.round(lib_brightness.screen_value * 100);
  const icon = [100, 66, 33, 0].find(
    (threshold) => threshold <= brightness_value,
  );

  brightness_icon.icon = `display-brightness-${icons[icon]}-symbolic`;
  brightness_label.label = `${brightness_value}`;

  self.tooltipText = `󰃟 Brightness Level: ${brightness_value}%`;

  // reset visibility and timer when brightness changes
  reset_timer(self);
});

export default () => brightness_revealer;
