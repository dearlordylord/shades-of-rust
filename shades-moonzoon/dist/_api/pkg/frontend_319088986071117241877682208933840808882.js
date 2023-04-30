let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const CLOSURE_DTORS = new FinalizationRegistry(state => {
    wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state)
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addToExternrefTable0(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
function __wbg_adapter_20(arg0, arg1, arg2) {
    const ptr0 = passArrayJsValueToWasm0(arg2, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.wasm_bindgen__convert__closures__invoke1_mut__hc9f02f1461cce5f1(arg0, arg1, ptr0, len0);
}

function __wbg_adapter_23(arg0, arg1, arg2) {
    wasm.closure13_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_26(arg0, arg1, arg2) {
    wasm.closure29_externref_shim(arg0, arg1, arg2);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

const ReconnectingEventSourceOptionsFinalization = new FinalizationRegistry(ptr => wasm.__wbg_reconnectingeventsourceoptions_free(ptr));
/**
*/
export class ReconnectingEventSourceOptions {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        ReconnectingEventSourceOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reconnectingeventsourceoptions_free(ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_removeChild_794db72cbb6f21d3 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.removeChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_insertBefore_77a7d032a91abf86 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.insertBefore(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_addEventListener_cf5b03cd29763277 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_new_f9876326328f45ed = function() {
        const ret = new Object();
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbg_new_7f8be1a6fcf39c7a = function(arg0) {
        const ret = new ResizeObserver(arg0);
        return ret;
    };
    imports.wbg.__wbg_observe_49f09629206edaf8 = function(arg0, arg1) {
        arg0.observe(arg1);
    };
    imports.wbg.__wbg_disconnect_19b192ce90fd1185 = function(arg0) {
        arg0.disconnect();
    };
    imports.wbg.__wbg_removeEventListener_b25f5db74f767386 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
    }, arguments) };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbg_style_73691920fd3524f3 = function(arg0) {
        const ret = arg0.style;
        return ret;
    };
    imports.wbg.__wbg_style_2141664e428fef46 = function(arg0) {
        const ret = arg0.style;
        return ret;
    };
    imports.wbg.__wbg_classList_c4ebb3813d3a2f5d = function(arg0) {
        const ret = arg0.classList;
        return ret;
    };
    imports.wbg.__wbg_key_f0decac219aa904b = function(arg0, arg1) {
        const ret = arg1.key;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_getElementById_eb93a47327bb5585 = function(arg0, arg1, arg2) {
        const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_instanceof_HtmlDivElement_a81e9568c016e3a6 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLDivElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_createComment_2b861fdef485248f = function(arg0, arg1, arg2) {
        const ret = arg0.createComment(getStringFromWasm0(arg1, arg2));
        return ret;
    };
    imports.wbg.__wbg_add_73f794d491a0e44f = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.add(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_remove_f021903057d23f5e = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.remove(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_self_e7c1f827057f6584 = function() { return handleError(function () {
        const ret = self.self;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_window_a09ec664e14b1b81 = function() { return handleError(function () {
        const ret = window.window;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_global_c85a9259e621f3db = function() { return handleError(function () {
        const ret = global.global;
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_call_95d1ea488d03e4e8 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_6aa458a4ebdb65cb = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw arg0;
    };
    imports.wbg.__wbg_then_ec5db6d509eb475f = function(arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    };
    imports.wbg.__wbg_resolve_fd40f858d9db1a04 = function(arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_e266f02eee43b570 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_getPropertyValue_05e910529ab6e32a = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_removeProperty_d94b45fd3a758db4 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_setProperty_141523e2ee28f516 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
    }, arguments) };
    imports.wbg.__wbg_createElement_e2a0e21263eb5416 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlElement_9e442d53bb553421 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_appendChild_b8199dc1655c852d = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.appendChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_SvgElement_946bf9a71aa83b37 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof SVGElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_document_950215a728589a2d = function(arg0) {
        const ret = arg0.document;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_error_4b04b5dcdf250852 = function(arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_has_3feea89d34bd7ad5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_borderBoxSize_f8cff15f891358b0 = function(arg0) {
        const ret = arg0.borderBoxSize;
        return ret;
    };
    imports.wbg.__wbg_instanceof_ResizeObserverSize_fb7849815e6c594a = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ResizeObserverSize;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_contentRect_60d1a13655caba7a = function(arg0) {
        const ret = arg0.contentRect;
        return ret;
    };
    imports.wbg.__wbg_width_6762f1c0e103466e = function(arg0) {
        const ret = arg0.width;
        return ret;
    };
    imports.wbg.__wbg_height_7228c2f4dd8e75bd = function(arg0) {
        const ret = arg0.height;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Array_d40d5b5bf4a0cc0d = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Array;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_get_27fe3dac1c4d0224 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_inlineSize_0da871da68038169 = function(arg0) {
        const ret = arg0.inlineSize;
        return ret;
    };
    imports.wbg.__wbg_blockSize_4836734f1898e9a0 = function(arg0) {
        const ret = arg0.blockSize;
        return ret;
    };
    imports.wbg.__wbg_head_a7ca4abdb52f6a3f = function(arg0) {
        const ret = arg0.head;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_sheet_7840cf74c51ee7bd = function(arg0) {
        const ret = arg0.sheet;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_insertRule_3f23d77db11d4819 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.insertRule(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cssRules_d2d7f924cdcf6c4c = function() { return handleError(function (arg0) {
        const ret = arg0.cssRules;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_item_cd42d84b8a35d126 = function(arg0, arg1) {
        const ret = arg0.item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_style_71d307158ce61414 = function(arg0) {
        const ret = arg0.style;
        return ret;
    };
    imports.wbg.__wbg_setAttribute_79c9562d32d05e66 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_deleteRule_5e0c2f416134c10e = function() { return handleError(function (arg0, arg1) {
        arg0.deleteRule(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_createTextNode_866e33a51b47f04c = function(arg0, arg1, arg2) {
        const ret = arg0.createTextNode(getStringFromWasm0(arg1, arg2));
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper135 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 30, __wbg_adapter_20);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper274 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 14, __wbg_adapter_23);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1043 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 30, __wbg_adapter_26);
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;

    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('frontend_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
