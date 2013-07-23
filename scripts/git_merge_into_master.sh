#!/bin/bash


#!/bin/bash


branchs=`git branch | awk '{print $NF}'`
our_branch=`git branch | grep '*' | awk '{print $NF}'`

echo "git push $our_branch"
git push

echo "Go to master"
git checkout master
echo "merge our branch"
git merge $our_branch

echo "push master (y/N)? (IF NO CONFLICTS!!!)"
read response
[ "$response" != "y" ] && echo "exit" && exit 0

echo "git push master"
git push
echo "Return to original branch '$our_branch'"
git checkout $our_branch

