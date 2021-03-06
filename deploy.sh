#!/usr/bin/env sh

# abort on errors
set -e

# remove old build
sudo rm -r dist

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b master
git add -A
git commit -m 'deploy'

git push -f git@planosur.github.com:planosur/planosur.github.io.git master

cd -
