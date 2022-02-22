
let employeeList = []
function addEmployee(event) {
    event.preventDefault();
    let ph = document.getElementById("photo").files;
    let data = {}
    // data=new FormData(event);
    // console.log(data)
    // console.log(data.get("full_name"))
    // console.log(data.ge("position"))
    // console.log(data.get("photo"))
    // document.getElementById("addEmployee").innerHTML=data;
    console.log(ph)

    let empImage;

    if (ph.length>0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                let src=document.getElementsByClassName("EmpPhoto")
                for (let i = 0; i < src.length; i+= 1) {
                    src[i].src = "/api/file/photo"+response[0].hashId;
                }
                empImage=response[0];

                data={
                    full_name:document.getElementById("full_name").value,
                    position:document.getElementById("position").value,
                    photo: empImage
                }

                axios.post("/api/employee/add", data)
                if (data !== "" || data != null) {
                    data = response;
                    employee()
                }else console.log("bumadiyuuu")
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
                        "   <button class='btn btn-success' onclick='editEmployee("+ d+")'>EDIT</button></td>\n" +
                        "</tr>";
                })
            if (out !== ""){
                document.getElementById("employee_list").innerHTML=out;
            }
        })
        .catch(function (error){

        })
}


remove().onclick = function () {
    const full_name = document.getElementById('full_name');
    const position = document.getElementById('position');
    const photo = document.getElementById('photo');
    const button = document.getElementById('remove');

    full_name.value = '';
    position.value = '';
    photo.value = '';
    employee()
}
//
// function Delete(){
//     id = event.id
//     axios.delete("/api/admin/employee"+ id)
//         .then(function (response) {
//
//         })
// }

function deleteEmployee(id) {
    axios.post("/api/employee/delete/" + id)
      .then(function (response){
          employee()
          console.log(response.data)
      })
    // console.log("dsfdsfdsbfkjdhsfgdsf")
}

function editEmployee(id) {
    employee()
    document.getElementById('addOrEditEmployeeH3').innerText = 'Employee tahrirlash'
    document.getElementById('addOrEditEmployeeBtn').innerText = 'Tahrirlash'
    // console.log(usersList)
    console.log(employeeList)
    console.log(id)
    let editEmployee = employeeList.find(employee => employee.id === id)
    let formField = document.getElementById('addOrEditEmployeeForm')

    formField['id'].value = editEmployee.id;
    formField['full_name'].value = editEmployee.full_name;
    formField['position'].value = editEmployee.position;
    formField['photo'].value = editEmployee.photo;

}


// const modalKontend = document.querySelector(".modal-content")
// const  formGroup = document.querySelector(".form-group button")
// formGroup.addEventListener("click", function () {
// modalKontend.remove()
// })

