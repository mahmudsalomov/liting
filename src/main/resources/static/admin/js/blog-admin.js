let blogList = []

let EDIT_BLOG={};

function createBlogList(id) {


    if (id&&id!='0'){
        Request.getAllBlogByCategory(id)
            .then(function (response) {
                blogList=response;
                document.getElementById("blogList").innerHTML = createViewBlogTable(blogList);
            })
            .catch(function (error) {
                console.log(error)
            })
    }else {
        Request.getAllBlog()
            .then(function (response) {
                blogList=response;
                document.getElementById("blogList").innerHTML = createViewBlogTable(blogList);
            })
            .catch(function (error) {
                console.log(error)
            })
    }


}


function createViewBlogTable(blogs) {



    let out = "";


    blogs.forEach(blog=>{

        let temp=""
        if (blog.mainSlider){
            temp="<input checked onchange='isMainSlider("+blog.id+",event)' type=\"checkbox\" id=\"s\">"
        }else{
            temp="<input onchange='isMainSlider("+blog.id+",event)' type=\"checkbox\" id=\"s\">"
        }

        let h="https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308";
        if (blog.mainImage) h="/api/file/photo/"+blog.mainImage.hashId;

        out+="<div class=\"card shadow mb-4 p-1\">\n" +
            "                        <div class=\"row no-gutters\">\n" +
            "                            <div class=\"col-md-4\">\n" +
            "                                <img src='"+h+"' class=\"card-img\" alt=\"...\">\n" +
            "                            </div>\n" +
            "                            <div class=\"col-md-8\">\n" +
            "                                <div class=\"card-body\">\n" +
            "                                    <h5 class=\"card-title\">"+blog.title_oz+"</h5>\n" +
            "                                    <p class=\"card-text\">" + blog.anons_oz+
            "                                    </p>\n" +
            "\n" +
            "                                    <p class=\"card-text\"><small class=\"text-muted\">Last updated 3 mins ago</small></p>\n" +
            "                                </div>\n" +
            "\n" +
            "\n" +
            "                            </div>\n" +
            "\n" +
            "\n" +
            "                            <div class=\"p-3 col-md-4 d-flex justify-content-start\">\n" +
            "                                Kategoriya:\n" + blog.category.name_oz+
            "                            </div>\n" +
            "                            <div class=\"p-3 col-md-8 d-flex justify-content-end position-relative\">\n" +
            "    <!-- Default switch -->\n" +
            "      <!-- Rounded switch -->\n" +
            "                <p class=\"float-right m-2\">Main slider</p>\n" +
            "                <label class=\"switch float-right\">\n" +
            // "                    <input onchange='isMainSlider("+blog.id+",event)' type=\"checkbox\" id=\"s\">\n" +
            temp+
            "                    <span class=\"slider round\"></span>\n" +
            "                </label>"+
            "                                <a href='/blog/"+blog.id+"' class=\"btn btn-info m-1\">Saytda ko'rish</a>\n" +
            "                                <a href='/admin/blog/edit/"+blog.id+"' class=\"btn btn-success m-1\">Tahrirlash</a>\n" +
            "                                <button onclick='deleteBlog(this.value)' value='"+blog.id+"' class=\"btn btn-danger m-1\">O'chirish</button>\n" +
            "                            </div>\n" +
            "\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>"

    })


    // blogs.map(blog => {
    //     out += "<tr class=\"user_table_row\">\n" +
    //         "                                    <td class=\"sorting_1\">" + category.id + "</td>\n" +
    //         "                                    <td>" + blog.name_oz + "</td>\n" +
    //         "                                    <td>" + blog.name_uz + "</td>\n" +
    //         "                                    <td>" + blog.name_ru + "</td>\n" +
    //         "                                    <td>" + blog.name_ru + "</td>\n" +
    //         // "                                    <td>" + check(category) + "</td>\n" +
    //         // "                                    <td>" + check(category.parent) + "</td>\n" +
    //         // "                                    <td>" + "Parent name" + "</td>\n" +
    //         "                                    <td><button data-target=\"#exampleModalCenter\" data-toggle=\"modal\" class='btn btn-success mt-1' id='btn-edit-user' value='" + blog.id + "' onclick='editCategory(this.value)'>Tahrirlash</button>\n" +
    //         "                                    <button class='btn btn-danger ml-2 mt-1' id='btn-edit-user' value='" + blog.id + "' onclick='deleteCategory(this.value)'>O'chirish</button></td>\n" +
    //         "                                </tr>"
    // })
    return out;
}


