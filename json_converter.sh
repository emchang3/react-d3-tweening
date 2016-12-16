#!/bin/bash

sed -i -- "s/\[/module.exports = \[/g" $1

sed -i -- "s/\(:.*[0-9]\)/ value\1 }/g" $1
sed -i -- "s/\(\".*\"\)/{ key: \1,/g" $1
