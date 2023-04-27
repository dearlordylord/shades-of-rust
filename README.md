License: GPL (infected by slint)

supplementary for monadical.com/posts/shades-of-rust-gui-library-list.html

dokku deploy

```
cd shades-perseus
touch .static
git add .static
git commit -m "Add .static"
cd ..
git remote add dokku-perseus dokku@apps.loskutoff.com:shades-perseus
git subtree push --prefix shades-perseus dokku-perseus master
ssh root@apps.loskutoff.com
dokku config:set shades-perseus NGINX_ROOT=dist NGINX_DEFAULT_REQUEST=index.html
dokku letsencrypt:set shades-perseus email igor.loskutoff@gmail.com
dokku letsencrypt:enable shades-perseus
```

deploy specifics:

- perseus - only root path is served; it's hardcoded in their router code
- makepad - requires special headers to be set for sound to work; some statics are hardcoded into build; more importantly, the whole player crashes if it can't load a .ttf
