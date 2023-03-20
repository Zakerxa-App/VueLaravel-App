//  Web socket Path
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssPort: 6001,
    disableStats: JSON.parse(process.env.MIX_PUSHER_TLS),
    encrypted: JSON.parse(process.env.MIX_PUSHER_TLS),
    forceTLS: JSON.parse(process.env.MIX_PUSHER_TLS),
    useTLS: JSON.parse(process.env.MIX_PUSHER_TLS),
    debug: true,
    enabledTransports: ['ws', 'wss']
});
console.log(JSON.parse(process.env.MIX_PUSHER_TLS));
export default window.Echo;