const lib_hyprland = await Service.import("hyprland");

const client_title_label = Widget.Label({
  class_name: "client_title_label all_labels",
  label: lib_hyprland.active.client.bind("title"),
  // vertical
  angle: 90,
  widthChars: 25,
  maxWidthChars: 25,
  truncate: "end",
  justification: "center",
});

export default () =>
  Widget.Box({
    class_name: "client_title_box all_widget_boxs",
    vertical: true,
    tooltipText: lib_hyprland.active.client.bind("title"),

    child: client_title_label,
  });
