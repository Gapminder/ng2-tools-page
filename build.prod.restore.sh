#!/usr/bin/env bash

cd /opt

if [ ! -f ./ng2-tools-page-nginx.backup.tar.gz ]
  then
    echo "Backup was not found - nothing to restore!"
  else
    rm -rf ng2-tools-page-nginx
    tar xvf ng2-tools-page-nginx.backup.tar.gz
fi
