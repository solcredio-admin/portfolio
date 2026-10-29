# Pinned to a stable minor line; bump deliberately and rebuild
FROM nginx:1.28-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Fail the build (in CI) on a broken config instead of at container start
RUN nginx -t

# Copy only what the site serves, so repo files (.git, README, CI config) never end up in the image
COPY index.html 404.html style.css robots.txt sitemap.xml google6b5e421518ff1881.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
