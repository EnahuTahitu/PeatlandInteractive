# Below the Bog — Interactive Virtual Peat Core

Museum-style, interactive 3D exhibit of a **conceptual** European *Sphagnum* raised-bog soil core.

## Run locally

1. Open this folder in **Codex / VS Code**.
2. Start a local web server (no npm installation required):
   ```bash
   python -m http.server 8080
   ```
3. Visit `http://localhost:8080` in a modern browser with WebGL enabled.

Three.js is loaded as a pinned ES module via jsDelivr; **an internet connection is needed for the first load** (and for Google Fonts). All peat textures are procedurally generated in-browser. For an offline kiosk, download and vendor the Three.js dependencies (plus remove or host the Google Fonts URLs) and update the importmap.

## Interactions

- **Click** the core to select one of six illustrated layers, or use the accessible left-side layer buttons.
- **Drag** to rotate, **scroll/pinch** to zoom, **right-drag** to pan.
- Toggle **cutaway** for a schematic interior cross section, **auto-spin**, or **reset**.
- Switch between **stratigraphy**, **hydrology**, and **decomposition**; these are intentionally separate interpretive lenses.
- **Arrow keys** in the focused 3D viewport move through layers.
- Use **Previous / Next** to follow the curator's sequence.
- Click scholarly citations in the right panel for source publications.

## Scientific model and limitations

The scene illustrates ONE plausible European raised-bog sequence: living moss and litter → relatively recognizable Sphagnum bog peat → variably decomposed buried bog peat → **optional earlier fen peat** → illustrative basal organic–mineral transition → older mineral substrate.

- This is **not a measured core**. No depth scale, ages, fixed layer thicknesses, or empirical identifications are inferred. All colours, plant fragments, textures and geometry are artistic approximations.
- **Acrotelm** and **catotelm** are *hydrological functional zones*; their approximate illustration is not tied to diagnostic fibric / hemic / sapric peat classes. Hydrological zones have no universally visible or fixed boundary (Ingram, 1978; Clymo, 1984).
- **Fibric**, **hemic**, **sapric** are *decomposition classes*, not mandatory vertically ordered horizons (USDA Soil Survey Staff, 2022). Humification is not necessarily monotonic with depth (Zaccone et al., 2018).
- Fen peat and the peat–mineral transition depend on site history. **Gyttja** may occur in lake-infill sequences but is **not obligatory**; paludification can form peat directly on mineral ground (Dating basal peat, 2022).
- The visual cutaway is a visualization, not a measured thin section or scientific record.

## Key scientific references

- Ingram, H.A.P. (1978). Soil layers in mires: function and terminology. *Journal of Soil Science*, 29, 224–227. https://doi.org/10.1111/j.1365-2389.1978.tb02053.x
- Clymo, R.S. (1984). The limits to peat bog growth. *Philosophical Transactions of the Royal Society B*, 303, 605–654. https://doi.org/10.1098/rstb.1984.0002
- Soil Survey Staff (2022). *Keys to Soil Taxonomy*, 13th edition. USDA NRCS. https://www.nrcs.usda.gov/resources/guides-and-instructions/keys-to-soil-taxonomy
- Zaccone, C., Plaza, C., Ciavatta, C., Miano, T.M., & Shotyk, W. (2018). Advances in the determination of humification degree in peat since Achard (1786): Applications in geochemical and paleoenvironmental studies. *Earth-Science Reviews*, 185, 163–178. https://doi.org/10.1016/j.earscirev.2018.05.017
- *Dating basal peat: The geochronology of peat initiation revisited* (2022). https://doi.org/10.1016/j.quageo.2022.101278
- NatureScot (2016). *A review of the influence of ombrotrophic peat depth on the successful restoration of bog habitat*, Commissioned Report 925.
- Irish Peatland Conservation Council. *Peatlands & Climate Change Action Plan 2030*, illustrated peat stratigraphy.

## Files

- `index.html` — exhibit layout, accessible controls, Three.js module import map
- `styles.css` — responsive museum-style interface
- `main.js` — source-grounded content, procedurally rendered core, cutaway, scientific layers, camera and interaction

## Extending in Codex

A useful next upgrade is a toggle between conceptual core profiles (raised bog, fen, blanket bog) with independently cited site histories, or replace synthetic material with photogrammetry / measured stratigraphic field observations. For a public kiosk, vendor all dependencies for full offline operation and test on kiosk hardware.