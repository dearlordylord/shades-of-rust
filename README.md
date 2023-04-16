dokku deploy

```
cd shades-leptos
touch .static
cd ..
git subtree push --prefix shades-leptos dokku-leptos master
ssh root@apps.loskutoff.com
dokku config:set shades-leptos NGINX_ROOT=dist
dokku config:set shades-leptos NGINX_DEFAULT_REQUEST=index.html
```
