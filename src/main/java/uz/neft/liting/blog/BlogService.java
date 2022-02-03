package uz.neft.liting.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.neft.liting.category.Category;
import uz.neft.liting.category.CategoryRepository;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    public ApiResponse add(Blog blog){
        try {
            if (blog.getStatus()==null) blog.setStatus(BlogStatus.DRAFT);
            if (blog.getCategory()==null) return Payload.badRequest("Category is not null!");

            Optional<Category> category = categoryRepository.findById(blog.getCategory().getId());

            if (!category.isPresent()) return Payload.badRequest("Category not found");
            blog.setCategory(category.get());
            return Payload.ok(blogRepository.save(blog));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }

    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.Direction.DESC, sortBy.orElse("createdAt"));
        Page<Blog> all = blogRepository.findAllByDeletedFalse(pg);
        return Payload.ok(all.getContent());
    }

    public ApiResponse one(Integer id) {
        Optional<Blog> categoryOptional = blogRepository.findById(id);
        if (!categoryOptional.isPresent()) return Payload.notFound();
        return Payload.ok(categoryOptional.get());
    }



    public ApiResponse edit(Blog dto) {
        try {
            if (dto.getId()==null) return Payload.badRequest("Id is null!");
            Optional<Blog> blog = blogRepository.findById(dto.getId());
            if (!blog.isPresent()) return Payload.notFound();
            Blog edit = blog.get().edit(dto);
            if (dto.getCategory()!=null){


                Optional<Category> category = categoryRepository.findById(dto.getCategory().getId());
                if (!category.isPresent()) return Payload.badRequest("Category not found!");


                blog.get().setCategory(category.get());
            } else return Payload.badRequest("Category is not null!");
            return Payload.ok(blogRepository.save(edit));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }
}
