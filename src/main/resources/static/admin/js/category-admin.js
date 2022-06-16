// let usersList = []
let categoryList = []

let categoryListSorted=[]

let types=[]

function getAllCategories() {
    Request.getAllCategories()
        .then(function (response) {
            // console.log("response")
            // console.log(response)
            categoryList=response;
            document.getElementById('parent').innerHTML=addOptionParent(categoryList);
            document.getElementById("userTable").innerHTML = createViewCategoryTable(categoryList);
        })
        .catch(function (error) {
            console.log(error)
        })

    Request.getAllCategoriesSorted()
        .then(function (response) {
            // console.log("response")
            console.log(response)
            categoryListSorted=response;
            // document.getElementById('parent').innerHTML=addOptionParent(categoryList);
            // document.getElementById("userTable").innerHTML = createViewCategoryTable(categoryList);
        })
        .catch(function (error) {
            console.log(error)
        })


    Request.getCategoryTypes()
        .then(function (response) {
            types=response
            typer()
            // let out="<option value=\"\">Turini tanlang</option>"
            // types.forEach(t=>{
            //     out+="<option id='"+t+"_TYPE' value=\""+t+"\">"+t+"</option>"
            // })
            // document.getElementById("category_type").innerHTML=out;
        })
        .catch(function (error) {
            console.log(error)
        })

   createViewCategoryOrderTable(0)


}

document.getElementById('addUserBtn').addEventListener('click',addUserBtn)

function addCategoryBtn() {
    document.getElementById('addOrEditUserH3').innerText = 'Kategoriyani tahrirlash'
    document.getElementById('addOrEditUserBtn').innerText = 'Tahrirlash'
}


function addOrEditCategory(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {}
    formData.forEach((value, key) => (data[key] = value));

    formData.forEach((value, key) => {
        key=="parentId"?value?(data["parent"] = {id:value}):"":""
    });

    Request.addOrEditCategory(data)
        .then(function (response) {
            getAllCategories();
            resetAndCloseForm();
        })
        .catch(function (error) {
            // console.log(error);
            // console.log(error.data);
            resetAndCloseForm();
            alert(error.data.message)
        });
}



