#!/usr/bin/env bash

cd ./$1
npm run stop:blue
cd /opt
rm -rf  ng2-tools-page/*
cp -r ./$1/dist/* ./ng2-tools-page

