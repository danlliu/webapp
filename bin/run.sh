#!/bin/bash

set -Eeuo pipefail
set -x

export FLASK_APP=webapp
flask run
