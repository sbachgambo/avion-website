# Avion Partners Limited — website

This is a ready-to-host static website: plain HTML, CSS and JavaScript. It needs no WordPress, no database and no plugins.

## Pages (same addresses as the old WordPress site)

| Address | File |
|---|---|
| `/` | `index.html` |
| `/company-overview/` | `company-overview/index.html` |
| `/avion-services/` | `avion-services/index.html` |
| `/avion-certificates/` | `avion-certificates/index.html` |
| `/contact/` | `contact/index.html` |
| `/privacy-policy/` (new) | `privacy-policy/index.html` |
| any missing page | `404.html` |

Because the addresses haven't changed, existing links, Google results and business cards still work.

## Going live: 4 steps

1. **Images (done).** `download-images.ps1` has already copied the logo, photos, partner logos, certificates and video
   from WordPress into `assets/img` and `assets/video`. Only re-run it if those folders go missing, and only while WordPress is still running:
   `powershell -ExecutionPolicy Bypass -File .\download-images.ps1`
2. **Back up WordPress.** In cPanel or your host's file manager, download a copy of `public_html`.
3. **Upload the site.** Remove WordPress from `public_html` (at least `index.php` and its `.htaccess`), then upload this folder's contents,
   keeping the folder structure. Our own `.htaccess` replaces WordPress's: it forces https://avion.com.ng, shows `404.html` for missing pages
   and sets caching. File managers often hide files starting with a dot, so check that `.htaccess` was uploaded.
   `README.md` and `download-images.ps1` don't need uploading (`.htaccess` blocks them anyway).
4. **Check the site.** Open each page on desktop and phone, test the phone, email and contact form links, and open a made-up address
   (e.g. `/test`) to see the 404 page. If you get "too many redirects", see the note at the top of `.htaccess`.
   Then submit `https://avion.com.ng/sitemap.xml` in Google Search Console.

## Contact

There is no contact form. Visitors call +234 903 118 8451 or email info@avion.com.ng using the buttons on the Contact page.
To change the phone number or email address, search all HTML files for the old one and replace it everywhere (including `privacy-policy/index.html`).

## Certificates

The certificate images in `assets/img/cert-*.jpg` have had tax IDs, reference numbers, QR codes, signatures, financial figures
and private addresses blurred. When a certificate is renewed, blur the same details on the new scan before replacing the file.

## Editing

- **Wording:** edit the HTML files directly. The header and footer are repeated on every page, so make the same change in all six page files (and in `404.html`, which uses links starting with `/`).
- **Colours and fonts:** change them at the top of `assets/css/style.css` (`:root`).
- **Images:** replace any file in `assets/img` with a new file of the same name.

## Palette

| Role | Colour |
|---|---|
| Midnight navy | `#0B1F44` |
| Azure | `#1F5BE0` |
| Orchid (from the logo ring) | `#C8367A` |
| Ivory | `#F7F5F0` |

Fonts: Plus Jakarta Sans (headings) and Inter (body text), both from Google Fonts.
