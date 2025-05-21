import coreServerRequest from "./core.server-request.js";
import coreSiteConfig from "./core.site-config.js";
import coreLocalStorageValues from "./core.local-storage-values.js";
import coreToasts from "./core.toasts.js";
document.getElementById("logoutButton").addEventListener('click', function (event) {
    event.preventDefault();
    const email = coreLocalStorageValues.getKey('authenticatedUser');
    if(email){
        let postPayload = {
            type: "logout",
            data: {
                email: email
            },
            result: {
                statusCode: 200,
                data: {
                    message: "User is logged out."
                }
            }
        }
        coreServerRequest.postWithoutCreds(coreSiteConfig.apiUrl,postPayload,"logout").then(
            (response) => {
                if(response.statusCode === 200){
                    coreLocalStorageValues.deleteLocal('isAuthenticated');
                    coreLocalStorageValues.deleteLocal('authenticatedUser');
                    coreToasts.toastWithColor('Logout Successful!','green')
                    setTimeout(()=>{
                        window.location.href = '/login';
                    },2000)
                } else {
                    coreToasts.toastWithColor('Logout Failed!', 'red')
                }
            },
            (error) => {console.log(error)}
        );
    } else {
        coreToasts.toastWithColor('There is no authenticated user!', 'red')
    }

})