#!/bin/bash
# Starts the API server in dev mode

set -e

if test -f "src/pre-start/env/development.env"; then
  # all good
  echo "Starting server in dev mode..."
else
  echo "development.env file not found"
  read -p "Create it from development.env.example? [Yn] " yn
    case $yn in
      [Nn]* )
        ;;
      * ) 
        cp src/pre-start/env/development.env.example src/pre-start/env/development.env
        ;;
    esac
fi

NODE_OPTIONS=--unhandled-rejections=strict yarn run nodemon
