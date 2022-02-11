

function getBlogs(category_id) {
    let url="";
    if (category_id){
        url="/api/blog/all/"+category_id
    } else {
        url="/api/blog/all"
    }
    axios.get(url)
        .then(function (response) {
            console.log(response)

            axios.get("/api/category/name/"+category_id)
                .then(function (res) {
                    console.log(res)
                    document.getElementById("category-name").innerText=res.data
                })

            createViewBlogList(response.data.object)
        })
        .catch(function (error) {
            console.log(error)
            createViewBlogList([])
        })
}


function createViewBlogList(data) {
    // let temp="                <article class=\"post col-lg-4 col-md-6 mb-xl-20\">\n" +
    //     "                    <div class=\"post-wrapper\">\n" +
    //     "                        <div class=\"blog-img animate-img\">\n" +
    //     "                            <a href=\"blog-single.html\">\n" +
    //     "                                <img src=\"../static/assets/images/blog/news_1.jpg\" class=\"img-fluid full-width\" alt=\"blog\">\n" +
    //     "                            </a>\n" +
    //     "\n" +
    //     "                        </div>\n" +
    //     "                        <div class=\"post-date\">\n" +
    //     "                                <a href=\"blog-single.html\">12 Dec 2022</a>\n" +
    //     "                            </div>\n" +
    //     "                        <div class=\"blog-meta bg-custom-white padding-20\">\n" +
    //     "                            <div class=\"cat-box\">\n" +
    //     "                                <div class=\"cats\">\n" +
    //     "                                    <a href=\"#\">Office</a>\n" +
    //     "                                    <a href=\"#\">Rent</a>\n" +
    //     "                                </div>\n" +
    //     "                            </div>\n" +
    //     "                            <h2 class=\"post-title\"><a href=\"blog-single.html\" class=\"text-theme\">8 Tips to Help You Finding New Home</a></h2>\n" +
    //     "                            <p class=\"text-light-white no-margin\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n" +
    //     "                        </div>\n" +
    //     "                        <div class=\"blog-footer-meta bg-custom-white padding-20\">\n" +
    //     "                            <div class=\"post-author\">\n" +
    //     "                                <div class=\"author-img\">\n" +
    //     "                                    <a href=\"blog-single.html\">\n" +
    //     "                                        <img src=\"../static/assets/images/homepage-1/admin-1-40x40.jpg\" class=\"rounded-circle\" alt=\"#\">\n" +
    //     "                                    </a>\n" +
    //     "                                </div>\n" +
    //     "                                <span class=\"text-theme fs-14\">By <a href=\"blog-single.html\" class=\"text-theme fw-500\">Admin</a></span>\n" +
    //     "                            </div>\n" +
    //     "                            <div class=\"post-link\">\n" +
    //     "                                <a href=\"blog-single.html\" class=\"link-btn text-custom-blue fw-600 fs-14\">Read More</a>\n" +
    //     "                            </div>\n" +
    //     "                        </div>\n" +
    //     "                    </div>\n" +
    //     "                </article>\n";

    let out="";

    data.forEach(d=>{

        out+="          <article class=\"post col-lg-4 col-md-6 mb-xl-20 flex-1\">\n" +
            "                    <div class=\"post-wrapper\">\n" +
            "                        <div class=\"blog-img animate-img\">\n" +
            "                            <a href='/blog/"+d.id+"'>\n" +
            "                                <img src='/api/file/photo/"+d.mainImage.hashId+"' class=\"img-fluid full-width\" alt=\"blog\">\n" +
            "                            </a>\n" +
            "\n" +
            "                        </div>\n" +
            "                        <div class=\"post-date\">\n" +
            "                                <a href='/blog/"+d.id+"'>"+d.createdAt+"</a>\n" +
            "                            </div>\n" +
            "                        <div class=\"blog-meta bg-custom-white padding-20\">\n" +
            "                            <div class=\"cat-box\">\n" +
            "                                <div class=\"cats\">\n" +
            "                                    <a href=\"#\">Office</a>\n" +
            "                                    <a href=\"#\">Rent</a>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <h2 class=\"post-title\"><a href=\"blog-single.html\" class=\"text-theme\">"+d.title_oz+"</a></h2>\n" +
            "                            <p class=\"text-light-white no-margin\">"+d.anons_oz+"</p>\n" +
            "                        </div>\n" +
            "                        <div class=\"blog-footer-meta bg-custom-white padding-20\">\n" +
            "                            <div class=\"post-author\">\n" +
            "                                <div class=\"author-img\">\n" +
            "                                    <a href=\"blog-single.html\">\n" +
            "                                        <img src=\"../static/assets/images/homepage-1/admin-1-40x40.jpg\" class=\"rounded-circle\" alt=\"#\">\n" +
            "                                    </a>\n" +
            "                                </div>\n" +
            "                                <span class=\"text-theme fs-14\">By <a href=\"blog-single.html\" class=\"text-theme fw-500\">Admin</a></span>\n" +
            "                            </div>\n" +
            "                            <div class=\"post-link\">\n" +
            "                                <a href='/blog/"+d.id+"' class=\"link-btn text-custom-blue fw-600 fs-14\">Read More</a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </article>\n"

    })

    // if (out!=="")
    document.getElementById("blog-list-root").innerHTML=out;
}




function getBlog(id) {

    axios.get("/api/blog/one/"+id)
        .then(function (response) {
            console.log(response)
            let data=response.data.object;
            document.getElementById("mainImage").src="/api/file/photo/"+data.mainImage.hashId;
            document.getElementById("title").innerText=data.title_oz;
            document.getElementById("text").innerHTML=data.text_oz;
            document.getElementById("date").innerText=data.createdAt;
        })
        .catch(function (error) {
            console.log(error)
        })

}




