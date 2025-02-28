#!/bin/bash

cd /var/www/masteradmin

# Migrate DB
if [  "$1" = 'up'  ]
then
   php yii migrate/up --interactive=0
elif [ "$1" = 'down' ]
then
   php yii migrate/down --interactive=0
else
   printf "Enter 'up' to create data \nEnter 'down' to revert data\n"
fi
