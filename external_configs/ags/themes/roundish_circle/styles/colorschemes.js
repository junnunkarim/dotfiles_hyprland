const colorschemes = {
  everforest: {
    label_fg: "#d3c6aa",
    bar_bg: "#272e33",
    clock_container_bg: "#374145",
    clock_icon_bg: "#e69875",
    clock_icon_fg: "#374145",
    clock_label_fg: "#e69875",
    clock_border: "#e69875",
    window_title_border: "#d3c6aa",
    workspace_item_active_icon_bg: "#a7c080",
    workspace_item_active_icon_fg: "#3c4848",
    workspace_item_active_container_bg: "#3c4848",
    workspace_item_active_label_fg: "#a7c080",
    workspace_border: "#a7c080",
    systray_bg: "#414b50",
    battery_container_bg: "#384b55",
    battery_container_charging_bg: "#4c3743",
    battery_label_fg: "#6fbbb3",
    battery_label_charging_fg: "#e67e79",
    battery_icon_fg: "#384b55",
    battery_icon_bg: "#7fbbb3",
    battery_icon_charging_bg: "#e67e79",
    battery_border: "#7fbbb3",
    battery_border_charging: "#e67e79",
  },
  gruvbox: {
    label_fg: "#ebdbb2",
    bar_bg: "#282828",
    clock_container_bg: "#3c3836",
    clock_icon_bg: "#d65d0e",
    clock_icon_fg: "#3c3836",
    clock_label_fg: "#fe8019",
    clock_border: "#d65d0e",
    window_title_border: "#ebdbb2",
    workspace_item_active_icon_bg: "#98971a",
    workspace_item_active_icon_fg: "#3c3836",
    workspace_item_active_container_bg: "#3c3836",
    workspace_item_active_label_fg: "#98971a",
    workspace_border: "#98971a",
    systray_bg: "#504945",
    battery_container_bg: "#3c3836",
    battery_container_charging_bg: "#3c3836",
    battery_label_fg: "#fabd2f",
    battery_label_charging_fg: "#fb4934",
    battery_icon_fg: "#3c3836",
    battery_icon_bg: "#d79921",
    battery_icon_charging_bg: "#cc241d",
    battery_border: "#d79921",
    battery_border_charging: "#cc241d",
  },
};

export const get_colors = (selected_colorscheme = "gruvbox") => {
  return colorschemes[selected_colorscheme];
};
