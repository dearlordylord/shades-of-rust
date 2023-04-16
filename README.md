License: GPL (infected by slint example, TODO rewrite it)

dokku deploy

```
cd shades-bracket-lib
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-bracket-lib dokku@apps.loskutoff.com:shades-bracket-lib
git subtree push --prefix shades-bracket-lib dokku-bracket-lib master
ssh root@apps.loskutoff.com
dokku config:set shades-bracket-lib NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-bracket-lib email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-bracket-lib
```
