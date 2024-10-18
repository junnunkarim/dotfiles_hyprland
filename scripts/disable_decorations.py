#!/usr/bin/env python3

import subprocess
import shlex
import argparse


# check if hyprland animations are enabled
def get_hypr_decoration_status():
    cmd = "hyprctl getoption animations:enabled"
    result = subprocess.run(shlex.split(cmd), capture_output=True, text=True)

    return result.stdout.split()[1]  # extract the second column (value)


# disable only animation and blur
def disable_anim_blur():
    batch_cmd = """hyprctl --batch "keyword animations:enabled 0;
                    keyword decoration:blur:enabled 0;
                    keyword decoration:active_opacity 0.95;
                    keyword decoration:inactive_opacity 0.85"
                 """
    subprocess.run(shlex.split(batch_cmd))


def disable_gaps():
    batch_cmd = """hyprctl --batch "keyword general:gaps_in 0;
                    keyword general:gaps_out 0;
                    keyword decoration:rounding 0"
                 """
    subprocess.run(shlex.split(batch_cmd))


# disable all hyprland decorations
def disable_all_decorations():
    batch_cmd = """hyprctl --batch "keyword animations:enabled 0;
                    keyword decoration:drop_shadow 0;
                    keyword decoration:blur:enabled 0;
                    keyword general:gaps_in 0;
                    keyword general:gaps_out 0;
                    keyword decoration:rounding 0;
                    keyword decoration:active_opacity 0.95;
                    keyword decoration:inactive_opacity 0.85"
                 """
    subprocess.run(shlex.split(batch_cmd))


# main function to handle the cli arguments
def main():
    parser = argparse.ArgumentParser(description="Disable Hyprland decorations.")
    parser.add_argument(
        "--anim_blur", action="store_true", help="Disable only animations and blur"
    )
    parser.add_argument("--gaps", action="store_true", help="Disable only gaps")
    parser.add_argument("--all", action="store_true", help="Disable all decorations")

    args = parser.parse_args()

    # check if animations are enabled
    if get_hypr_decoration_status() == "1":
        if args.anim_blur:
            disable_anim_blur()
        if args.gaps:
            disable_gaps()
        elif args.all:
            disable_all_decorations()
        else:
            print("No valid option provided. Use --anim_blur or --all.\n")
            parser.print_help()
    else:
        # reload default hyprland config if animations are not enabled
        subprocess.run(shlex.split("hyprctl reload"))


if __name__ == "__main__":
    main()
