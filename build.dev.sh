eval "$(ssh-agent -s)"
cd /home/root

# CLONE: Vizabi, Tools Page ------------------------------------

ssh-add /home/root/vizabi_tools_deploy_ssh

git clone git@github.com:vizabi/vizabi.git -b develop
git clone git@github.com:Gapminder/ng2-tools-page.git


# BUILD: Vizabi ------------------------------------------------
cd vizabi
echo $PWD

git pull origin develop

rm -rf node_modules
npm i --unsafe-perm
npm run build:prod

# BUILD: Tools Page --------------------------------------------
cd ../ng2-tools-page
echo $PWD

git pull origin development

rm -rf node_modules
npm i --unsafe-perm
npm i --unsafe-perm ../vizabi
npm rebuild

npm run build:dev
