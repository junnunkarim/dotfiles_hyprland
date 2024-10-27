const colorschemes = {
  everblush: {
    label_fg: "#dadada",
    bar_bg: "#141b1e",
    clock_container_bg: "#232a2d",
    clock_icon_bg: "#e5c76b",
    clock_icon_fg: "#232a2d",
    clock_label_fg: "#e5c76b",
    clock_border: "#e5c76b",
    window_title_border: "#d3c6aa",
    workspace_item_active_icon_bg: "#8ccf7e",
    workspace_item_active_icon_fg: "#232a2d",
    workspace_item_active_container_bg: "#232a2d",
    workspace_item_active_label_fg: "#8ccf7e",
    workspace_border: "#8ccf7e",
    systray_bg: "#232a2d",
    battery_container_bg: "#232a2d",
    battery_container_charging_bg: "#232a2d",
    battery_label_fg: "#6cbfbf",
    battery_label_charging_fg: "#e57474",
    battery_icon_fg: "#232a2d",
    battery_icon_bg: "#6cbfbf",
    battery_icon_charging_bg: "#e57474",
    battery_border: "#6cbfbf",
    battery_border_charging: "#e57474",
  },
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
    battery_label_fg: "#7fbbb3",
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
  nord: {
    label_fg: "#d8dee9",
    bar_bg: "#2e3440",
    clock_container_bg: "#4c566a",
    clock_icon_bg: "#d08770",
    clock_icon_fg: "#2e3440",
    clock_label_fg: "#d08770",
    clock_border: "#d08770",
    window_title_border: "#d8dee9",
    workspace_item_active_icon_bg: "#81a1c1",
    workspace_item_active_icon_fg: "#2e3440",
    workspace_item_active_container_bg: "#434c5e",
    workspace_item_active_label_fg: "#81a1c1",
    workspace_border: "#81a1c1",
    systray_bg: "#434c5e",
    battery_container_bg: "#434c5e",
    battery_container_charging_bg: "#3b4252",
    battery_label_fg: "#a3be8c",
    battery_label_charging_fg: "#bf616a",
    battery_icon_fg: "#2e3440",
    battery_icon_bg: "#a3be8c",
    battery_icon_charging_bg: "#bf616a",
    battery_border: "#a3be8c",
    battery_border_charging: "#bf616a",
  },
  rose_pine: {
    label_fg: "#e0def4",
    bar_bg: "#191724",
    clock_container_bg: "#26233a",
    clock_icon_bg: "#f6c177",
    clock_icon_fg: "#26233a",
    clock_label_fg: "#f6c177",
    clock_border: "#f6c177",
    window_title_border: "#e0def4",
    workspace_item_active_icon_bg: "#d7827e",
    workspace_item_active_icon_fg: "#26233a",
    workspace_item_active_container_bg: "#26233a",
    workspace_item_active_label_fg: "#d7827e",
    workspace_border: "#d7827e",
    systray_bg: "#6e6a86",
    battery_container_bg: "#26233a",
    battery_container_charging_bg: "#26233a",
    battery_label_fg: "#c4a7e7",
    battery_label_charging_fg: "#eb6f92",
    battery_icon_fg: "#26233a",
    battery_icon_bg: "#c4a7e7",
    battery_icon_charging_bg: "#eb6f92",
    battery_border: "#c4a7e7",
    battery_border_charging: "#eb6f92",
  },
};

export const get_colors = (selected_colorscheme = "gruvbox") => {
  if (selected_colorscheme == "matugen") {
    const user_options = JSON.parse(
      Utils.readFile(`${App.configDir}/user_options.json`),
    );

    const matugen_colors = JSON.parse(
      Utils.readFile(
        `${App.configDir}/themes/${user_options.theme}/styles/colorscheme_matugen.json`,
      ),
    );

    return matugen_colors;
  } else {
    return colorschemes[selected_colorscheme];
  }
};
