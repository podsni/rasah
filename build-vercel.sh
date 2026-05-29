#!/bin/bash
set -e

# Build dengan Nitro preset vercel
NITRO_PRESET=vercel bun run build

# Susun .vercel/output sesuai Vercel Build Output API v3
rm -rf .vercel/output
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions/__server.func

# config.json (routes)
cp dist/config.json .vercel/output/config.json

# Static assets (dist/client → .vercel/output/static)
cp -r dist/client/. .vercel/output/static/

# Server function (dist/server → .vercel/output/functions/__server.func)
cp -r dist/server/. .vercel/output/functions/__server.func/

echo "✓ .vercel/output ready"
