package uz.neft.liting.blog;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.security.CurrentUser;
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
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy, User user) {
        return blogService.all(page, pageSize, sortBy, user).response();
    }

    @Override
    public HttpEntity<?> add(Blog blog, User user) {
        return blogService.add(blog).response();
    }

    @Override
    public HttpEntity<?> edit(Blog blog, User user) {
        return blogService.edit(blog).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return blogService.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id, User user) {
        return blogService.one(id,user).response();
    }


    @GetMapping("/all/{category_id}")
    public HttpEntity<?> allByCategory(@RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                                       @RequestParam(value = "pageSize", required = false, defaultValue = "9") Optional<Integer> pageSize,
                                       @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") Optional<String> sortBy,
                                       @Valid @PathVariable("category_id") Integer category_id,
                                       @CurrentUser User user) {
        return blogService.allByCategory(category_id,page, pageSize, sortBy, user).response();
    }

    @GetMapping("/all/type")
    public HttpEntity<?> allBlogByType(@RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                                            @RequestParam(value = "pageSize", required = false, defaultValue = "9") Optional<Integer> pageSize,
                                            @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") Optional<String> sortBy,
                                         @RequestParam BlogType type){
        return blogService.allBlogByType(page,pageSize,sortBy,type).response();
    }

    @GetMapping("/all/main_slider")
    public HttpEntity<?> allByMainSliderTrue(){
        return blogService.allByMainSliderTrue().response();
    }

    @PostMapping("/main_slider_changer/{blog_id}")
    public HttpEntity<?> mainSliderChanger(@PathVariable Integer blog_id,@RequestParam boolean isMainSlider){
        return blogService.mainSliderChanger(blog_id,isMainSlider).response();
    }


    @GetMapping("/count")
    public long count(@Nullable @RequestParam(required = false) Integer category){
        return blogService.count(category);
    }

    @PostMapping("/search")
    public HttpEntity<?> search(@RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                                @RequestParam(value = "pageSize", required = false, defaultValue = "9") Optional<Integer> pageSize,
                                @RequestParam(value = "sortBy", required = false, defaultValue = "created_at") Optional<String> sortBy,
                                @RequestParam String keyword){
        return blogService.search(page,pageSize,sortBy,keyword).response();
    }


}
