package uz.neft.liting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import uz.neft.liting.blog.BlogService;

import javax.validation.Valid;

@Controller
public class PageController {

    private final BlogService blogService;

    public PageController(BlogService blogService) {
        this.blogService = blogService;
    }


    @GetMapping("/blog/{id}")
    public String blog(@PathVariable Integer id){


        return "blog-detail-test";
    }


    @GetMapping("/category")
    public String category(){
        return "blog-list-test";
    }

    @GetMapping("/category/{id}")
    public String category(@Valid @PathVariable Integer id){
        Integer integer = blogService.checkPage(id);
        if (integer!=null) return "redirect:/blog/"+integer;
        return "blog-list-test";
    }

}
