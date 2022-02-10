

// let temp=

function partnerComment() {
    axios.get("/api/partner/all")
        .then(function (response) {
            let out="";
            let data = response.data.object;
            console.log(data)
            data.forEach(d=>{
                out+="  <div class=\"row align-items-center\" id=\"swiper-root\">\n"+
                    "<div class=\"col-lg-6\">\n" +
                    "                            <div class=\"client-img-slider swiper-container wow fadeInRight\" data-wow-delay=\"0.3s\" data-wow-duration=\"1s\">\n" +
                    "                                <div class=\"swiper-wrapper\">\n" +
                    "                                    <div class=\"swiper-slide\">\n" +
                    "                                        <div class=\"image\">\n" +
                    "                                            <img src='/api/file/photo/"+d.photo.hashId+"' alt=\"Client\">\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"swiper-slide\">\n" +
                    "                                        <div class=\"image\">\n" +
                    "                                           <img src='/api/file/photo/"+d.photo.hashId+"' alt=\"Client\">\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <div class=\"col-lg-6\">\n" +
                    "                            <div class=\"client-slider swiper-container wow fadeInLeft\" data-wow-delay=\"0.3s\" data-wow-duration=\"1s\">\n" +
                    "                                <div class=\"swiper-wrapper\" id=\"swiper-root\">\n" +
                    "                                    <div class=\"item swiper-slide\">\n" +
                    "                                        <div class=\"content\">\n" +
                    "                                            <div class=\"author d-flex justify-content-between align-items-center\">\n" +
                    "                                                <div class=\"name\">\n" +
                    "                                                    <h5>"+d.name+" "+d.surname+"</h5>\n" +
                    "                                                    <p class=\"designation\">"+d.company+"</p>\n" +
                    "                                                </div>\n" +
                    "                                                <ul class=\"rating d-flex\">\n" +
                    "                                                    <li style=\"list-style: none\"><i class=\"fas fa-star\"></i></li>\n" +
                    "                                                    <li style=\"list-style: none\"><i class=\"fas fa-star\"></i></li>\n" +
                    "                                                    <li style=\"list-style: none\"><i class=\"fas fa-star\"></i></li>\n" +
                    "                                                    <li style=\"list-style: none\"><i class=\"fas fa-star\"></i></li>\n" +
                    "                                                    <li style=\"list-style: none\"><i class=\"fas fa-star\"></i></li>\n" +
                    "                                                </ul>\n" +
                    "                                            </div>\n" +
                    "                                            <p>"+d.comment+"</p>\n" +
                    "                                            <img src=\"../static/assets/images/signature.png\"\n" +
                    "                                                 th:src=\"@{assets/images/signature.png}\"\n" +
                    "                                                 alt=\"Signature\">\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>" +
                    "<script src=\"../static/assets/plugins/wow.min.js\" th:src=\"@{assets/plugins/wow.min.js}\"></script>";
            })
            if (out !== ""){
                document.getElementById("swiper-root").innerHTML=out;
            }
        })
        .catch(function (error) {

        })
}
function employee() {
    axios.get("/api/employee/all")
        .then(function (response){
            let out="";
            let data = response.data.object;
                console.log(data)
            data.forEach(d => {
                    out += " <div class=\"col-lg-3 col-sm-6\">\n" +
                        "                <div class=\"team-block p-relative mb-md-40 wow fadeInUp\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\">\n" +
                        "                    <div class=\"inner-box bx-wrapper\">\n" +
                        "                        <div class=\"image animate-img\">\n" +
                        "                            <img src='/api/file/photo/" + d.photo.hashId + "' alt=\"img\" class=\"full-width\">\n" +
                        "                            <div class=\"overlay-box\">\n" +
                        "                                <div class=\"overlay-inner p-relative full-height\">\n" +
                        "                                    <ul class=\"team-social-box custom\">\n" +
                        "                                        <li class=\"youtube\"><a href=\"#\" class=\"fab fa-youtube fs-16\" tabindex=\"0\"></a><span class=\"social-name fs-12 text-custom-white\">youtube</span></li>\n" +
                        "                                        <li class=\"linkedin\"><a href=\"#\" class=\"fab fa-linkedin fs-16\" tabindex=\"0\"></a><span class=\"social-name fs-12 text-custom-white\">linkedin</span></li>\n" +
                        "                                        <li class=\"facebook\"><a href=\"#\" class=\"fab fa-facebook-f fs-16\" tabindex=\"0\"></a><span class=\"social-name fs-12 text-custom-white\">facebook</span></li>\n" +
                        "                                        <li class=\"twitter\"><a href=\"#\" class=\"fab fa-twitter fs-16\" tabindex=\"0\"></a><span class=\"social-name fs-12 text-custom-white\">twitter</span></li>\n" +
                        "                                    </ul>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"lower-content p-relative text-center\">\n" +
                        "                            <div class=\"icon-box fs-18 text-custom-white\">\n" +
                        "                                <span class=\"fas fa-cogs\"></span>\n" +
                        "                            </div>\n" +
                        "                            <h4><a href=\"#\" class=\"fw-600 fs-20\" tabindex=\"0\">" + d.full_name + "</a></h4>\n" +
                        "                            <p class=\"designation text-custom-white mb-xl-20\">" + d.position + "</p>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>"
                })
            if (out !== ""){
                document.getElementById("row").innerHTML=out;
            }
        })
        .catch(function (error){

        })

}

partnerComment()
employee()

