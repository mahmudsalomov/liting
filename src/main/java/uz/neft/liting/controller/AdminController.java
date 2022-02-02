package uz.neft.liting.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public String blog(){
        return "admin/blog";
    }

}
