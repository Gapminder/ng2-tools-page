#!/usr/bin/env bash

cd /opt/ng2-tools-page
npm run stop:blue

cd /opt
rm -rf  ng2-tools-page-nginx/*
mkdir -p ./ng2-tools-page-nginx/tools
cp -r ./ng2-tools-page/dist/* ./ng2-tools-page-nginx/tools

