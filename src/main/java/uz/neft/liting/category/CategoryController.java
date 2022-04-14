package uz.neft.liting.category;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("api/category")
public class CategoryController implements RestCrud<Category> {


    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return categoryService.all(page, pageSize, sortBy).response();
    }

    @Override
    public HttpEntity<?> add(Category category, User user) {
        return categoryService.add(category).response();
    }

    @Override
    public HttpEntity<?> edit(Category category, User user) {
        return categoryService.edit(category).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return categoryService.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return categoryService.one(id).response();
    }

    @GetMapping("/all/sort")
    public HttpEntity<?> allBySort(){
        return categoryService.allBySort().response();
    }

    @GetMapping("/all/children")
    public HttpEntity<?> allChildren(@RequestParam Integer id){
        return categoryService.allChildren(id).response();
    }

    @GetMapping("/all/types")
    public HttpEntity<?> types(){
        return categoryService.types().response();
    }

    @GetMapping("/parent")
    public HttpEntity<?> getParent(@RequestParam Integer id){
        return categoryService.getParent(id).response();
    }

    @GetMapping("/all/not/parent")
    public HttpEntity<?> allNotParent(){
        return categoryService.allNotParent().response();
    }

    @GetMapping("/name/{id}")
    public HttpEntity<?> name(@PathVariable Integer id){
        return ResponseEntity.ok(categoryService.name(id));
    }


//    @GetMapping("/all/children")
//    public HttpEntity<?> allByChildren(){
//
//    }
}
