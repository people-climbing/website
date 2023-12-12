#! bash

STATUS="$(git status)"

if [[ $STATUS == *"nothing to commit, working tree clean"* ]]
then
    sed -i "" '/out/d' ./.gitignore
    git add .
    git commit -m "deploy '$(git log -1 --pretty=format:%B)'"
    git push origin `git subtree split --prefix out main`:gh-pages --force
    git reset HEAD~
    git checkout .gitignore
else
    echo "need clean working directory to publish"
fi
