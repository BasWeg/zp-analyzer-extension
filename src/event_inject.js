fetch_data();
async function fetch_data() {
    window.postMessage({ from: 'myinject.js', data: {type: 'event_inject', data: window['ZP_VARS']}});
}
