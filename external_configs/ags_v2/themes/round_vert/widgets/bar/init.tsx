import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={LEFT | TOP | BOTTOM}
      application={App}
    >
      <centerbox vertical={true}>
        <button
          onClicked="echo hello"
          halign={Gtk.Align.CENTER}
        >
          <label label={"Welcome to AGS!"} angle={90} />
        </button>

        <box />

        <button
          onClicked={() => print("hello")}
          halign={Gtk.Align.CENTER}
        >
          <label label={time()} angle={90} />
        </button>
      </centerbox>
    </window>
  );
}
