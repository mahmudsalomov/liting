
let one = {}
let employeeList = []

function addEmployee(event) {
    event.preventDefault();
    let ph = document.getElementById("photo").files;
    let data = {}
    console.log(ph)
    let empImage;
    if (ph.length>0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                let src=document.getElementsByClassName("EmpPhoto")
                for (let i = 0; i < src.length; i+= 1) {
                    src[i].src = "/api/file/photo/"+response[0].hashId;
                }
                empImage=response[0];

                data={
                    full_name:document.getElementById("full_name").value,
                    full_name_ru:document.getElementById("full_name_ru").value,
                    position_oz:document.getElementById("position_oz").value,
                    position_uz:document.getElementById("position_uz").value,
                    position_ru:document.getElementById("position_ru").value,
                    position_en:document.getElementById("position_en").value,
                    status:document.getElementById("status").value,
                    text_ru:document.getElementById("text_ru").value,
                    text_oz:document.getElementById("text_oz").value,
                    text_uz:document.getElementById("text_uz").value,
                    text_en:document.getElementById("text_en").value,
                    photo: empImage
                }

                axios.post("/api/employee/add", data)
                    .then(function (res) {
                        if (data !== "" || data != null) {
                            data = res;
                            employee()
                        }else console.log("bumadiyuuu")
                    })

            })

        // document.getElementById("addEmployee").innerHTML=data;
    }
}

function changePhoto(event) {
    console.log(event)
    let src = document.getElementsByClassName("EmpPhoto");
    for (let i = 0; i < src.length; i += 1){
        src[i].src = URL.createObjectURL(event.target.files[0]);
    }
}

function getOne(id){
    axios.get("/api/employee/one/"+id)
        .then(function (response) {
            console.log(response)
            console.log(id)
            one=response.data.object
            let formField = document.getElementById('EditEmployeeForm')
            formField['id'].value = one.id;
            formField['full_name_edit'].value = one.full_name;
            formField['full_name_ru_edit'].value = one.full_name_ru;
            formField['position_oz_edit'].value = one.position_oz;
            formField['position_uz_edit'].value = one.position_uz;
            formField['position_ru_edit'].value = one.position_ru;
            formField['position_en_edit'].value = one.position_en;
            formField['status_edit'].value = one.status;
            formField['text_ru_edit'].value = one.text_ru;
            formField['text_oz_edit'].value = one.text_oz;
            formField['text_uz_edit'].value = one.text_uz;
            formField['text_en_edit'].value = one.text_en;


            document.getElementById('editPhoto').src = '/api/file/photo/' + one.photo.hashId;

            one.full_name = formField['full_name_edit']
            one.full_name = formField['full_name_ru_edit']
            one.full_name = document.getElementsByClassName('EmpPhoto')
        })
        .catch(function (error) {
            console.log(error)
        })
}

function editEmployee(event){
    event.preventDefault()
    // console.log(event)
    // let data = event.target.object
    // console.log(event.target)
    // console.log("iojouijiuojiu")
    // console.log(data)
    // if (data !== "" || data != null) {
    //     axios.put("/api/employee/edit", data)
    //     employee()
    // }else console.log("bumadiyuuu")


    let ph = document.getElementById("photo_edit").files;
    let src=document.getElementById("editPhoto")
    for (let i = 0; i < src.length; i+= 1) {
        src[i].src = "/api/file/photo"+response[0].hashId;
    }

    let data = {}
    console.log(ph)
    let empImage;
    if (ph.length>0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                empImage=response[0];

                data={
                    id:document.getElementById("id").value,
                    full_name:document.getElementById("full_name_edit").value,
                    full_name_ru:document.getElementById("full_name_ru_edit").value,
                    position_oz:document.getElementById("position_edit_oz").value,
                    position_uz:document.getElementById("position_edit_uz").value,
                    position_ru:document.getElementById("position_edit_ru").value,
                    position_en:document.getElementById("position_edit_en").value,
                    status_edit:document.getElementById("status_edit").value,
                    text_ru:document.getElementById("text_ru_edit").value,
                    text_oz:document.getElementById("text_oz_edit").value,
                    text_uz:document.getElementById("text_uz_edit").value,
                    text_en:document.getElementById("text_en_edit").value,
                    photo: empImage
                }

                console.log(data)
                axios.put("/api/employee/edit", data)
                if (data !== "" || data != null) {
                    data = response;
                    employee()
                }else console.log("bumadiyuuu")
            })

        // document.getElementById("addEmployee").innerHTML=data;
    }else {
        // let src=document.getElementsByClassName("EmpPhoto")

        data={
            id:document.getElementById("id").value,
            full_name:document.getElementById("full_name_edit").value,
            full_name_ru:document.getElementById("full_name_ru_edit").value,
            position_oz:document.getElementById("position_oz_edit").value,
            position_uz:document.getElementById("position_uz_edit").value,
            position_ru:document.getElementById("position_ru_edit").value,
            position_en:document.getElementById("position_en_edit").value,
            status_edit:document.getElementById("status_edit").value,
            text_ru:document.getElementById("text_ru_edit").value,
            text_oz:document.getElementById("text_oz_edit").value,
            text_uz:document.getElementById("text_uz_edit").value,
            text_en:document.getElementById("text_en_edit").value,
            photo: empImage
        }

        console.log(data)

        axios.put("/api/employee/edit", data)
            .then(function (response) {
                if (data !== "" || data != null) {
                    data = response;
                    employee()
                }else console.log("bumadiyuuu")
            })


    }

}

function selecting(selectOS) {
    console.log(selectOS.value)
}

function employee() {
    axios.get("/api/employee/all")
        .then(function (response){
            let out="";
            console.log(response)
            let data = response.data.object;
            console.log(data)
            data.forEach(d => {
                out += " <tr class=\"odd\">" +
                    "<td>"+d.id+"</td>\n" +
                    "   <td>"+d.full_name+"</td>\n" +
                    "   <td>"+d.full_name_ru+"</td>\n" +
                    "   <td>"+d.position_oz+"</td>\n" +
                    "   <td>"+d.position_uz+"</td>\n" +
                    "   <td>"+d.position_ru+"</td>\n" +
                    "   <td>"+d.position_en+"</td>\n" +
                    "   <td>"+d.status+"</td>\n" +
                    "   <td>"+d.text_ru+"</td>\n" +
                    "   <td>"+d.text_oz+"</td>\n" +
                    "   <td>"+d.text_uz+"</td>\n" +
                    "   <td>"+d.text_en+"</td>\n" +
                    "   <td><img height='60' width='60' src='/api/file/photo/"+d.photo.hashId+"'></td>\n" +
                    "   <td><button onclick='deleteEmployee("+ d.id+")' class='btn btn-danger mt-1'>DELETE </button>" +
                    "   <button class='btn btn-success' data-target='#exampleModalCenterEdit' data-toggle='modal' onclick='getOne("+ d.id+")'>EDIT</button></td>\n" +
                    "</tr>";
            })
            if (out !== ""){
                document.getElementById("employee_list").innerHTML=out;
            }
        })
        .catch(function (error){
            console.log("rasvo")
        })
}


function deleteEmployee(id) {
    axios.post("/api/employee/delete/" + id)
        .then(function (response){
            employee()
            console.log(response.data)
        })
    // console.log("dsfdsfdsbfkjdhsfgdsf")
}


// const modalKontend = document.querySelector(".modal-content")
// const  formGroup = document.querySelector(".form-group button")
// formGroup.addEventListener("click", function () {
// modalKontend.remove()
// })

