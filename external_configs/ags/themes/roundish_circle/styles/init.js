export default (scss_directory, css_to_load) => {
  const target_scss = `${scss_directory}/main.scss`;

  // preprocess scss files
  const execution_failed = Utils.exec(`sassc ${target_scss} ${css_to_load}`);
  if (!execution_failed) {
    console.log(
      `LOG: ${target_scss} was compiled to ${css_to_load} successfully!`,
    );
  }

  // autoreload css when scss files are modified
  Utils.monitorFile(
    // directory that contains the scss files
    scss_directory,

    // reload function
    function () {
      // compile, reset, apply
      Utils.exec(`sassc ${target_scss} ${css_to_load}`);

      App.resetCss();
      App.applyCss(css_to_load);
    },
  );
};
