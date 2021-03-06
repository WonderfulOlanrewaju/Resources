#!/bin/bash
for file in *.md; do
	while read line; do

		url=$(echo "$line" | sed s/.*\(// | sed s/\)// | sed s/^##.*//)

		if [[ ! -z "$url" ]]; then
			status_code=$(curl -m 10 -s -o /dev/null -w "%{http_code}" $url)
			if [ $status_code == "000" ] || [ $status_code == "404" ] || [ $status_code == "403" ] || [ $status_code == "400" ]; then
				echo "${line}"
			fi
		fi
	done <"$file"
done
