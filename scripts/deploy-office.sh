#!/bin/bash
# Builds the site (served at https://users.flatironinstitute.org/~magland/spikeforest/
# and https://spikeforest.flatironinstitute.org/)
# and copies it to public_www on the office machine.
set -e

cd "$(dirname "$0")/.."

(cd client && npm run build)
node scripts/build-static-api.js

ssh office 'rm -rf /mnt/home/magland/public_www/spikeforest'
scp -rq client/build office:/mnt/home/magland/public_www/spikeforest
