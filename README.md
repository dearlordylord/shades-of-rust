License: GPL (infected by slint example, TODO rewrite it)

dokku deploy

```
cd shades-sauron
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-sauron dokku@apps.loskutoff.com:shades-sauron
git subtree push --prefix shades-sauron dokku-sauron master
ssh root@apps.loskutoff.com
dokku config:set shades-sauron NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-sauron email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-sauron
```

deploy specifics:

- perseus - only root path is served; it's hardcoded in their router code
- makepad - requires special headers to be set for sound to work; some statics are hardcoded into build; more importantly, the whole player crashes if it can't load a .ttf