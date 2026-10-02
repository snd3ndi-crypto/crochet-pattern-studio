# Crochet Pattern Studio

A responsive static website built with HTML, CSS, and vanilla JavaScript. It is suitable for GitHub Pages and configured to link to the existing AffichFoot site.

## Files

- `index.html` — page structure and content
- `style.css` — responsive layout and visual design
- `config.js` — Blogger URL, article links, and editable pattern cards
- `script.js` — pattern search/filtering, stitch calculator, and navigation

## 1. Configure your Blogger links

Open `config.js` and replace every occurrence of:

`https://YOUR-BLOGGER-BLOG.blogspot.com/`

with your actual Blogger URL, for example `https://yourblog.blogspot.com/`.

Then update `articleLinks` with the exact URLs of relevant articles:
- `basics`: your beginner crochet guide
- `stitches`: your stitch tutorial or stitch library
- `finishing`: your finishing tips article

Inside each pattern in the `patterns` array, change `articleUrl` to the most relevant article URL. If it is blank, the card links to your main Blogger site.

Use real article URLs; do not leave placeholder URLs on the published website.

## 2. Publish with GitHub Pages

1. Sign in at https://github.com/.
2. Create a new **public** repository, for example `crochet-pattern-studio`.
3. Upload `index.html`, `style.css`, `config.js`, `script.js`, and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/(root)`, then save.
7. Wait for the deployment to finish. Your site URL will look like:
   `https://YOUR-USERNAME.github.io/crochet-pattern-studio/`

GitHub's interface can change; consult https://docs.github.com/pages if a menu differs.

## 3. Customize the pattern library

In `config.js`, each pattern has:
- `title`: visible project name
- `category`: `beginner`, `home`, `accessories`, or `flowers`
- `level`: skill level text
- `time`: estimated project time
- `description`: short original description
- `image`: image URL
- `alt`: accessible image description
- `articleUrl`: relevant Blogger article URL

Only use images you own, have permission to use, or are licensed for your intended use. The starter image URLs are illustrative; replace them with suitable licensed images and verify each image before publishing.

## 4. Pinterest traffic workflow

1. Create original, helpful vertical Pins (a common starting size is 1000 × 1500 px).
2. Use a clear title and description that accurately match the destination page.
3. Link each Pin directly to the most relevant useful page, whether a detailed Blogger tutorial or a relevant section of this site.
4. Make sure the destination page delivers what the Pin promises and works well on mobile.
5. Review Pinterest analytics and Blogger/Google Analytics data to understand which topics bring engaged visitors.

Do not use automated traffic, click exchanges, misleading Pins, or ask visitors to click ads. AdSense revenue is not guaranteed. Follow Pinterest, GitHub, and AdSense policies.

## 5. Important notes

- GitHub Pages serves static files. This project does not require a backend or database.
- The stitch calculator is an estimate based on the gauge entered by the visitor; it is not a substitute for a tested crochet pattern.
- External image links and Google Fonts require an internet connection. If an image stops working, replace its URL in `config.js`.
- Consider adding About, Contact, Privacy Policy, and Disclaimer pages as appropriate for your site and audience.
