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

Reference:

* [Color models and color spaces][color-models-and-spaces]

* [A guide to modern CSS colors with RGB, HSL, HWB, LAB and
  LCH][modern-css-colors]

## TODO

* Pay for an auto-clicker

* Pay to upgrade auto-clicker (increase rate/increment)

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

[color-models-and-spaces]: https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html
[modern-css-colors]: https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/
[utf-geometric]: https://www.w3schools.com/charsets/ref_utf_geometric.asp
