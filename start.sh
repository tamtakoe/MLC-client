#!/usr/bin/env sh

APPLICATION_NAME=MLC-client

echo "---- START ----"
echo $(pwd)
echo $(ls)

#/opt/replace_placeholders.sh /opt/$APPLICATION_NAME/config  # production case

# Production mode
su -c "NODE_ENV=production node apps/api/main.js"

# Debug mode
#su -c "node --inspect=0.0.0.0:9229 --max-old-space-size=1536 apps/api/main.js" ibservice

