import axios from 'axios';
const authorize = axios.create({
    withCredentials: true,
    credentials: "same-origin"
})

// Add a request interceptor
authorize.interceptors.request.use(config => {
    let token = localStorage.getItem('auth');
    token ? config.headers['Authorization'] = `Bearer ${token}` : abort();
    config.headers['X-Requested-With'] = "XMLHttpRequest";
    config.headers['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    return config;
}, err => Promise.reject(err));

function abort() {
    console.log('401 Unauthorized');
    return '401 Unauthorized';
}
export default authorize;