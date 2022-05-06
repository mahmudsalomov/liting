package uz.neft.liting.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("admin")
public class AdminController {

    @GetMapping("/")
    public String admin(){
        return "admin/index";
    }
    @GetMapping("")
    public String admin2(){
        return "admin/index";
    }


    @GetMapping("/category")
    public String category(){
        return "admin/category";
    }

    @GetMapping("/blog")
    public String blog(@RequestParam(required=false) Integer page, @RequestParam(required=false) Integer category){
        return "admin/blogs";
    }


//    @GetMapping("/blog")
//    public String blog(@RequestParam Integer page){
//        return "admin/blogs";
//    }

    @GetMapping("/blog/add")
    public String blogAdd(){
        return "admin/blog-add";
    }

    @GetMapping("/blog/edit/{id}")
    public String blogEdit(@PathVariable Integer id){

        return "admin/blog-add";
    }


    @GetMapping("/employee")
    public String employee(){
        return "admin/employee";
    }

    @GetMapping("/partner")
    public String partner(){
        return "admin/partner";
    }


    @GetMapping("/statistics")
    public String statistics(){
        return "admin/statistics";
    }

}
