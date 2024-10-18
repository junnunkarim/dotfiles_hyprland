import GLib from "gi://GLib";

import { execute_cmd, capture_cmd_output } from "../../helpers/utils.js";

const create_time_format = (time_format) =>
  Widget.Label({
    class_name: "clock_label all_labels",
    label: lib_time.bind().as((t) => t.format(time_format)),
  });

const lib_time = Variable(GLib.DateTime.new_now_local(), {
  poll: [20000, () => GLib.DateTime.new_now_local()], // 20 seconds
});
const calendar = capture_cmd_output("cal -3");
const info_time_date = lib_time
  .bind()
  .as((t) => t.format(`󰥔 %I:%M %p\n %A, %d %B %Y\n\n${calendar}`));

const clock_icon = Widget.Button({
  class_name: "clock_icon all_icons clock_button",
  label: "󰥔",

  on_clicked: () => execute_cmd("kitty -e calcure"),
  // on_clicked: () => execute_cmd("gnome-calendar"),
});

export default () =>
  Widget.Box({
    class_name: "clock_box all_widget_boxs",
    vertical: true,
    tooltipText: info_time_date,

    children: [
      clock_icon,
      // 24-Hour : Minute
      create_time_format("%H\n%M"),
      // create_time_format("%H\n%M\n%S"),
    ],
  });
