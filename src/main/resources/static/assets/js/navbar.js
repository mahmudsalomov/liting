
function all() {
    axios.get("/api/category/all/sort")
        .then(function (response) {



            let categories=response.data.object;

            if (categories.length!=0){
                // console.log(categories)
                // console.log(menuBuilder(categories))
                document.getElementById("navbar-root").innerHTML=menuBuilder(categories);
            }

            //
            // console.log(response)
            // console.log(categories)
        })
        .catch(function (error) {
            console.log(error)
        })
}


function menuBuilder(categories) {
    let result="";
    console.log(categories)
    categories.forEach(c=>{

        let out="";

        let url="#";
        if (c.type=="BLOGS"||c.type=="PAGE") url="/category/"+c.id;



        if (c.children.length>0){



            out="<li class=\"menu-item menu-item-has-children\">" +
                "<a href='"+url+"' class=\"text-theme fs-14\">"+c.name_oz+
                "<span class=\"arrow\"></span>"+"</a>"+menuContentBuilder(c.children);
        }else {
            out="<li class=\"menu-item menu-item-has-children\">" +
                "<a href='"+url+"' class=\"text-theme fs-14\">"+c.name_oz+
                "</a>"+menuContentBuilder(c.children);
        }

        out+="</li>"

        result+=out;
    })
    return result;
}

function menuContentBuilder(value) {

    let result="<ul class=\"custom sub-menu\" style=\"width: 320px\">";

    value.map(v=>{
        let out="";

        let url="#";
        if (v.type=="BLOGS"||v.type=="PAGE") url="/category/"+v.id;

        if (v.children.length>0){
            out+="<li class=\"menu-item menu-item-has-children\">\n" +
                "        <a href='"+url+"' class=\"text-theme\">"+v.name_oz+"" +
                "<span class=\"arrow\"></span>"+
                "</a>\n"+menuContentBuilder(v.children)
        }else {
            out+="<li class=\"menu-item\">\n" +
                "        <a href='"+url+"' class=\"text-theme\">"+v.name_oz+"</a>\n";
        }
        out+="</li>";
        result+=out;
    })
    result+="</ul>";

    return result;


}


function mainSlider() {
    axios.get("/api/blog/all/main_slider")
        .then(function (response) {
            console.log(response)
            let data=response.data.object

            let out=""
            data.forEach(d=>{

                out+="<div class=\"swiper-slide slide-item\">\n" +
                    "                <img src='/api/file/photo/"+d.mainImage.hashId+"' class=\"image-fit\" alt=\"img\">\n" +
                    "                <div class=\"transform-center\">\n" +
                    "                    <div class=\"container\">\n" +
                    "                        <div class=\"row\">\n" +
                    "                            <div class=\"col-lg-7\">\n" +
                    "                                <div class=\"content-wrapper\">\n" +
                    // "                                    <h1 class=\"text-custom-white\" style=\"font-size: 80px\">Проектирование <span class=\"text-custom-blue\">обьектов в</span> области нефти и газа</h1>\n" +
                    "                                    <h1 class=\"text-custom-white\" style=\"font-size: 80px\">"+d.title_oz+"</h1>\n" +
                    "                                    <p class=\"text-custom-white mb-xl-40\">"+d.anons_oz+"</p>\n" +
                    "                                    <a href='/blog/"+d.id+"' class=\"btn-first btn-submit text-custom-white mr-2\">ЧИТАТЬ ДАЛЕЕ</a>\n" +
                    "                                    <a href=\"#\" class=\"btn-first btn-border\">ЗАПИСАТЬСЯ НА ПРИЕМ</a>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n"

            })
            if (out!="") document.getElementById("swiper-main-slider").innerHTML=out;

        })
        .catch(function (error) {
            console.log(error)
            alert(error.response.data.message)
        })
}



all()
