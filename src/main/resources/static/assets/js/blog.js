sessionStorage.removeItem('page')

function getBlogs() {
    const urlParams = getQueryParams();

    let url="";
    if (urlParams.get('category_id')&&urlParams.get('category_id')!=0){
        url="/api/blog/all/"+urlParams.get('category_id')
    } else {
        url="/api/blog/all"
    }
    let page=0;
    if (urlParams.get('page')) page=urlParams.get('page');

    axios.get(url+"?page="+page)
        .then(function (response) {
            console.log(response)

            axios.get("/api/category/name/"+urlParams.get('category_id'))
                .then(function (res) {
                    console.log(res)
                    document.getElementById("category-name").innerText=res.data
                })

            createViewBlogList(response.data.object)
            blogPaginationBuilder(response.data)
        })
        .catch(function (error) {
            console.log(error)
            createViewBlogList([])
        })

    console.log("ISHLADI")
    // let url="";
    // if (category_id&&category_id!=0){
    //     url="/api/blog/all/"+category_id
    // } else {
    //     url="/api/blog/all"
    // }
    // if (!page) page=0;
    // sessionStorage.setItem("page",page);
    // axios.get(url+"?page="+page)
    //     .then(function (response) {
    //         console.log(response)
    //
    //         axios.get("/api/category/name/"+category_id)
    //             .then(function (res) {
    //                 console.log(res)
    //                 document.getElementById("category-name").innerText=res.data
    //             })
    //
    //         createViewBlogList(response.data.object)
    //         blogPaginationBuilder(response.data)
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //         createViewBlogList([])
    //     })
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
            "                                    <a href='/category?category_id="+d.category.id+"'>"+d.category.name_oz+"</a>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <h2 class=\"post-title\"><a href=\"blog-single.html\" class=\"text-theme\">"+d.title_oz+"</a></h2>\n" +
            "                            <p class=\"text-light-white no-margin\">"+d.anons_oz+"</p>\n" +
            "                        </div>\n" +
            "                        <div class=\"blog-footer-meta bg-custom-white padding-20\">\n" +
            "                            <div class=\"post-author\">\n" +
            "                                <div class=\"author-img\">\n" +
            "                                    <a href=\"#\">\n" +
            "                                        <img src=\"../static/assets/images/homepage-1/admin-1-40x40.jpg\" class=\"rounded-circle\" alt=\"#\">\n" +
            "                                    </a>\n" +
            "                                </div>\n" +
            "                                <span class=\"text-theme fs-14\">By <a href=\"#\" class=\"text-theme fw-500\">Admin</a></span>\n" +
            "                            </div>\n" +
            "                            <div class=\"post-link\">\n" +
            "                                <a href='/blog/"+d.id+"' class=\"link-btn text-custom-blue fw-600 fs-14\">Read More</a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </article>\n"

    })

    if (out!=="")
    document.getElementById("blog-list-root").innerHTML=out;
}


function blogPaginationBuilder(data) {
    let temp=" <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Previous</a></li>\n" +
        "                            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\n" +
        "                            <li class=\"page-item active\"><a class=\"page-link\" href=\"#\">2</a></li>\n" +
        "                            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n" +
        "                            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>"



    let first=0;
    let last=data.totalPages;
    if (data.page<5){
        first=0;
    }
    else {
        first=data.page-1;
    }


    let array=getQueryParams();
    let catId=array.get('category_id')?array.get('category_id'):0;

    let page=array.get('page')?array.get('page'):0;

    // out+="<li class='page-item "+check+"'><a href='/category?category_id="+catId+"&page="+(data.page+1)+"' class=\"page-link\">"+(data.page+1)+"</a></li>"

    let out=""
    if (data.page!=0)
        out="<li class=\"page-item\"><a href='/category?category_id="+catId+"&page="+(data.page-1)+"' class=\"page-link\">Previous</a></li>"
    else
        out="<li class=\"page-item\"><a style=' pointer-events: none;!important;  cursor: default!important;' href='#' class=\"page-link\">Previous</a></li>"



    if (data.totalPages<=5){
        for (let i = first; i <last; i++) {
            let check="";
            if (data.page==i)
                check="active"
            out+="<li class='page-item "+check+"'><a href='/category?category_id="+catId+"&page="+i+"' class=\"page-link\">"+(i+1)+"</a></li>"
        }
        if (data.page!=last-1)
            out+="<li class=\"page-item\"><a href='/category?category_id="+catId+"&page="+(data.page+1)+"' class=\"page-link\">Next</a></li>";
        else
            out+="<li class=\"page-item\"><a style=' pointer-events: none;!important;  cursor: default;!important;' href='#' class=\"page-link\">Next</a></li>"
    }

    document.getElementById("pagination-blog-list").innerHTML=out;


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
            document.getElementById("facebook-share").href="https://www.facebook.com/sharer/sharer.php?u="+window.location.href
            document.getElementById("linkedin-share").href="https://www.linkedin.com/shareArticle?url="+window.location.href+"&title="+data.title_oz+"&summary="+data.anons_oz+"&source="+window.location.href;
        })
        .catch(function (error) {
            console.log(error)
        })

}

function getQueryParams() {

    return  new URLSearchParams(window.location.search);

}

// getBlogs(window.location.pathname.slice(10),sessionStorage.getItem("page"))
getBlogs()


