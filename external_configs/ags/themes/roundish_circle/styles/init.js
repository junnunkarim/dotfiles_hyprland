import { generate_colors, generate_vars } from "./generate_colors_vars.js";

const reload_scss = (target_scss, css_to_load) => {
  // preprocess scss files;
  // precision must be set or else decimal count of a
  // mathematical operation might exceed css decimal limit;
  const execution_failed = Utils.exec(
    `sassc --precision 4 ${target_scss} ${css_to_load}`,
  );
  // if successfully compiled to css then
  if (!execution_failed) {
    console.log(`LOG: Successfully compiled scss to "${css_to_load}"`);
  }

  // reset previous css
  App.resetCss();
  // apply newly compiled css
  App.applyCss(css_to_load);
};

// called by the `init.js` of the theme directory
export const setup_styles = (scss_directory, css_to_load, current_theme) => {
  // needed
  generate_colors(current_theme);
  generate_vars(current_theme);

  // track changes in the `user_options.json` file and
  // change colorscheme according to the change
  Utils.monitorFile(
    `${App.configDir}/user_options.json`,
    // generate widget colors for the colorscheme
    () => generate_colors(),
  );

  // main scss to complie
  const target_scss = `${scss_directory}/main.scss`;
  // needed
  reload_scss(target_scss, css_to_load);

  // autoreload css when scss files are modified
  Utils.monitorFile(
    // directory that contains the scss files
    scss_directory,
    // reload function
    () => reload_scss(target_scss, css_to_load),
  );
};
