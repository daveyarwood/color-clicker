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

## Ideas

* See if there is some way to make the progression of colors more visually
  intuitive. At the moment, it sort of looks like continuously cycles from black
  to white in various hues, and it's hard to tell apart all of the different
  shades of black to get a clear sense of how high/low the value of the color
  block is. Maybe there is some way to sort all of the color values from dark to
  light?
  * [This article][color-models-and-spaces] has some good information about RGB
    vs. HSV vs. HSL.
  * Another idea is that we could use only a fixed set of colors that are
    visually distinguishable and map them to a range of numbers.
  * Or maybe we can punt on this idea altogether. Maybe the lack of intuition
    about how much value a color block has is a feature, not a bug?

* Incorporate shapes as well, e.g. other characters from the [UTF-8 Geometric
  Shapes][utf-geometric] charset. This could be useful for later in the game
  when the scale goes up. For example, 10 ■ could equal 1 ▣, 100 ■ could equal 1
  ▧, etc.

[color-models-and-spaces]: https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html
[utf-geometric]: https://www.w3schools.com/charsets/ref_utf_geometric.asp
