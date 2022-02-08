package uz.neft.liting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PageController {



    @GetMapping("/blog/{id}")
    public String blog(@PathVariable Integer id){
        return "blog-detail-test";
    }

}
