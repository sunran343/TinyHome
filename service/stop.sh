#!/bin/sh
kill -9 `lsof -i:8091 | awk 'NR==2{print $2}'`
