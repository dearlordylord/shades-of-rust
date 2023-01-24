use gloo_timers::future::TimeoutFuture;
use sycamore::futures::spawn_local_scoped;
use sycamore::prelude::*;

#[component]
fn TimerCounter<G: Html>(cx: Scope) -> View<G> {
    let state = create_signal(cx, 0);
    let a = create_signal(cx, 0_f64);
    spawn_local_scoped(cx, async move {
        loop {
            TimeoutFuture::new(1000).await;
            state.set(*state.get() + 1);
        }
    });

    view! { cx,
        div {
            p { "Timer value: " (state.get()) }
        }
        div {
            p { "Input value: " (a.get()) }
        }
        input(type="number", bind:valueAsNumber=a)
    }
}

fn main() {
    sycamore::render(|cx| {
        view! { cx, TimerCounter {} }
    });
}