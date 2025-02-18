from ignis.widgets import Widget

popup_widget = Widget.PopoverMenu(
    items=[
        Widget.MenuItem(
            label="Just item",
            on_activate=lambda x: print("item activated!"),
        ),
        Widget.MenuItem(
            label="This is disabled item",
            enabled=False,
            on_activate=lambda x: print(
                "you will not see this message in terminal hehehehehe"
            ),
        ),
        Widget.MenuItem(
            label="This has submenu!",
            on_activate=lambda x: print("anyway activate callback working"),
            submenu=Widget.PopoverMenu(
                items=[Widget.MenuItem(label=str(i)) for i in range(10)]
            ),
        ),
    ],
)

popup_container = Widget.Box(
    vertical=True,
    child=[
        Widget.Button(
            on_click=lambda self: popup_widget.popup(),
            child=Widget.Label(label="button"),
        ),
        popup_widget,
    ],
)

test = Widget.Box(
    vertical=True,
    child=[
        Widget.Label(label="22"),
        Widget.Label(label=":"),
        Widget.Label(label="00"),
    ],
)

test1 = Widget.Box(
    vertical=True,
    child=[Widget.Label(label=letter) for letter in "large text goes here"],
)

box_widget = Widget.Box(
    vertical=True,
    # spacing=10,
    child=[
        Widget.Label(
            label="even though it rotates but isn't dynamic and can't properly position the text",
            style="transform: rotate(90deg);",
        ),
    ],
)

popup_container = Widget.Box(
    vertical=True,
    child=[
        Widget.Button(
            on_click=lambda self: popup_widget.popup(),
            # Widget.Box to have both label and popup_widget
            child=Widget.Box(
                child=[
                    Widget.Label(label="button"),
                    popup_widget,
                ]
            ),
        ),
    ],
)

Widget.Window(
    namespace="bar",
    anchor=["left", "top", "bottom"],
    exclusivity="exclusive",
    margin_top=10,
    margin_bottom=10,
    margin_left=10,
    child=popup_container,
)
