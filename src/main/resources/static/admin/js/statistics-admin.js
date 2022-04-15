// let usersList = []
let statisticsList = []

let statisticsListSorted=[]

let types=[]

function getAllStatistics() {
    Request.getAllStatistics()
        .then(function (response) {
            // console.log("response")
            // console.log(response)
            statisticsList=response;
            document.getElementById('parent').innerHTML=addOptionParent(statisticsList);
            document.getElementById("userTable").innerHTML = createViewStatisticsTable(statisticsList);
        })
        .catch(function (error) {
            console.log(error)
        })
}

document.getElementById('addUserBtn').addEventListener('click',addUserBtn)

function addStatisticsBtn() {
    document.getElementById('addOrEditUserH3').innerText = 'Kategoriyani tahrirlash'
    document.getElementById('addOrEditUserBtn').innerText = 'Tahrirlash'
}


function addOrEditStatistics(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {}
    formData.forEach((value, key) => (data[key] = value));

    formData.forEach((value, key) => {
        key=="parentId"?value?(data["parent"] = {id:value}):"":""
    });

    Request.addOrEditStatistics(data)
        .then(function (response) {
            getAllStatistics();
            resetAndCloseForm();
        })
        .catch(function (error) {
            // console.log(error);
            // console.log(error.data);
            resetAndCloseForm();
            alert(error.data.message)
        });
}



function editStatistics(id) {
    // getAllCategories()
    document.getElementById('parent').innerHTML=addOptionParent(statisticsList);
    document.getElementById('addOrEditUserH3').innerText = 'Kategoriyani tahrirlash'
    document.getElementById('addOrEditUserBtn').innerText = 'Tahrirlash'
    // console.log(usersList)
    console.log(statisticsList)
    console.log(id)
    let editUser = statisticsList.find(user => user.id == id)
    let formField = document.getElementById('addOrEditUserForm')

    formField['id'].value = editUser.id;
    formField['name_oz'].value = editUser.name_oz;
    formField['name_uz'].value = editUser.name_uz;
    formField['name_ru'].value = editUser.name_ru;
    formField['name_en'].value = editUser.name_en;
    // console.log("QOYILDI")
    // document.getElementById("category_type").value=editUser.type
    // console.log(editUser)
    // typer(editUser.type)

}


function typer(select) {

        // let out="<option value=\"\">Turini tanlang</option>"
        let out=""
    if (!select) out+="<option value=\"\">Turini tanlang</option>"
        types.forEach(t=>{
            console.log(select+" "+t)
            if (select==t) {
                console.log("KIRDI")
                out+="<option selected id='"+t+"_TYPE' value=\""+t+"\">"+t+"</option>"
            }else {
                out+="<option id='"+t+"_TYPE' value=\""+t+"\">"+t+"</option>"
            }
        })
        document.getElementById("category_type").innerHTML=out;

}

function deleteStatistics(id) {
    Request.deleteStatistics(id)
        .then(function (res) {
            alert(res.message)
            getAllStatistics();
        })
        .catch(function (error) {
            alert(error)
        })
}


function createViewStatisticsTable(categories) {
    let out = "";
    categories.map(category => {
        out += "<tr class=\"user_table_row\">\n" +
            "                                    <td class=\"sorting_1\">" + category.id + "</td>\n" +
            "                                    <td>" + category.name_oz + "</td>\n" +
            "                                    <td>" + category.name_uz + "</td>\n" +
            "                                    <td>" + category.name_ru + "</td>\n" +
            "                                    <td>" + category.name_ru + "</td>\n" +
            "                                    <td>" + check(category) + "</td>\n" +
            // "                                    <td>" + check(category.parent) + "</td>\n" +
            // "                                    <td>" + "Parent name" + "</td>\n" +
            "                                    <td><button data-target=\"#exampleModalCenter\" data-toggle=\"modal\" class='btn btn-success mt-1' id='btn-edit-user' value='" + category.id + "' onclick='editStatistics(this.value)'>Tahrirlash</button>\n" +
            "                                    <button class='btn btn-danger ml-2 mt-1' id='btn-edit-user' value='" + category.id + "' onclick='deleteStatistics(this.value)'>O'chirish</button></td>\n" +
            "                                </tr>"
    })
    return out;
}


















