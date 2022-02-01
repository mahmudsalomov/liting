
function all() {
    axios.get("/api/category/all/sort")
        .then(function (response) {



            let categories=response.data.object;

            if (categories.length!=0){
                document.getElementById("navbar-root").innerHTML=menuBuilder(categories);
            }


            console.log(response)
            console.log(categories)
        })
        .catch(function (error) {
            console.log(error)
        })
}


function menuBuilder(categories) {
    let result="";
    categories.map(c=>{

        let out="";

        if (c.children.length>0){
            out="<li class=\"menu-item menu-item-has-children active\">" +
                "<a href=\"#\" class=\"text-theme fs-14\">"+c.name_uz+
                "<span class=\"arrow\"></span>"+"</a>"+menuContentBuilder(c.children);
        }else {
            out="<li class=\"menu-item menu-item-has-children active\">" +
                "<a href=\"#\" class=\"text-theme fs-14\">"+c.name_uz+
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

        if (v.children.length>0){
            out+="<li class=\"menu-item menu-item-has-children\">\n" +
                "        <a href=\"#\" class=\"text-theme\">"+v.name_uz+"" +
                "<span class=\"arrow\"></span>"+
                "</a>\n"+menuContentBuilder(v.children)
        }else {
            out+="<li class=\"menu-item\">\n" +
                "        <a href=\"#\" class=\"text-theme\">"+v.name_uz+"</a>\n";
        }
        out+="</li>";
        result+=out;
    })
    result+="</ul>";

    return result;


}
all()
