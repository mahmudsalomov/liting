package uz.neft.liting.controller;

import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@org.springframework.stereotype.Controller
public class Controller {
    @GetMapping("/")
    public String main(HttpServletRequest request){
//        System.out.println(request.getRemoteAddr());
//        System.out.println(request.getHeaderNames());
//        return "redirect:login";
        return "admin/login";
    }
//    @GetMapping("/404")
//    public String main404(){
//        return "404";
//    }
//    @GetMapping("/homepage-2")
//    public String homepage(){
//        return "homepage-2";
//    }
//    @GetMapping("/managment")
//    public String managment(){
//        return "managment";
//    }
//    @GetMapping("/nablyudatelniySovet")
//    public String nablyudatelniySovet(){
//        return "nablyudatelniySovet";
//    }
//    @GetMapping("/shortaboutus")
//    public String shortaboutus(){
//        return "shortaboutus";
//    }
//    @GetMapping("/index2")
//    public String index2(){
//        return "index2";
//    }
//    @GetMapping("/structure")
//    public String structure(){
//        return "structure";
//    }
}
