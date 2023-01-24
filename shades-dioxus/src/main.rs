#![allow(non_snake_case)]

use std::thread;
use std::time::Duration;
use gloo_timers::future::TimeoutFuture;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// import the prelude to get access to the `rsx!` macro and the `Scope` and `Element` types
use dioxus::prelude::*;

fn main() {
    // launch the web app
    dioxus_web::launch(App);
}

fn echo_to_angle(s: &str) -> u32 {
    let mut angle = 0;
    for c in s.chars() {
        angle += c as u32 % 360;
    }
    angle
}

fn App(cx: Scope) -> Element {
    let echo = use_state(&cx, || "Echo".to_string());
    let angle = use_state(&cx, || echo_to_angle(&echo.get()));
    cx.spawn({
        let mut angle = angle.to_owned();
        async move {
            log("Hello from Rust?");
            TimeoutFuture::new(50).await;
            log("Hello from Rust!");
            angle.with_mut(|a| {
                *a += 1;
                *a = *a % 360;
            });
        }
    });
    cx.render(rsx! {
        div {
            // input {
            //     value: "{echo}",
            //     oninput: move |evt| {
            //         // echo.set(evt.value.clone());
            //         // angle.set(echo_to_angle(&evt.value));
            //     },
            // }
            // div {
            //     "Echo: {echo}"
            // }
            div {
                "Angle: {angle}"
            }
            div {
                transform: "rotateX({angle}deg) rotateY({angle}deg)",
                width: "100px",
                height: "100px",
                transform_style: "preserve-3d",
                position: "relative",
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "red",
                    transform: "translateZ(50px)",
                }
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "blue",
                    transform: "rotateY(180deg) translateZ(50px)",
                }
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "green",
                    transform: "rotateX(90deg) translateZ(50px)",
                }
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "yellow",
                    transform: "rotateX(-90deg) translateZ(50px)",
                }
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "purple",
                    transform: "rotateY(-90deg) translateZ(50px)",
                }
                div {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "orange",
                    transform: "rotateY(90deg) translateZ(50px)",
                }
            }
        }

    })
}