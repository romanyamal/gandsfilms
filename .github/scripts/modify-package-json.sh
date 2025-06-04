#!/bin/bash

set -e

HOMEPAGE_URL="https://${USERNAME}.github.io/${REPO_NAME}/"

jq \
  --arg homepage "$HOMEPAGE_URL" \
  '.homepage = $homepage | .scripts.predeploy = "npm run build" | .scripts.deploy = "gh-pages -d dist"' \
  package.json > temp_package.json && mv temp_package.json package.json

echo "--- Modified package.json ---"
cat package.json
echo "-----------------------------"
