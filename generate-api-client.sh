#!/usr/bin/env bash

set -Eeuo pipefail
set -x

# change to the web dir
cd ~/projects/next/

# copy the spec to the web dir
cp ~/projects/tallii/backend/api_spec.yaml api_spec.yaml

# remove the old gen
rm -rf ./api/tallii

# generate the files in the docker container and copy them out to the specified output folder
docker run --rm \
  -v "$(pwd)":/local \
  openapitools/openapi-generator-cli:v4.3.1 generate \
  -i /local/api_spec.yaml \
  -g typescript-fetch \
  -o "/local/api/tallii" \
  -c /local/config.json \
  --additional-properties=typescriptThreePlus=true

# change the owner of the folder to me
sudo chown -R $USER ./api/tallii

# run prettier to clean things up
npx prettier --write "api/tallii/**/*.{ts, tsx}"