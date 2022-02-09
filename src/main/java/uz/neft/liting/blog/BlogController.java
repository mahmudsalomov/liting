package uz.neft.liting.blog;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("api/blog")
public class BlogController implements RestCrud<Blog> {


    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return blogService.all(page, pageSize, sortBy).response();
    }

    @Override
    public HttpEntity<?> add(Blog blog, User user) {
        System.out.println(blog);
        return blogService.add(blog).response();
    }

    @Override
    public HttpEntity<?> edit(Blog blog, User user) {
        return blogService.edit(blog).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return blogService.one(id).response();
    }

    @GetMapping("/all/{category_id}")
    public HttpEntity<?> allByCategory(@RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                                       @RequestParam(value = "pageSize", required = false, defaultValue = "10") Optional<Integer> pageSize,
                                       @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") Optional<String> sortBy,
                                       @Valid @PathVariable("category_id") Integer category_id) {
        return blogService.allByCategory(category_id,page, pageSize, sortBy).response();
    }

    @GetMapping("/all/main_slider")
    public HttpEntity<?> allByMainSliderTrue(){
        return blogService.allByMainSliderTrue().response();
    }

    @PostMapping("/main_slider_changer/{blog_id}")
    public HttpEntity<?> mainSliderChanger(@PathVariable Integer blog_id,@RequestParam boolean isMainSlider){
        return blogService.mainSliderChanger(blog_id,isMainSlider).response();
    }



}
