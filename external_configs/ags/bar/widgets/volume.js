const lib_audio = await Service.import("audio");

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

const volume_button = Widget.Button({
  class_name: "volume_button all_buttons",

  on_clicked: () => (lib_audio.speaker.is_muted = !lib_audio.speaker.is_muted),

  child: volume_icon,
});

const volume_label = Widget.Label({
  class_name: "volume_label all_labels",
  label: `${lib_audio.speaker.volume * 100}`,
});

export default () =>
  Widget.Box({
    class_name: "volume_box all_widget_boxs",
    vertical: true,

    children: [volume_button, volume_label],

    setup: (self) => {
      self.hook(lib_audio.speaker, () => {
        const vol = lib_audio.speaker.volume * 100;
        const is_muted = lib_audio.speaker.is_muted;
        const icon = is_muted
          ? 0
          : [101, 67, 34, 1, 0].find((threshold) => threshold <= vol);
        const vol_level = lib_audio.speaker.is_muted ? 0 : Math.round(vol);

        volume_icon.icon = `audio-volume-${icons[icon]}-symbolic`;
        volume_label.label = `${vol_level}`;

        self.tooltip_text = is_muted ? "Volume Muted" : `Volume: ${vol_level}%`;
      });
    },
  });
