#!/bin/bash

if [ -d "caffeine-theme" ]; then
  echo "\nCaffeine Theme is already installed. Maybe you want to update? Run:"
  echo "\ncd caffeine-theme && sh scripts/update.sh\n"
  exit
fi

git clone https://github.com/kelyvin/caffeine-theme.git && cd caffeine-theme

. "$PWD"/scripts/utils.sh

welcome

echo "Getting the repository tagged commits"
git fetch --tags

echo "Resolving the latest tagged version"
latestTag=$(git describe --tags "$(git rev-list --tags --max-count=1)")

echo "Creating a stable branch from the latest tagged version"
git checkout "$latestTag"
git checkout -b stable

echo "\nTheme Installed Successful! Enjoy :-)"
