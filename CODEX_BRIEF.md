# Codex brief — Below the Bog

Open this folder in Codex and run this interactive WebGL exhibit. The current code is a dependency-light static Three.js experience. Start it with `python -m http.server 8080` and open `http://localhost:8080`.

Important constraints when improving:

1. The current scene is an **illustrative European Sphagnum raised bog**, NOT a measured or universal soil profile. Do not introduce literal depths or ages without specimen data.
2. Preserve the distinction between **hydrological acrotelm/catotelm** and **decomposition classes fibric/hemic/sapric**; the latter do not necessarily follow a monotonic depth sequence.
3. Fen material and gyttja are site-history-dependent. Gyttja is described as an option, not hard-coded as a mandatory band.
4. Use primary scientific sources, vetted bibliography, DOI links and an honest disclaimer for all museum copy.
5. Make the cylinder look more photorealistic over time using authored PBR textures, scientifically annotated real core photos, or photogrammetry (with documented permission) if available. Keep the synthetic textures labeled conceptual.
6. Extend with an optional guided audio mode, two comparisons (bog/fen) and a specimen-data mode driven by real layer thicknesses and macrofossil observations.
7. For a physical museum kiosk, vendor Three.js and fonts to make the exhibit completely offline.

A browser-based visual verification is still needed on the target computer; syntax is statically verified but no local WebGL screenshot could be captured in the build environment.