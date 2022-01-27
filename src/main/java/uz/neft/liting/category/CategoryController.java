package uz.neft.liting.category;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

@RestController
@RequestMapping("api/category")
public class CategoryController implements RestCrud<Category.CategoryDto> {


    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return categoryService.all(page, pageSize, sortBy).response();
    }

    @Override
    public HttpEntity<?> add(Category.CategoryDto categoryDto, User user) {
        return categoryService.add(categoryDto).response();
    }

    @Override
    public HttpEntity<?> edit(Category.CategoryDto categoryDto, User user) {
        return categoryService.edit(categoryDto).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return categoryService.one(id).response();
    }
}
