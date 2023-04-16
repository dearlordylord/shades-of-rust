dokku deploy

```
cd shades-dioxus
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-dioxus dokku@apps.loskutoff.com:shades-dioxus
git subtree push --prefix shades-dioxus dokku-dioxus master
ssh root@apps.loskutoff.com
dokku config:set shades-dioxus NGINX_ROOT=dist
dokku config:set shades-dioxus NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-dioxus email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-dioxus
```
