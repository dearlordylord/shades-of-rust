build from a chapter dir (any chapter); needs getrand lib feature js turned on;

will build somewhere into ./book

`cargo build --release --target wasm32-unknown-unknown`
`wasm-bindgen ../target/wasm32-unknown-unknown/release/chapter-75-darkplaza.wasm --out-dir ../book/book/wasm/chapter-75-darkplaza --no-modules`

index.html is like

```html
<html>
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
</head>
<body>
<canvas id="canvas" width="640" height="480"></canvas>
<script src="./chapter-75-darkplaza.js"></script>
<script>
  window.addEventListener("load", async () => {
    await wasm_bindgen("./chapter-75-darkplaza_bg.wasm");
  });
</script>
</body>
</html>

```

serve with `python3 -m http.server` to avoid cors errors