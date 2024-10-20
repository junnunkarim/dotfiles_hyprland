export default (scss_directory, css_to_load) => {
  const target_scss = `${scss_directory}/main.scss`;

  // preprocess scss files;
  // precision must be set or else decimal count of a mathematical
  // operation might exceed css decimal limit;
  const execution_failed = Utils.exec(
    `sassc --precision 4 ${target_scss} ${css_to_load}`,
  );
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
      Utils.exec(`sassc --precision 4 ${target_scss} ${css_to_load}`);

      App.resetCss();
      App.applyCss(css_to_load);
    },
  );
};
