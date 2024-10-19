import process_and_monitor_scss from "./styles/init.js";
import setup_bar from "./widgets/bar/init.js";

export default (scss_directory, css_to_load) => {
  process_and_monitor_scss(scss_directory, css_to_load);

  return [setup_bar()];
};
