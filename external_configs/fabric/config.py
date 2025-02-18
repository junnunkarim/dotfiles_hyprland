import fabric  # importing the base pacakge

from fabric import (
    Application,
)  # prepare the application class which manages multi-config setups
from fabric.widgets.box import Box  # gets the Box class
from fabric.widgets.label import Label  # gets the Label class
from fabric.widgets.wayland import (
    WaylandWindow,
    WaylandWindowExclusivity,
)  # grabs the Window class from Fabric


if __name__ == "__main__":
    box_1 = Box(
        orientation="v",  # vertical
        children=Label(label="this is the first box", angle=90),
    )
    box_2 = Box(
        spacing=28,  # adds some spacing between the children
        orientation="v",  # horizontal
        children=[
            Label(
                label="first in second box",
                angle=90,
            ),
            Label(
                label="second",
                angle=90,
            ),
        ],
    )

    box_1.add(box_2)  # append box_2 inside box_1 along with the label already in there

    window = WaylandWindow(
        child=box_1,
        anchor="left top bottom",
        # top, right, bottom, left
        margin=[10, 0, 10, 0],
        exclusivity=WaylandWindowExclusivity.AUTO,
    )

    app = Application(
        "default", window
    )  # define a new config named "defualt" which holds `window`

    app.run()  # run the event loop (run the config)
