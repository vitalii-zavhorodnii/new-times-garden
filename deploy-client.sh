#!/bin/bash

git reset --hard HEAD
git clean -df
git pull origin main

npm run build:client

rm -rf apps/api/static/*
mv -r apps/client/dist/* apps/api/static/

echo "All done!"
