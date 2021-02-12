#!/bin/bash

git fetch --all
git checkout --force "origin/deploy"
npm i
npm run prod
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
deactivate
sudo systemctl stop gunicorn
sudo systemctl start gunicorn
