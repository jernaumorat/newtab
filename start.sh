#!/bin/bash

cd "$(dirname "$0")"
HOST=127.0.0.1 PORT=1337 /Users/nmunk/.bun/bin/bun run build/index.js
