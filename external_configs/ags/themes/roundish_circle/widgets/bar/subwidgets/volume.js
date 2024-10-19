import GLib from "gi://GLib";

const lib_audio = await Service.import("audio");

// for tracking timer used
let timer_id = null;

const icons = {
  101: "overamplified",
  67: "high",
  34: "medium",
  1: "low",
  0: "muted",
};

const volume_icon = Widget.Icon({
  class_name: "volume_icon all_icons",
});

// contains the icon widget
const volume_button = Widget.Button({
  class_name: "volume_button all_buttons",

  on_clicked: () => (lib_audio.speaker.is_muted = !lib_audio.speaker.is_muted),
  // on_clicked: () => (volume_label.visible = !volume_label.visible),

  child: volume_icon,
});

const volume_label = Widget.Label({
  class_name: "volume_label all_labels",
  label: `${lib_audio.speaker.volume * 100}`,
});

// contains both the button and the label widgets
const volume_box = Widget.Box({
  class_name: "volume_box all_widget_boxs",
  vertical: true,

  children: [volume_button, volume_label],
});

// contains the box widget
const volume_revealer = Widget.Revealer({
  revealChild: true,
  transitionDuration: 1000,
  transition: "slide_down",

  child: volume_box,
});

// console.log(volume_revealer.child.class_name);

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

// console.log(lib_audio);
// console.log(lib_audio.speaker);

// hook on revealer widget when volume changes
volume_revealer.hook(lib_audio.speaker, (self) => {
  const vol = lib_audio.speaker.volume * 100;
  const is_muted = lib_audio.speaker.is_muted;
  const icon = is_muted
    ? 0
    : [101, 67, 34, 1, 0].find((threshold) => threshold <= vol);
  const vol_level = lib_audio.speaker.is_muted ? 0 : Math.round(vol);

  volume_icon.icon = `audio-volume-${icons[icon]}-symbolic`;
  volume_label.label = `${vol_level}`;

  self.tooltip_text = is_muted ? " Volume Muted" : ` Volume: ${vol_level}%`;

  // reset visibility and timer when volume changes
  reset_timer(self);
});

export default () => volume_revealer;
