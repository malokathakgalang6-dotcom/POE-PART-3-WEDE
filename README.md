# Copperleaf Electrical – Website (WEDE5020 POE)
Maloka Thakgalang
ST10512359

Professional electrical services website for **Copperleaf Electrical**, serving residential, commercial and industrial clients in Johannesburg and Mohlalaotwane, South Africa.

**Module:** WEB DEVELOPMENT (INTRODUCTION) – WEDE5020  
**Part:** Part 3 – Enhancing Functionality and SEO

---

## Live Demo / Deployment

- **GitHub Pages / Netlify:** 
  https://github.com/malokathakgalang6-dotcom/POE-PART-3-WEDE.git

Deploy steps (GitHub Pages):
1. Push this repository to GitHub.
2. Settings → Pages → Source: Deploy from branch `main` / root.
3. Or connect the repo to [Netlify](https://www.netlify.com/) for continuous deployment.

---

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home – introduction and call-to-action |
| `about.html` | About the company |
| `services.html` | Service listings, search, FAQ accordion, image gallery + lightbox |
| `enquiry.html` | Service enquiry form with client-side validation |
| `contact.html` | Contact details, interactive map, contact form with validation + mailto |

---

## Part 3 Features Implemented

### Functionality / Interactive Elements
- **Service search** – live filter of service cards + Clear Search button
- **FAQ accordion** – accessible expand/collapse (one open at a time)
- **Gallery lightbox** – click thumbnail to open enlarged image in a modal (`<dialog>`)
- **Interactive map** – Leaflet + OpenStreetMap on the Contact page (Johannesburg branch marker)
- **CSS transitions / hover effects** on gallery and buttons

### Forms & Validation
- **Enquiry form** – name, email, phone, service type, message  
  Client-side validation with clear error messages and success feedback.  
  *Limitation:* no server backend; validation is client-side only. In production you would send data to a server, Formspree, Netlify Forms, etc.
- **Contact form** – name, email, phone, message type, message  
  Client-side validation + builds a `mailto:` link so the visitor can send the message from their own email client.

### SEO
- Unique, descriptive **title tags** on every page
- **Meta descriptions** and **meta keywords** on every page
- Proper **heading hierarchy** (H1 site name, H2 section titles)
- **Descriptive image file names** and **alt text**
- Clean page URLs (static HTML)
- Internal links in navigation and footers
- Mobile-friendly viewport and responsive CSS
- `robots.txt` and `sitemap.xml` included

### Accessibility notes
- `aria-label`, `aria-expanded`, `aria-current`, `aria-live`, `aria-invalid`
- Keyboard-friendly lightbox and accordion
- Focus styles on interactive elements

---

## Changelog

### Part 3 – 2026-10-29
- Implemented FAQ accordion (HTML structure already present; added full JavaScript behaviour and CSS).
- Added interactive Leaflet map to Contact page with OpenStreetMap tiles and Johannesburg branch marker.
- Improved Contact form: added message-type select, proper labels, error messages, client-side validation, and mailto submission helper.
- Enhanced Enquiry form success messaging and documented client-side limitation.
- Added / updated SEO: title tags, meta descriptions, meta keywords, author meta across all pages.
- Renamed images to descriptive, SEO-friendly file names and updated all references + alt attributes.
- Created `robots.txt` and `sitemap.xml`.
- Unified header / navigation structure and active-page indicators across pages.
- Added CSS for FAQ, map, branch cards, form validation states, and mobile refinements.
- Updated this README with deployment notes, feature list and references.

### Part 2 feedback / improvements
- Service search and Clear Search retained and polished.
- Gallery lightbox retained and confirmed working.
- Enquiry form validation retained and clarified.
- Navigation labels made consistent (“About Us”, “Make an Enquiry”, “Contact Us”).
- Fixed broken image references that pointed to non-existent files.

---

## File Structure

```
copperleaf/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── about-copperleaf-electrical-services.png
    ├── contact-electrical-technician.jpeg
    ├── copperleaf-electrical-service-collage.png
    ├── electrical-enquiry-request.jpeg
    └── professional-electrical-services.png
```

---

## How to Run Locally

1. Clone or download the repository.
2. Open `index.html` in a modern browser, **or**
3. Serve with a local server (recommended so map tiles and modules work cleanly):

```bash
# Python 3
python -m http.server 5500

# then visit http://localhost:5500
```

---

## References

1. MDN Web Docs – HTML forms, form validation, `<dialog>`, ARIA. https://developer.mozilla.org/
2. Leaflet – open-source interactive maps. https://leafletjs.com/
3. OpenStreetMap – map tiles and data. https://www.openstreetmap.org/copyright
4. Google Search Central – SEO starter guide (title tags, meta descriptions, image SEO). https://developers.google.com/search/docs
5. W3C – HTML Living Standard. https://html.spec.whatwg.org/
6. Web Content Accessibility Guidelines (WCAG) – accessible names, keyboard interaction. https://www.w3.org/WAI/WCAG21/quickref/
7. Netlify / GitHub Pages documentation for static site deployment.

---

## Author

Student project for(WEDE5020) – Web Development (Introduction).  
Copperleaf Electrical is a fictional / project organisation used for assessment purposes.
