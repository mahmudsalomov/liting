const configHeader=({headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
    }})
let localStorageToken = localStorage.getItem("token");

const pathname = window.location.pathname; // Returns path only (/path/example.html)

if (pathname !== "/" && (localStorageToken === null || localStorageToken === "")) {
    window.location.replace("/");
}

// if (pathname==="/") {
//
//     let check=false;
//     axios.get("/api/auth/check",configHeader)
//         .then(function (res) {
//             check=res.data;
//             console.log('AXIOS = '+check)
//             if (!check) window.location.replace("/login");
//             else window.location.replace("/admin");
//         })
//     console.log(check)
//     // if (!check) window.location.replace("/login");
//
//     //
//     // Request.check(configHeader)
//     //     .then(function (e) {
//     //     if (!e){
//     //         window.location.replace("/login");
//     //     }
//     //     })
//     //     .catch(e=>{window.location.replace("/login")})
// }


function logOutBtn() {
    console.log("AAAAAAAAAAAAaaaaaaa")
    console.log(window.location.pathname!="/")
    console.log(window.location.pathname!="/login")
    console.log(window.location.pathname!="")
    if (window.location.pathname!="/"&&window.location.pathname!="/login"&&window.location.pathname!=""){
        window.location.replace("/");
        localStorage.removeItem("token");
    }
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

function men() {
    Request.me().then(function (res) {
        if (res==null) logOutBtn()
        document.getElementById("fio").innerText=res;
    })
        .catch(function (error) {
            console.log("SSSSSSsssss : "+error.response.status)
            if (error.response.status===401)
            logOutBtn()
        })
}

men()










