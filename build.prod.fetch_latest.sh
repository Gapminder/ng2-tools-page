#!/usr/bin/env bash

cd /opt
eval `ssh-agent -s`
ssh-add ./vizabi_tools_deploy_ssh
git clone git@github.com:Gapminder/ng2-tools-page.git -b master $1
cd $1
npm i
npm rebuild
npm run start:blue
