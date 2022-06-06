package uz.neft.liting.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import uz.neft.liting.partner.PartnerRepository;
import uz.neft.liting.partner.PartnersComment;

import java.util.List;

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

//    @Autowired
//    PartnerRepository partnerRepository;
//    @GetMapping("/partner/search/name")
//    public ResponseEntity<List<PartnersComment>> partnerSearchName(@RequestParam String name){
//        return new ResponseEntity<>(partnerRepository.findByName(name), HttpStatus.OK);
//    }


    @GetMapping("/statistics")
    public String statistics(){
        return "admin/statistics";
    }


//    @GetMapping("/login")
//    public String main() {
//        return "admin/login";
//    }

}
