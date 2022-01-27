package uz.neft.liting.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.neft.liting.category.Category;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogService {
    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public ApiResponse add(Blog.BlogDto dto){
        return Payload.ok(blogRepository.save(dto.toEntity()).toDto());
    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.Direction.DESC, sortBy.orElse("createdAt"));
        Page<Blog> all = blogRepository.findAll(pg);
        return Payload.ok(all.getContent().stream().map(Blog::toDto).collect(Collectors.toList()));
    }

    public ApiResponse one(Integer id) {
        Optional<Blog> categoryOptional = blogRepository.findById(id);
        if (categoryOptional.isEmpty()) return Payload.notFound();
        return Payload.ok(categoryOptional.get().toDto());
    }

//    public ApiResponse edit(Category.CategoryDto categoryDto) {
//        if (categoryDto.id==null) return Payload.badRequest("Id is null!");
//        Optional<Blog> category = blogRepository.findById(categoryDto.id);
//        if (category.isEmpty()) return Payload.notFound();
//        return Payload.ok(blogRepository.save(category.get().edit(categoryDto)).toDto());
//    }
}
