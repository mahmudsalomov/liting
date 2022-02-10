let localStorageToken = localStorage.getItem("token");

const pathname = window.location.pathname; // Returns path only (/path/example.html)

if (pathname.startsWith("/admin") && (localStorageToken === null || localStorageToken === "")) {
    window.location.replace("/login");


}
if (pathname.startsWith("/admin")){
    let localStorageToken = localStorage.getItem("token");
    axios.get("/api/auth/me", {
        headers: {
            authorization: localStorageToken
        }
    })
        .then(function (res) {

        })
        .catch(function (error) {
            // window.location.replace("/login");
        });



    // check()
    //     .then(function (res) {
    //         console.log("RRRRRRRRRRES")
    //         console.log(res)
    //         if (!res) {
    //             console.log(res)
    //             window.location.replace("/login");
    //         }
    //     })
    //     .catch(function (error) {
    //         // window.location.replace("/login");
    //     })
}


function logOutBtn() {
    window.location.replace("/login");
    localStorage.removeItem("token");
}

async function check() {
    let check=false;
    let localStorageToken = localStorage.getItem("token");
    axios.get("/api/auth/me", {
        headers: {
            authorization: localStorageToken
        }
    })
        .then(function () {
            console.log("TOGRI")
            check = true;
        })
        .catch(function (error) {
            console.log("XATO")
            console.log(error)
        });
    return check;
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
                localStorage.setItem("token", tokenType + token);

                let localStorageToken = localStorage.getItem("token");

                axios.get("/admin", {
                    headers: {
                        Authorization: localStorageToken
                    }
                })
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













