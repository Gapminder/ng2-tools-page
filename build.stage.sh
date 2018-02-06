#!/usr/bin/env bash

cd /home

eval "$(ssh-agent -s)"
ssh-add vizabi_tools_deploy_ssh

git clone git@github.com:Gapminder/ng2-tools-page.git -b master

cd ng2-tools-page
git pull origin master

rm -rf node_modules

npm i
npm rebuild
npm test
npm run build:stage