function createSelectCategory() {
    console.log("AAAAAAAAAA")
    Request.getAllCategories()
        .then(function (response) {
            let out_oz="<option value=\"\">Kategoriyani tanlang</option>"
            let out_uz="<option value=\"\">Категорияни танланг</option>"
            let out_ru="<option value=\"\">Выбрать категорию</option>"
            let out_en="<option value=\"\">Select a category</option>"
            response.forEach(r=>{
                out_oz+="<option value='"+r.id+"'>"+r.name_oz+"</option>"
                out_uz+="<option value='"+r.id+"'>"+(r.name_uz?r.name_uz:r.name_oz)+"</option>"
                out_ru+="<option value='"+r.id+"'>"+(r.name_ru?r.name_ru:r.name_oz)+"</option>"
                out_en+="<option value='"+r.id+"'>"+(r.name_en?r.name_en:r.name_oz)+"</option>"
            })
            document.getElementById("blog_category_oz").innerHTML=out_oz;
            document.getElementById("blog_category_uz").innerHTML=out_uz;
            document.getElementById("blog_category_ru").innerHTML=out_ru;
            document.getElementById("blog_category_en").innerHTML=out_en;
        })
        .catch(function (error) {
            console.log(error)
        })
}

function changeImage(event) {
    console.log(event)
    // let im=document.getElementById("mainImage_oz").files;
    let src=document.getElementsByClassName("main_image");
    for (let i = 0; i < src.length; i+= 1) {
        src[i].src = URL.createObjectURL(event.target.files[0]);
    }
}

function saveBlog() {


    console.log(document.getElementById("mainImage_oz").files)
    let im=document.getElementById("mainImage_oz").files;
    console.log(document.getElementById("mainImage_oz").value)
    console.log(im)
    document.getElementById("save_button").disabled=true

    let mainImage;

    console.log(document.getElementById("id").value)
    if (im.length>0){
        Request.saveFiles(im)
            .then(function (res) {
                console.log(res)
                let src=document.getElementsByClassName("main_image");
                // document.getElementsByClassName("main_image").src="/api/file/photo/"+res[0].hashId;
                // var elems = document.getElementsByClassName("incorrect-img");
                for (let i = 0; i < src.length; i+= 1) {
                    src[i].src = "/api/file/photo/"+res[0].hashId;
                }
                mainImage=res[0];


                console.log($($("#summernote_oz").summernote("code")).text())
                console.log($("#summernote_oz").summernote("code"))
                // console.log($($("#summernote_oz").summernote("code")).html())

                let data={
                    id:document.getElementById("id").value,
                    title_oz:document.getElementById("title_oz").value,
                    title_uz:document.getElementById("title_uz").value,
                    title_ru:document.getElementById("title_ru").value,
                    title_en:document.getElementById("title_en").value,
                    anons_oz:document.getElementById("anons_oz").value,
                    anons_uz:document.getElementById("anons_uz").value,
                    anons_ru:document.getElementById("anons_ru").value,
                    anons_en:document.getElementById("anons_en").value,

                    text_oz:$("#summernote_oz").summernote("code"),
                    text_uz:$("#summernote_uz").summernote("code"),
                    text_ru:$("#summernote_ru").summernote("code"),
                    text_en:$("#summernote_en").summernote("code"),
                    category:{
                        id:document.getElementById("blog_category_oz").value
                    },
                    type:"BLOG",
                    mainImage:mainImage
                }

                Request.addOrEditBlog(data)
                    .then(function (response) {

                    })
                    .catch(function (error) {

                    })


                document.getElementById("save_button").disabled=false




            })
            .catch(function (error) {
                console.log(error)
            })
    }
    else {
        let data={
            id:document.getElementById("id").value,
            title_oz:document.getElementById("title_oz").value,
            title_uz:document.getElementById("title_uz").value,
            title_ru:document.getElementById("title_ru").value,
            title_en:document.getElementById("title_en").value,
            anons_oz:document.getElementById("anons_oz").value,
            anons_uz:document.getElementById("anons_uz").value,
            anons_ru:document.getElementById("anons_ru").value,
            anons_en:document.getElementById("anons_en").value,
            text_oz:$("#summernote_oz").summernote("code"),
            text_uz:$("#summernote_uz").summernote("code"),
            text_ru:$("#summernote_ru").summernote("code"),
            text_en:$("#summernote_en").summernote("code"),
            category:{
                id:document.getElementById("blog_category_oz").value
            },
        }



        Request.addOrEditBlog(data)
            .then(function (response) {
            })
            .catch(function (error) {
            })

    }

    // console.log($($("#summernote_oz").summernote("code")).html())

    document.getElementById("save_button").disabled=false

    // console.log(data)
}

