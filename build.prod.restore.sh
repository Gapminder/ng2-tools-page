#!/usr/bin/env bash

cd /opt

if [ ! -f ./ng2-tools-page.backup.tar.gz ]
  then
    echo "Backup was not found - nothing to restore!"
  else
    rm -rf ng2-tools-page
    tar xvf ng2-tools-page.backup.tar.gz
fi
