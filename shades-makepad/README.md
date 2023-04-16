just build; the original example build proccess isn't standard and involces running their custom scripts

They use some deprecated stuff internally that requires us setup some special headers https://stackoverflow.com/questions/72881660/web-worker-blocked-by-self-crossoriginisolated-on-cypress

We won't be getting into it, so no sound for the example


https://github.com/dokku/dokku/blob/master/plugins/nginx-vhosts/templates/nginx.conf.sigil overwritten

```js
static async fetch_and_instantiate_wasm(wasm_url, memory) {
    const result = await fetch(wasm_url);
    return WebAssembly.compile(await result.arrayBuffer())
        .then(
        (module) => this.instantiate_wasm(module, memory, {_post_signal: _ => {}}),
        error => {
            console.error(error)
        }
    )
}
```