function editCategory(id) {
    // getAllCategories()
    document.getElementById('parent').innerHTML=addOptionParent(categoryList);
    document.getElementById('addOrEditUserH3').innerText = 'Kategoriyani tahrirlash'
    document.getElementById('addOrEditUserBtn').innerText = 'Tahrirlash'
    // console.log(usersList)
    console.log(categoryList)
    console.log(id)
    let editUser = categoryList.find(user => user.id == id)
    let formField = document.getElementById('addOrEditUserForm')

    formField['id'].value = editUser.id;
    formField['name_oz'].value = editUser.name_oz;
    formField['name_uz'].value = editUser.name_uz;
    formField['name_ru'].value = editUser.name_ru;
    formField['name_en'].value = editUser.name_en;
    // console.log("QOYILDI")
    // document.getElementById("category_type").value=editUser.type
    // console.log(editUser)
    typer(editUser.type)

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

function deleteCategory(id) {
    Request.deleteCategory(id)
        .then(function (res) {
            alert(res.message)
            getAllCategories();
        })
        .catch(function (error) {
            alert(error)
        })
}

function check(category) {

    for (let i = 0; i <categoryList.length ; i++) {
        for (let j = 0; j <categoryList[i].children.length ; j++) {
            if (categoryList[i].children[j].id==category.id){
                return categoryList[i].name_oz
            }

        }

    }

    return "Yo'q";



    // if (parent==null) return "Yo'q";
    // else return parent.name_oz;
}

function createViewCategoryTable(categories) {
    let out = "";
    categories.map(category => {
        out += "<tr class=\"user_table_row\">\n" +
            "                                    <td class=\"sorting_1\">" + category.id + "</td>\n" +
            "                                    <td>" + category.name_oz + "</td>\n" +
            "                                    <td>" + category.name_uz + "</td>\n" +
            "                                    <td>" + category.name_ru + "</td>\n" +
            "                                    <td>" + category.name_en + "</td>\n" +
            "                                    <td>" + check(category) + "</td>\n" +
            // "                                    <td>" + check(category.parent) + "</td>\n" +
            // "                                    <td>" + "Parent name" + "</td>\n" +
            "                                    <td><button data-target=\"#exampleModalCenter\" data-toggle=\"modal\" class='btn btn-success mt-1' id='btn-edit-user' value='" + category.id + "' onclick='editCategory(this.value)'>Tahrirlash</button>\n" +
            "                                    <button class='btn btn-danger ml-2 mt-1' id='btn-edit-user' value='" + category.id + "' onclick='deleteCategory(this.value)'>O'chirish</button></td>\n" +
            "                                </tr>"
    })
    return out;
}

function createViewCategoryOrderTable(id) {
    let out = "";
        Request.getChildren(id)
            .then(function (response) {
                console.log(response)
                response.map(category => {
                    out+="<tr draggable=\"true\"  ondragstart=\"dragit(event)\"  ondragover=\"dragover(event)\">\n" +
                        "                                    <td class='idd'>" + category.id + "</td>\n" +
                        "                                    <td>" + category.name_oz + "</td>\n" +
                        "                                    <td>" + category.name_uz + "</td>\n" +
                        "                                    <td>" + category.name_ru + "</td>\n" +
                        "                                    <td>" + category.name_en + "</td>\n" +
                        "                                    <td>" + check(category) + "</td>\n" +
                        "                                    <td><button onclick='createViewCategoryOrderTable("+category.id+")' class=\"btn btn-info\">Bolalar</button></td>\n" +
                        "</tr>"
                    document.getElementById("order-table").innerHTML="                                <tr role=\"row\">\n" +
                        "                                    <th class=\"sorting sorting_asc users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-sort=\"ascending\"\n" +
                        "                                        aria-label=\"Name: activate to sort column descending\"\n" +
                        "                                    >ID\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Position: activate to sort column ascending\"\n" +
                        "                                    >Nomi (lotin)\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Office: activate to sort column ascending\"\n" +
                        "                                    >Nomi (krill)\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Age: activate to sort column ascending\"\n" +
                        "                                    >Nomi (ruscha)\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Start date: activate to sort column ascending\"\n" +
                        "                                    >Nomi (inglizcha)\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Salary: activate to sort column ascending\"\n" +
                        "                                    >Otasi\n" +
                        "                                    </th>\n" +
                        "                                    <th class=\"sorting users-table-title\" tabindex=\"0\"\n" +
                        "                                        aria-controls=\"dataTable\" rowspan=\"1\" colspan=\"1\"\n" +
                        "                                        aria-label=\"Salary: activate to sort column ascending\"\n" +
                        "                                    >Bola tablega kirish\n" +
                        "                                    </th>\n" +
                        "\n" +
                        "                                </tr>\n"+out
                })

                Request.getParent(id)
                    .then(function (res) {
                        if (res!=null){
                            console.log("Ishladi")
                            document.getElementById("back_order_button").style.display = "block";
                            document.getElementById("back_order_button").value=res.id;

                        }
                        else {
                            document.getElementById("back_order_button").style.display = "none";
                            document.getElementById("back_order_button").value=0;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                console.log(error)
                alert(error.response.data.message)
            })
    return out;
}

function addOptionParent(categories) {
    console.log("Buuuuuuu")
    // console.log(JSON.parse(JSON.stringify(localStorage.getItem("categoryList"))))
    console.log(categories)
    let out = "<option value=\"\">Ota kategoriya</option>";

    if (categoryList){
        categoryList.map(category => {

            out += "<option value='"+category.id+"'>"+category.name_oz+"</option>"
        })
    }
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


function saqlash(){
    let temp=[];
    for (let i = 0; i < $(".idd").get().length; i++) {
        temp.push({
            orderNumber:i,
            categoryId:$(".idd").get()[i].innerText
        })
    }
    axios.post("/api/category/order", temp)
        .then(function (res) {
            console.log(res)
        })
        .catch(function (err) {
            console.log(err)
        })
}