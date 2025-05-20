import api from './core.server-request.js';
import config from './core.site-config.js';
document.getElementById("loginForm").addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const postPayload = {
        type: "login-submit",
        data: {
            email: email,
            password: password,
        }
    }
    api.postWithoutCreds(config.apiUrl,postPayload,"login-submit").then((response) => {console.log(response)},(error) => {console.log(error)});
})