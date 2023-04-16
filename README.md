License: GPL (infected by slint example, TODO rewrite it)

dokku deploy

```
cd shades-makepad
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-makepad dokku@apps.loskutoff.com:shades-makepad
git subtree push --prefix shades-makepad dokku-makepad master
ssh root@apps.loskutoff.com
dokku config:set shades-makepad NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-makepad email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-makepad
```
