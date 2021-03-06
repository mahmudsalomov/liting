const configHeader=({headers:{
        'Authorization':"Bearer "+localStorage.getItem("token")
    }})
let localStorageToken = localStorage.getItem("token");

const pathname = window.location.pathname; // Returns path only (/path/example.html)

if (pathname.startsWith("/admin")) {

    let check=false;
    axios.get("/api/auth/check",configHeader)
        .then(function (res) {
            check=res.data;
            console.log('AXIOS = '+check)
            if (!check) window.location.replace("/login");
        })
    console.log(check)
    // if (!check) window.location.replace("/login");

    //
    // Request.check(configHeader)
    //     .then(function (e) {
    //     if (!e){
    //         window.location.replace("/login");
    //     }
    //     })
    //     .catch(e=>{window.location.replace("/login")})
}


function logOutBtn() {
    window.location.replace("/login");
    localStorage.removeItem("token");
}


function loginForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {}
    formData.forEach((value, key) => (data[key] = value));

    let config = {
        method: 'post',
        url: '/api/auth/login',
        data
    };

    let token = "";
    let tokenType = "";

    axios(config)
        .then(function (response) {
            console.log("response")
            console.log(response)
            if (response.status === 200) {
                tokenType = response.data.type;
                token = response.data.token;
                localStorage.setItem("token",token);

                let localStorageToken = localStorage.getItem("token");

                axios.get("/admin",
                    configHeader
                )
                    .then(function () {
                        window.location.href = "/admin";
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });
            }
        })
        .catch(function (error) {
            console.log(error.response);
        });
}











