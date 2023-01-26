// taken from https://github.com/linebender/druid/blob/idiopath/xilem/examples/counter.rs where it's Apache 2.0 licensed

use xilem::{button, v_stack, Adapt, App, AppLauncher, LayoutObserver, Memoize, View};

#[derive(Default)]
struct AppData {
    count: u32,
}

fn count_button(count: u32) -> impl View<u32> {
    button(format!("count: {}", count), |data| *data += 1)
}

fn app_logic(data: &mut AppData) -> impl View<AppData> {
    v_stack((
        format!("count: {}", data.count),
        button("reset", |data: &mut AppData| data.count = 0),
        Memoize::new(data.count, |count| {
            button(format!("count: {}", count), |data: &mut AppData| {
                data.count += 1
            })
        }),
        Adapt::new(
            |data: &mut AppData, thunk| thunk.call(&mut data.count),
            count_button(data.count),
        ),
        LayoutObserver::new(|size| format!("size: {:?}", size)),
    ))
}

pub fn main() {
    let app = App::new(AppData::default(), app_logic);
    AppLauncher::new(app).run();
}