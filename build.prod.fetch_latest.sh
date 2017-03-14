#!/usr/bin/env bash

cd /opt
eval `ssh-agent -s`
ssh-add ./vizabi_tools_deploy_ssh
git clone git@github.com:Gapminder/ng2-tools-page.git -b master
cd ng2-tools-page
git pull origin master
npm i
npm rebuild
npm run stop:blue
npm run start:blue