// function getAllUsers() {
//     axios.get("/api/admin/user/all")
//         .then(function (response) {
//             if (response.data.message === "OK") {
//                 usersList = response.data.object
//             }
//             document.getElementById("userTable").innerHTML = createViewTable(response.data.object)
//         })
//         .catch(function (error) {
//             console.log(error)
//         })
// }

function getAllRoles() {
    axios.get("/api/admin/role/all")
        .then(function (response) {
            console.log(response.data)
            document.getElementById("inputGroupSelect03").innerHTML = addOptionRoles(response.data)

        })
        .catch(function (error) {
            console.log(error)
        })
}

document.getElementById('addUserBtn').addEventListener('click',addUserBtn)

function addUserBtn() {
    document.getElementById('addOrEditUserH3').innerText = "Kategoriya qo'shish"
    document.getElementById('addOrEditUserBtn').innerText = "Qo'shish"
}
function resetAndCloseForm() {
    document.getElementById('closeFormBtn').click();
    document.getElementById('addOrEditUserForm').reset();
}

// function addOrEditUser(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//
//     const data = {}
//     formData.forEach((value, key) => (data[key] = value));
//
//     let config = {
//         method: '',
//         url: '',
//         data
//     };
//
//     if (data.id === "" || data.id == null) {
//
//         config.method = 'post';
//         config.url = '/api/admin/user/add'
//     } else {
//
//         config.method = 'put';
//         config.url = '/api/admin/user/edit'
//     }
//
//     axios(config)
//         .then(function () {
//             getAllUsers();
//             resetAndCloseForm();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
//
// function editUser(id) {
//     document.getElementById('addOrEditUserH3').innerText = 'Kategoriyani tahrirlash'
//     document.getElementById('addOrEditUserBtn').innerText = 'Tahrirlash'
//     let editUser = usersList.find(user => user.id == id)
//     let formField = document.getElementById('addOrEditUserForm')
//
//     formField['id'].value = editUser.id;
//     formField['username'].value = editUser.username;
//     formField['email'].value = editUser.email;
//     formField['password'].value = editUser.password;
//     formField['phone'].value = editUser.phone;
//     formField['fio'].value = editUser.fio;
//     formField['roleId'].value = editUser.roleId;
//
// }
//
// function deleteUser(id) {
//     axios.delete("/api/admin/user/delete/" + id)
//         .then(function (response) {
//             // console.log(response.data)
//             getAllUsers()
//         })
//         .catch(function (error) {
//             console.log(error.response.data)
//             alert(error.response.data.message)
//         })
// }

// function createViewTable(users) {
//     let out = "";
//     users.map(user => {
//         out += "<tr class=\"user_table_row\">\n" +
//             "                                    <td class=\"sorting_1\">" + user.id + "</td>\n" +
//             "                                    <td>" + user.fio + "</td>\n" +
//             "                                    <td>" + user.username + "</td>\n" +
//             "                                    <td>" + user.roleName + "</td>\n" +
//             "                                    <td>" + user.phone + "</td>\n" +
//             "                                    <td>" + user.email + "</td>\n" +
//             "                                    <td><button data-target=\"#exampleModalCenter\" data-toggle=\"modal\" class='btn btn-success mt-1' id='btn-edit-user' value='" + user.id + "' onclick='editUser(this.value)'>Редактировать</button>\n" +
//             "                                    <button class='btn btn-danger ml-2 mt-1' id='btn-edit-user' value='" + user.id + "' onclick='deleteUser(this.value)'>Удалить</button></td>\n" +
//             "                                </tr>"
//     })
//     return out;
// }

function addOptionRoles(roles) {
    let out = "<option value=''>Выбрать роль</option>";
    roles.map(role => {
        out += "<option value='"+role.id+"'>"+role.roleName+"</option>"
    })
    return out;
}
