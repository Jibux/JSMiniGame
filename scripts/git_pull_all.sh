#!/bin/bash


branchs=`git branch | awk '{print $NF}'`
current=`git branch | grep '*' | awk '{print $NF}'`

echo "git fetch all..."
git fetch origin

echo "Update branchs..."
for branch in `echo -e $branchs`; do
	git checkout "$branch"      || exit 1
	git rebase "origin/$branch" || exit 1
done

echo "Return to original branch '$current'"
git checkout $current

