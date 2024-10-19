const { theme } = await import(`file://${App.configDir}/user_options.js`);
const theme_directory = `${App.configDir}/themes/${theme}`;

const setup_all_widgets = await import(`file://${theme_directory}/init.js`);

const scss_directory = `${theme_directory}/styles`;
const css_to_load = `${App.configDir}/temp/main.css`;

const all_widgets = setup_all_widgets.default(scss_directory, css_to_load);

App.config({
  style: css_to_load,
  windows: all_widgets,
});

export {};
