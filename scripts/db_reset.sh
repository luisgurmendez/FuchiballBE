#!/bin/bash
db_name="$2"
if [ -z "$db_name" ]
then
  db_name="elcanchero"
fi

psql postgres -c "DROP DATABASE $db_name;"
psql postgres -c "CREATE DATABASE $db_name;"
exit 0;