function setBlog(event) {
    // if (event.type!=)
    // EDIT_BLOG[event.target.name]=event.target.value;

}

function deleteBlog(id) {
    Request.deleteBlog(id)
        .then(function (res) {
            alert(res.message)
            createBlogList();
        })
        .catch(function (error) {
            alert(error);
            createBlogList();
        })
}


//EDIT START
async function getBlogEdit(id) {
    let blog;
    await Request.getOne(id)
        .then(function (res) {
            console.log(res)
            // editedBlog["asdss"]="asd"
            // console.log(editedBlog)
            blog=res;
            // editBuilder(res)
        })
        .catch(function (error) {
            console.log(error)
        })
    editBuilder(blog)
}


function editBuilder(blog) {

    if (blog){
        document.getElementById("id").value=blog.id
        document.getElementById("title_oz").value=blog.title_oz
        document.getElementById("title_uz").value=blog.title_uz
        document.getElementById("title_ru").value=blog.title_ru
        document.getElementById("title_en").value=blog.title_en
        document.getElementById("anons_oz").value=blog.anons_oz
        document.getElementById("anons_uz").value=blog.anons_uz
        document.getElementById("anons_ru").value=blog.anons_ru
        document.getElementById("anons_en").value=blog.anons_en

        // $("#summernote_oz").summernote("code").val(blog.text_oz)
        // $("#summernote_uz").summernote("code").val(blog.text_uz)
        // $("#summernote_ru").summernote("code").val(blog.text_ru)
        // $("#summernote_en").summernote("code").val(blog.text_en)
        $('#summernote_oz').summernote('code', blog.text_oz);
        $('#summernote_uz').summernote('code', blog.text_uz);
        $('#summernote_ru').summernote('code', blog.text_ru);
        $('#summernote_en').summernote('code', blog.text_en);

        let src=document.getElementsByClassName("main_image");
        for (let i = 0; i < src.length; i+= 1) {
            src[i].src = "/api/file/photo/"+blog.mainImage.hashId;
        }

    }

    //     category:{
    //     id:document.getElementById("blog_category_oz").value
    // },
    // mainImage:mainImage
}

function isMainSlider(id,event) {
    console.log("CHCHCHCHCHCHC")
    console.log(event)
    console.log(event.target)
    console.log(event.target.checked)
    console.log(id)
    Request.changeMainSlider(id,event.target.checked)
        .then()
        .catch()
}

function checkHelper(bool,checkbox) {
    console.log("AAAAA")
    console.log(bool)
    console.log(checkbox)
    checkbox.checked=bool;
}
//EDIT END



//FILTER
function createFilterSelect() {
    Request.getAllCategoriesNotParent()
        .then(response=>{
            let result=`<option value="0" selected>All</option>`
            for (let i = 0; i <response.length ; i++) {
                result+=`<option value="${response[i].id}">${response[i].name_oz}</option>`
            }
            document.getElementById('filterByCategory').innerHTML=result;
        })
        .catch(error=>console.log(error))
}

function filterByCategoryOnSelect(value) {
    console.log("value = ")
    console.log(value)
    createBlogList(value)
}

