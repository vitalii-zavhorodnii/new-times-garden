#!/bin/bash

# 1. Отменить все изменения в репозитории с удалением новых файлов, если такие были
git reset --hard HEAD
git clean -df

# 2. Стянуть изменения с репозитория
git pull origin main

# 3. Создать билд командой npm run build:client
npm run build:client

# 4. Переместить созданный билд клиента в папку apps/api/static
mv apps/client/dist/* apps/api/static/

echo "All done!"
