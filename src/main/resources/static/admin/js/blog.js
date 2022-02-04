let blogList = []



function createBlogList() {

    Request.getAllBlog()
        .then(function (response) {
            blogList=response;
            document.getElementById("blogList").innerHTML = createViewBlogTable(blogList);
        })
        .catch(function (error) {
            console.log(error)
        })

}


function createViewBlogTable(blogs) {





    let out = "";


    blogs.forEach(blog=>{

        out+="<div class=\"card shadow row mb-4 p-1\">\n" +
            "                        <div class=\"row no-gutters\">\n" +
            "                            <div class=\"col-md-4\">\n" +
            "                                <img src=\"../../static/assets/images/birinchi.jpg\" class=\"card-img\" alt=\"...\">\n" +
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
            "                            <div class=\"p-3 col-md-8 d-flex justify-content-end\">\n" +
            "                                <button class=\"btn btn-info m-1\">Saytda ko'rish</button>\n" +
            "                                <button class=\"btn btn-success m-1\">Tahrirlash</button>\n" +
            "                                <button class=\"btn btn-danger m-1\">O'chirish</button>\n" +
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



function saveBlog() {
    // console.log(document.getElementById("summernote_oz").textContent)
    // console.log(document.getElementById("summernote_oz").code())
    console.log(document.getElementById("summernote_oz").innerHTML)
    // console.log($($("#summernote_oz").summernote("code")).html())
    let data={
        title_oz:document.getElementById("title_oz").value,
        title_uz:document.getElementById("title_uz").value,
        title_ru:document.getElementById("title_ru").value,
        title_en:document.getElementById("title_en").value,
        anons_oz:document.getElementById("anons_oz").value,
        anons_uz:document.getElementById("anons_uz").value,
        anons_ru:document.getElementById("anons_ru").value,
        anons_en:document.getElementById("anons_en").value,

        text_oz:$($("#summernote_oz").summernote("code")).html(),
        text_uz:$($("#summernote_uz").summernote("code")).html(),
        text_ru:$($("#summernote_ru").summernote("code")).html(),
        text_en:$($("#summernote_en").summernote("code")).html(),
        category:{
            id:document.getElementById("blog_category_oz").value
        }
    }

    Request.addOrEditBlog(data)
        .then(function (response) {

        })
        .catch(function (error) {

        })
    console.log(data)
}
