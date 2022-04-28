
let one = {}
let partnerList = []

function addPartner(event) {
    event.preventDefault();
    let ph = document.getElementById("photo").files;
    let sg = document.getElementById("signature").files;
    let data = {}
    console.log(ph)
    let partImage;
    let partSignature;
    if (ph.length!==0 && sg.length!==0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                // for (let i = 0; i < ph.length; i+= 1) {
                ph[0].src = "/api/file/photo/"+response[0].hashId;
                console.log(ph)
                partImage=response[0]
                // }
                Request.saveFiles(sg)
                    .then(function (response1){
                        // for (let i = 0; i < sg.length; i+= 1) {
                        sg[0].src = "/api/file/photo/" + response1[0].hashId;
                        console.log(sg)
                        partSignature=response1[0]


                        console.log(ph)
                        console.log(sg)

                        data={
                            name:document.getElementById("name").value,
                            surname:document.getElementById("surname").value,
                            company:document.getElementById("company").value,
                            comment:document.getElementById("comment").value,
                            photo: partImage,
                            signature: partSignature
                        }


                        axios.post("/api/partner/add", data)
                            .then(function (res) {
                                if (data !== "" || data != null) {
                                    data = res;
                                    partner()
                                }else console.log("bumadiyuuu")
                            })
                        // }
                    })





            })
        // document.getElementById("addEmployee").innerHTML=data;
    }
}

function changePhotos(event) {
    console.log(event)
    let sg = document.getElementsByClassName("PartSignature");
    for (let i = 0; i < sg.length; i += 1) {
        sg[i].sg = URL.createObjectURL(event.target.files[0]);
    }
    console.log(event)
    let ph = document.getElementsByClassName("PartPhoto");
    for (let i = 0; i < ph.length; i += 1) {
        ph[i].ph = URL.createObjectURL(event.target.files[0]);
    }
}



function getOne(id){
    axios.get("/api/partner/one/"+id)
        .then(function (response) {
            console.log(response)
            console.log(id)
            one=response.data.object
            let formField = document.getElementById('EditPartnerForm')
            formField['id'].value = one.id;
            formField['name_edit'].value = one.name;
            formField['surname_edit'].value = one.surname;
            formField['company_edit'].value = one.company;
            formField['comment_edit'].value = one.comment;


            document.getElementById('editPhoto').src = '/api/file/photo/' + one.photo.hashId;
            document.getElementById('editSignature').src = '/api/file/photo/' + one.signature.hashId;

            one.name = formField["name_edit"]
            one.surname = formField['surname_edit']
            one.company = formField['company_edit']
            one.comment = formField['comment_edit']
            one.photo = formField['photo_edit']
            one.signature = formField['signature_edit']

        })
        .catch(function (error) {
            console.log(error)
        })
}

function editPartner(event){
    event.preventDefault();
    let ph = document.getElementById('photo_edit').files;
    let sg = document.getElementById('signature_edit').files;
    let data = {}
    console.log(ph)
    let partImage;
    let partSignature;
    if (ph.length!==0 && sg.length!==0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                // for (let i = 0; i < ph.length; i+= 1) {
                ph[0].src = "/api/file/photo/"+response[0].hashId;
                console.log(ph)
                partImage=response[0]
                // }
                Request.saveFiles(sg)
                    .then(function (response1){
                        // for (let i = 0; i < sg.length; i+= 1) {
                        sg[0].src = "/api/file/photo/" + response1[0].hashId;
                        console.log(sg)
                        partSignature=response1[0]


                        console.log(ph)
                        console.log(sg)

                        data={
                            id:document.getElementById('id').value,
                            name:document.getElementById('name_edit').value,
                            surname:document.getElementById('surname_edit').value,
                            company:document.getElementById('company_edit').value,
                            comment:document.getElementById('comment_edit').value,
                            photo: partImage,
                            signature: partSignature
                        }


                        axios.put("/api/partner/edit", data)
                            .then(function (res) {
                                if (data !== "" || data != null) {
                                    data = res;
                                    partner()
                                }else console.log("bumadiyuuu")
                            })
                        // }
                    })
            })
        // document.getElementById("addEmployee").innerHTML=data;
    }else{
        data={
            id:document.getElementById('id').value,
            name:document.getElementById('name_edit').value,
            surname:document.getElementById('surname_edit').value,
            company:document.getElementById('company_edit').value,
            comment:document.getElementById('comment_edit').value,
            photo: one.photo.hashId,
            signature: one.signature.hashId
        }


        axios.put("/api/partner/edit", data)
            .then(function (res) {
                if (data !== "" || data != null) {
                    data = res;
                    partner()
                }else console.log("bumadiyuuu")
            })
    }

}

function partner() {
    axios.get("/api/partner/all")
        .then(function (response){
            let out="";
            console.log(response)
            let data = response.data.object;
            console.log(data)
            data.forEach(d => {
                out += " <tr class=\"odd\">" +
                    "<td>"+d.id+"</td>\n" +
                    "   <td>"+d.name+"</td>\n" +
                    "   <td>"+d.surname+"</td>\n" +
                    "   <td>"+d.company+"</td>\n" +
                    "   <td>"+d.comment+"</td>\n" +
                    "   <td><img height='60' width='60' src='/api/file/photo/"+d.photo.hashId+"'></td>\n" +
                    "   <td><img height='60' width='60' src='/api/file/photo/"+d.signature.hashId+"'></td>\n" +
                    "   <td><button onclick='deletePartner("+ d.id+")' class='btn btn-danger mt-1'>DELETE </button>" +
                    "   <button class='btn btn-success' data-target='#exampleModalCenterEdit' data-toggle='modal' onclick='getOne("+ d.id+")'>EDIT</button></td>\n" +
                    "</tr>";
            })
            if (out !== ""){
                document.getElementById("partner_list").innerHTML=out;
            }
        })
        .catch(function (error){
            console.log(error)
        })
}


function deletePartner(id) {
    axios.post("/api/partner/delete/" + id)
        .then(function (response) {
            partner()
            console.log(response.data)
        })
    console.log("dsfdsfdsbfkjdhsfgdsf")
}


// const modalKontend = document.querySelector(".modal-content")
// const  formGroup = document.querySelector(".form-group button")
// formGroup.addEventListener("click", function () {
// modalKontend.remove()
// })

