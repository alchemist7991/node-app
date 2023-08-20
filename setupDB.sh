#! /bin/sh

if [ "$1" != "migrate" ] && [ "$1" != "seed" ]; then
    echo "Please pass './setupDB.sh migrate' or './setupDB.sh seed' "
else
   sudo docker exec nodeproject_server_1 npm run $1
fi
 
