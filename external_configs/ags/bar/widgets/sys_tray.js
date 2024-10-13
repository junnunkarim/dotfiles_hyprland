const lib_sys_tray = await Service.import("systemtray");

/** @param {import('types/service/systemtray').TrayItem} item */
const sys_tray = (item) =>
  Widget.Button({
    // child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind("tooltip_markup"),

    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),

    child: Widget.Icon({
      class_name: "sys_tray_icon",
      icon: item.bind("icon"),
    }),
  });

export default () =>
  Widget.Box({
    class_name: "sys_tray_box all_widget_boxs",
    vertical: true,
    // spacing: 10,

    children: lib_sys_tray.bind("items").as((i) => i.map(sys_tray)),
  });
