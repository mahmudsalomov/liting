
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
    if (ph.length>0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                let src=document.getElementsByClassName("PartPhoto")
                for (let i = 0; i < src.length; i+= 1) {
                    src[i].src = "/api/file/photo/"+response[0].hashId;
                }
                partImage=response[0];

                data={
                    name:document.getElementById("name").value,
                    surname:document.getElementById("surname").value,
                    company:document.getElementById("company").value,
                    comment:document.getElementById("comment").value,
                    photo: partImage,
                    signature: partImage
                }

                axios.post("/api/partner/add", data)
                    .then(function (res) {
                        if (data !== "" || data != null) {
                            data = res;
                            partner()
                        }else console.log("bumadiyuuu")
                    })

            })

        // document.getElementById("addEmployee").innerHTML=data;
    }if (sg.length>0) {
        Request.saveFiles(sg)
            .then(function (response) {
                console.log(response)
                let src=document.getElementsByClassName("PartSignature")
                for (let i = 0; i < src.length; i+= 1) {
                    src[i].src = "/api/file/photo/"+response[0].hashId;
                }
                partSignature=response[0];

                data={
                    name:document.getElementById("name").value,
                    surname:document.getElementById("surname").value,
                    company:document.getElementById("company").value,
                    comment:document.getElementById("comment").value,
                    photo: partSignature,
                    signature: partSignature
                }

                axios.post("/api/partner/add", data)
                    .then(function (res) {
                        if (data !== "" || data != null) {
                            data = res;
                            partner()
                        }else console.log("bumadiyuuu")
                    })

            })

        // document.getElementById("addEmployee").innerHTML=data;
    }
}

function changePhotos(event) {
    console.log(event)
    let src = document.getElementsByClassName("PartPhoto");
    for (let i = 0; i < src.length; i += 1){
        src[i].src = URL.createObjectURL(event.target.files[0]);
    }

}function changeSignature(event) {
    console.log(event)
    let src = document.getElementsByClassName("PartSignature");
    for (let i = 0; i < src.length; i += 1){
        src[i].src = URL.createObjectURL(event.target.files[0]);
    }
}

function getOne(id){
    axios.get("/api/partner/one/"+id)
        .then(function (response) {
            console.log(response)
            console.log(id)
            one=response.data.objectEditSignatureForm
            let formField = document.getElementById('EditPartnerForm')
            formField['id'].value = one.id;
            formField['name'].value = one.name;
            formField['surname'].value = one.surname;
            formField['company'].value = one.company;
            formField['comment'].value = one.comment;

            document.getElementById('editPhoto').src = '/api/file/photo/' + one.photo.hashId;
            document.getElementById('editSignature').src = '/api/file/signature/' + one.signature.hashId;

            one.name = formField['name']
            one.surname = formField['surname']
            one.company = document.getElementsByClassName('company')
            one.comment = document.getElementById("comment")
            one.photo = document.getElementById("photo")
            one.signature = document.getElementById("signature")
        })
        .catch(function (error) {
            console.log(error)
        })
}

function editPartner(event){
    event.preventDefault()
    let ph = document.getElementById("photo_edit").files;
    let sg = document.getElementById("signature_edit").files;

    let data = {}
    console.log(ph)
    console.log(sg)
    let partnerImage;
    let partnerSignature;
    if (ph.length>0) {
        Request.saveFiles(ph)
            .then(function (response) {
                console.log(response)
                partnerImage=response[0];

                data={
                    id:document.getElementById("id").value,
                    name:document.getElementById("name_edit").value,
                    surname:document.getElementById("surname_edit").value,
                    company:document.getElementById("company_edit").value,
                    comment:document.getElementById("comment_edit").value,
                    photo: partnerImage,
                    signature: partnerSignature
                }

                console.log(data)
                axios.put("/api/partner/edit", data)
                if (data !== "" || data != null) {
                    data = response;
                    partner()
                }else console.log("bumadiyuuu")
            })

        // document.getElementById("addEmployee").innerHTML=data;
    }if (sg.length>0) {
        Request.saveFiles(sg)
            .then(function (response) {
                console.log(response)
                partnerSignature=response[0];

                data={
                    id:document.getElementById("id").value,
                    name:document.getElementById("name_edit").value,
                    surname:document.getElementById("surname_edit").value,
                    company:document.getElementById("company_edit").value,
                    comment:document.getElementById("comment_edit").value,
                    photo: partnerImage,
                    signature: partnerSignature
                }

                console.log(data)
                axios.put("/api/partner/edit", data)
                if (data !== "" || data != null) {
                    data = response;
                    partner()
                }else console.log("bumadiyuuu")
            })

        // document.getElementById("addEmployee").innerHTML=data;
    }else {
        // let src=document.getElementsByClassName("partnerImage")

        data={
            id:document.getElementById("id").value,
            name:document.getElementById("name_edit").value,
            surname:document.getElementById("surname_edit").value,
            company:document.getElementById("company_edit").value,
            comment:document.getElementById("comment_edit").value,
            photo: partnerImage,
            photo: partnerImage
        }

        console.log(data)

        axios.put("/api/partner/edit", data)
            .then(function (response) {
                if (data !== "" || data != null) {
                    data = response;
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
            console.log("rasvo")
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

