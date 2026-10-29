# solcredio - Personal Portfolio

Personal portfolio and professional landing page for **Lyndon Pascua Jr.**, a remote IT support specialist and MSP service desk technician based in the Philippines.

🌐 [solcredio.com](https://www.solcredio.com)

---

## About

Static single-page portfolio built with plain HTML and CSS - no frameworks, no build tools, no dependencies. Fast, responsive, and works everywhere.

---

## Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 |
| Font | Newsreader + Hanken Grotesk (self-hosted) |
| Analytics | Google Analytics (gtag.js) |
| Hosting | GitHub Pages |

---

## Features

- Full-viewport hero with fade-up entrance animations
- Topbar transparent on landing, transitions to opaque on scroll
- CSS-only hamburger menu on mobile, split navigation on desktop
- Collapsible experience and education entries via `<details>` / `<summary>`
- Smooth scroll navigation
- Google Analytics with resume download and outbound link tracking
- SEO optimized - meta tags, Open Graph, Twitter Card, JSON-LD structured data
- `robots.txt` and `sitemap.xml` for search engine crawling
- Google Search Console verified

---

## 🚀 Deploying with Docker behind Caddy

`www.solcredio.com` is served by **GitHub Pages**. The Docker image is a second way to host the same site, built by GitHub Actions on every push to `main` and published to `ghcr.io/solcredio-admin/portfolio:latest`.

Inside the container, **nginx listens on port 80** (`nginx.conf`): clean URLs, a real 404 page, gzip, cache headers, security headers, and a healthcheck. The intended layout is:

```
Browser --HTTPS--> Caddy on the host --HTTP--> 127.0.0.1:3000 --> container :80 (nginx)
```

### Start or update

`compose.yaml` in this repo publishes the site on `127.0.0.1:3000` only, so Caddy is the one public entry point.

```bash
docker compose pull
docker compose up -d
docker compose ps        # STATUS should become "healthy"
curl -I http://127.0.0.1:3000/
```

### Caddy (host)

Add or keep a site block like this in your existing Caddyfile. Change only this site's block.

```caddyfile
www.solcredio.com {
    header Strict-Transport-Security "max-age=31536000"
    reverse_proxy 127.0.0.1:3000
}

solcredio.com {
    redir https://www.solcredio.com{uri} permanent
}
```

nginx already sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`, so don't repeat them in Caddy. Validate before reloading:

```bash
caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### Rollback

Each push overwrites `:latest`, so pin the previous build by digest, which `docker images --digests` shows:

```yaml
image: ghcr.io/solcredio-admin/portfolio@sha256:<previous-digest>
```

Then run `docker compose up -d` again.

---

## Sections

- **Hero** - Name, role, and links to email and the resume
- **About** - What I do for MSPs, in two short paragraphs
- **What I take off your plate** - Concrete tasks I handle
- **Toolkit** - Core systems, RMM/PSA, security, infrastructure, documentation
- **Experience** - Service Desk Technician, Marketing Head, Photographer, Corporate Communications Intern
- **Homelab projects** - Omada network, Proxmox lab, TrueNAS server
- **Education** - Lyceum of the Philippines University – Cavite (BA Communication, Broadcasting)
- **Contact** - Email, Upwork, resume, LinkedIn, GitHub

---

## File Structure

```
/
├── index.html                  # Main page
├── 404.html                    # Not-found page (GitHub Pages and nginx both use it)
├── style.css                   # All styles, including @font-face
├── assets/
│   ├── fonts/                  # Self-hosted Newsreader and Hanken Grotesk (woff2, latin)
│   ├── img/                    # Hero photos (WebP), logo, favicon, touch icon
│   ├── js/                     # main.js (nav behaviour), analytics.js (GA4 bootstrap)
│   ├── favicon.png             # Full-size logo, used for social previews
│   └── pascuajr-resume.pdf     # Downloadable resume
├── robots.txt / sitemap.xml    # Crawler instructions
├── google6b5e421518ff1881.html # Google Search Console verification
├── CNAME                       # GitHub Pages custom domain
├── Dockerfile / nginx.conf     # Container image
└── compose.yaml                # Container deployment
```

The page's Content Security Policy is in a `<meta>` tag in `index.html`. If you add a script, font or service from another domain, add that domain to the policy or the browser will block it.

---

## Contact

- **Email:** lyndon.pascuajr@solcredio.com
- **Upwork:** [upwork.com/freelancers/lyndon-pascua-jr](https://www.upwork.com/freelancers/~018e90d294e8a6b537)
- **LinkedIn:** [linkedin.com/in/lyndon-pascua-jr](https://www.linkedin.com/in/lyndon-pascua-jr-0a8520100/)
- **GitHub:** [github.com/solcredio-admin](https://www.github.com/solcredio-admin)

---

© 2026 Solcredio — Lyndon Pascua Jr.
