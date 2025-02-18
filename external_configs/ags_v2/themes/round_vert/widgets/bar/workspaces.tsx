import { Gtk } from "astal/gtk3";
import { bind, timeout } from "astal";
import Hyprland from "gi://AstalHyprland";

const workspace_count = 9;
const workspace_labels: Record<number, string> = {
  1: "",
  2: "󰅨",
  3: "󰉋",
  4: "",
  5: "",
  6: "",
  7: "󰍡",
  8: "",
  9: "󰌴",
};

const create_ws_icon = (workspace_id: number) => {
  return (
    <label
      label={workspace_labels[workspace_id]}
      className={"workspace_icon__lbl"}
    />
  );
};

const create_ws_client_count = () => {
  const label = <label className={"workspace_client_count__lbl"} />;

  return (
    <revealer
      // setup={(self) => timeout(500, () => self.revealChild = true)}
      revealChild={true}
      transitionDuration={500}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
    >
      {label}
    </revealer>
  );
};

const ws_item = (workspace_id) => {
  <box
    className={"workspace_item__box"}
    vertical={true}
    // children={[create_ws_icon(workspace_id), create_ws_client_count()]}
    setup={(self) => {
      // these two child widgets are instantiated for each ws_item widget
      const ws_icon = create_ws_icon(workspace_id);
      const ws_client_count = create_ws_client_count();

      // add child widgets;
      // widget, expand, fill, padding;
      self.pack_start(ws_icon, false, false, 0);
      self.pack_end(ws_client_count, false, false, 0);

      const hypr = Hyprland.get_default();
      // hook into hyprland's state and update the button's state based on the workspace status;
      self.hook(hypr, "workspaces", () => {
        // lib_hyprland.messageAsync(`notify 1 5000 0 "Current Workspace"`);
        // get the client count in current workspace
        const client_count = hypr.get_workspace(workspace_id) ||
          0;
        // check if the current workspace is active or not
        const is_active = hypr.get_focused_workspace === workspace_id;
        // check if the current workspace has clients/windows or not
        const is_occupied = client_count > 0;

        // toggle widget visibility if workspace is active or occupied
        // self.visible = is_active || is_occupied;

        // first add the class name, afterwards toggle the class names depending on active/occupied state
        self.toggleClassName("workspace_item_active__box", is_active);
        self.toggleClassName("workspace_item_occupied__box", is_occupied);

        self.set_tooltip_text(` Client/Window Count: ${client_count}`);

        // show client count only if the current workspace is active
        if (is_active) {
          ws_client_count.revealChild = true;
          ws_client_count.child.set_label(`${client_count}`);
        } else {
          ws_client_count.reveal_child = false;
        }
      });
    }}
  />;
};

function create_workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="workspace_item__box">
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? "focused" : ""
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          ))
      )}
    </box>
  );
}
