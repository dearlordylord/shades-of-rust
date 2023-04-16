License: GPL (infected by slint example, TODO rewrite it)

dokku deploy

```
cd shades-relm4
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-relm4 dokku@apps.loskutoff.com:shades-relm4
git subtree push --prefix shades-relm4 dokku-relm4 master
ssh root@apps.loskutoff.com
dokku config:set shades-relm4 NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-relm4 email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-relm4
```
