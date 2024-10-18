import setup_bar from "./bar/init.js";

const bar = setup_bar();

const target_scss = `${App.configDir}/style/main.scss`;
const process_css = `${App.configDir}/temp/main.css`;

// preprocess scss files
Utils.exec(`sassc ${target_scss} ${process_css}`);

// autoreload css when scss files are modified
Utils.monitorFile(
  // directory that contains the scss files
  `${App.configDir}/style`,

  // reload function
  function () {
    // compile, reset, apply
    Utils.exec(`sassc ${target_scss} ${process_css}`);

    App.resetCss();
    App.applyCss(process_css);
  },
);

App.config({
  style: process_css,
  windows: [bar],
});

export {};
