export function create_revealer_box({
  widgets = [],
  revealer_box_class = "",
  revealer_button_class = "",
  revealer_class = "",
  revealer_space_class = "",
  vertical = true,
  icon = "",
  animation = "slide_down",
  animation_duration_ms = 1000,
} = {}) {
  const revealer = Widget.Revealer({
    class_name: revealer_class,
    revealChild: false,
    transitionDuration: animation_duration_ms,
    transition: animation,

    child: Widget.Box({
      class_name: revealer_space_class,
      vertical: vertical,

      children: widgets,
    }),
  });

  const box = Widget.Box({
    class_name: revealer_box_class,
    vertical: true,

    children: [
      revealer,
      Widget.Button({
        class_name: revealer_button_class,
        label: icon,

        on_clicked: () => (revealer.reveal_child = !revealer.reveal_child),
      }),
    ],
  });

  return box;
}
