sed -i -- "s/ \(.*\),/,/g" $1
sed -i -- "s/\(.*[0-9],\)/{ year: \1/g" $1
sed -i -- "s/,\(.*\)/, share: \1 },/g" $1
sed -i -- "1s/^/module.exports = \[/" $1
sed -i -- "\$s/},/}\]/" $1

mv $1 source/data/$1

# Remember to change the file extension.
