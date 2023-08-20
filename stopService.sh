#! /bin/sh

sudo docker-compose down -v

# remove all volumes
sudo docker volume ls -q | xargs sudo docker volume rm
