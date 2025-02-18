import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { Variable } from "astal";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={LEFT | TOP | BOTTOM}
      application={App}
    >
      <centerbox cssName="centerbox" orientation={Gtk.Orientation.VERTICAL}>
        <button
          onClicked="echo hello"
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <label label={"Welcome to AGS!"} cssName="test" />
        </button>
        <box />
        <menubutton
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <label label={time()} cssName="test" />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </centerbox>
    </window>
  );
}
