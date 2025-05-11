# color-clicker

## Development

To serve the app locally and automatically recompile whenever code changes:

```bash
yarn dev
```

To automatically run tests every time code changes:

```bash
find . -type f -name '*.ts' | entr -r bash -c "npx vitest run"
```

## Color currency

### Overview

The core mechanic of this game is the visual representation of currency as
colored blocks. This is based on the HSL, with the Saturation and Light
components always set to 50%, and the Hue component cycling through the range
from 0 to 360°. Because 0° and 360° are visually the same color, we represent
360° as solid black (HSL: 0, 0, 0).

In effect, the numbers 0 through 360 are represented as a single block, where
the color starts at red (0°), goes through yellow (60°), green (120°), cyan
(180°), blue (240°), and magenta (300°) before returning to red (359°) and then
finally settling at black (360°).

The next 360 numbers (361-720) are represented as a second block, which works
the same way, cycling through the color spectrum again until it reaches its full
value and then becoming black.

In other words, every black square is worth 360, and every colored square is
worth between 1 and 359, depending on the hue. Each time you earn a black square
(360), you keep it and begin earning a new square as it cycles through the
colors and eventually becomes black.

### Reference

* [Color models and color spaces][color-models-and-spaces]

* [A guide to modern CSS colors with RGB, HSL, HWB, LAB and
  LCH][modern-css-colors]

## TODO

* Admin panel to assist with development

* "Paid" features:
  * Line wrapping
  * Larger increments (e.g. 15, 30, 45)
  * Auto-clicker
  * Upgrade auto-clicker (increase rate/increment)
  * Lotto ticket

* Fake "ads" for the paid features ("tired of clicking?")

* Incorporate shapes as well, e.g. other characters from the [UTF-8 Geometric
  Shapes][utf-geometric] charset. This could be useful for later in the game
  when the scale goes up. For example, 10 ■ could equal 1 ▣, 100 ■ could equal 1
  ▧, etc.

* Auto-conversion to different shapes (see above)

* Occasionally offer to upgrade to more "fashionable" shapes
  * Squares => rounded squares => circles => fancy squares w/ crosshatch fill

* Think about interesting ways to change the game later on
  * Something kind of like Universal Paperclips
  * Invest color currency on the stock market and/or cryptocurrency (ColorCoin)
  * Something AI related?
  * Society simulator? (jobs, à la Kittens game, Age of Empires)

* Make this game more accessible to colorblind people, e.g. Monochrome mode

[color-models-and-spaces]: https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html
[modern-css-colors]: https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/
[utf-geometric]: https://www.w3schools.com/charsets/ref_utf_geometric.asp
