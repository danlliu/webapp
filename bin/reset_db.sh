#!/bin/bash

set -Eeuo pipefail
set -x

rm -f var/webapp.sqlite3
sqlite3 var/webapp.sqlite3 < sql/schema.sql
sqlite3 var/webapp.sqlite3 < sql/data.sql

