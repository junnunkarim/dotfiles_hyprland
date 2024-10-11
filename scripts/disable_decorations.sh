#!/usr/bin/env sh

HYPR_DISABLE_DECORATIONS=$(hyprctl getoption animations:enabled | awk 'NR==1{print $2}')

if [ "$HYPR_DISABLE_DECORATIONS" = 1 ]; then
  hyprctl --batch "\
    keyword animations:enabled 0;\
    keyword decoration:drop_shadow 0;\
    keyword decoration:blur:enabled 0;\
    keyword decoration:rounding 0"
  exit
else
  hyprctl reload
fi

# hyprctl --batch "\
#   keyword animations:enabled 0;\
#   keyword decoration:drop_shadow 0;\
#   keyword decoration:blur:enabled 0;\
#   keyword general:gaps_in 0;\
#   keyword general:gaps_out 0;\
#   keyword general:border_size 1;\
#   keyword decoration:rounding 0"