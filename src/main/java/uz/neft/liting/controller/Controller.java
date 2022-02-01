package uz.neft.liting.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {
    @GetMapping("/")
    public String main(){
        return "index";
    }
    @GetMapping("/404")
    public String main404(){
        return "404";
    }
    @GetMapping("/homepage-2")
    public String homepage(){
        return "homepage-2";
    }
    @GetMapping("/managment")
    public String managment(){
        return "managment";
    }
    @GetMapping("/nablyudatelniySovet")
    public String nablyudatelniySovet(){
        return "nablyudatelniySovet";
    }
    @GetMapping("/index2")
    public String index2(){
        return "index2";
    }
    @GetMapping("/structure")
    public String structure(){
        return "structure";
    }
}
