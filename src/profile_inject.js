fetch_data();
async function fetch_data() {
    window.postMessage({ from: 'profile_inject.js', data: {type: 'profile_inject', data: window['ZP_VARS']}});
}
