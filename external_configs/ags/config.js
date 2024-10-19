const { theme } = await import(`file://${App.configDir}/user_options.js`);
const get_all_widgets = await import(
  `file://${App.configDir}/themes/${theme}/init.js`
);

const all_widgets = get_all_widgets.default();

const stylesheet_directory = `${App.configDir}/themes/${theme}/styles`;
const target_scss = `${stylesheet_directory}/styles/main.scss`;
const processed_css = `${App.configDir}/temp/main.css`;

// preprocess scss files
Utils.exec(`sassc ${target_scss} ${processed_css}`);

// autoreload css when scss files are modified
Utils.monitorFile(
  // directory that contains the scss files
  stylesheet_directory,

  // reload function
  function () {
    // compile, reset, apply
    Utils.exec(`sassc ${target_scss} ${processed_css}`);

    App.resetCss();
    App.applyCss(processed_css);
  },
);

App.config({
  style: processed_css,
  windows: all_widgets,
});

export {};
