
let one = {}
let employeeList = []

function addEmployees(event) {
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
                    position:document.getElementById("position").value,
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
            formField['position_edit'].value = one.position;


            document.getElementById('editPhoto').src = '/api/file/photo/' + one.photo.hashId;

            one.full_name = formField['full_name_edit']
            one.full_name = formField['full_name_edit']
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
    // let src=document.getElementById("editPhoto")
    // for (let i = 0; i < src.length; i+= 1) {
    //     src[i].src = "/api/file/photo"+response[0].hashId;
    // }

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
                    position:document.getElementById("position_edit").value,
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
            position:document.getElementById("position_edit").value,
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
                    "   <td>"+d.position+"</td>\n" +
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

