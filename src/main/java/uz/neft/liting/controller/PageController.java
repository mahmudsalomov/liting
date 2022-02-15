package uz.neft.liting.controller;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import uz.neft.liting.blog.BlogService;

import javax.validation.Valid;
import java.util.Optional;

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


//    @GetMapping("/category")
//    public String category(){
//        return "blog-list-test";
//    }

//    @GetMapping("/category")
//    public String categoryByPage(@RequestParam Integer page){
//        return "blog-list-test";
//    }

//    @GetMapping("/category/{id}")
//    public String category(@Valid @PathVariable Integer id){
//        Integer integer = blogService.checkPage(id);
//        if (integer!=null) return "redirect:/blog/"+integer;
//        return "blog-list-test";
//    }

    @GetMapping("/category")
    public String category(@RequestParam Optional<Integer> id, @RequestParam Optional<Integer> page){
        if (id.isPresent()){
            Integer integer = blogService.checkPage(id.get());
            if (integer!=null) return "redirect:/blog/"+integer;
        }
        return "blog-list-test";
    }



}
