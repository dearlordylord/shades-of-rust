dokku deploy

```
cd shades-egui
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-egui dokku@apps.loskutoff.com:shades-egui
git subtree push --prefix shades-egui dokku-egui master
ssh root@apps.loskutoff.com
dokku config:set shades-egui NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-egui email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-egui
```
