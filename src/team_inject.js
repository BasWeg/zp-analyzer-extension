fetch_data();
async function fetch_data() {
    window.postMessage({ from: 'team_inject.js', data: {type: 'team_inject', data: window['ZP_VARS']}});
}
