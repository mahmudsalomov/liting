package uz.neft.liting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import uz.neft.liting.blog.BlogController;

@Controller
public class PageController {

    private final BlogController blogController;

    public PageController(BlogController blogController) {
        this.blogController = blogController;
    }


    @GetMapping("/blog/{id}")
    public String blog(@PathVariable Integer id, Model model){


        return "blog-detail-test";
    }


    @GetMapping("/category")
    public String category(){
        return "blog-list-test";
    }

    @GetMapping("/category/{id}")
    public String category(@PathVariable Integer id){
        return "blog-list-test";
    }

}
