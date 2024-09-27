#!/bin/bash

export PATH="/opt/homebrew/bin:$PATH"
eval "$(fnm env --use-on-cd)"

cd "$(dirname "$0")"
HOST=127.0.0.1 PORT=1337 node build
