# Akshay the Coder

A responsive, dependency-free portfolio site for Akshay Kumar. The page uses the supplied profile brief and integrates Ben 10 artwork into the hero, About, and Tech Arsenal sections, with custom CSS/SVG project illustrations.

## Run locally

Open `index.html` directly, or serve this folder over HTTP:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

There is no package installation or build step. The site is static HTML, CSS, JavaScript, and local image assets, so it can be deployed to any static hosting provider.

## Update profile links

Search `index.html` for `linkedin.com/in/aky0706` and `github.com/akshay627-crypto` to update the contact and footer links. An email address was not included because none was supplied in the available profile materials.

## Artwork

The hero uses `assets/ben-hero.jpg`, the About section uses `assets/ben-waybig.jpg`, and Tech Arsenal uses `assets/ben-omnitrix-portrait.jpg`. All nine supplied Ben 10 images are retained in `assets/`; the others remain available without being forced into the page.
