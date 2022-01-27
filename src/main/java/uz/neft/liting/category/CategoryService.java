package uz.neft.liting.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;


    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ApiResponse add(Category.CategoryDto dto){
        Category category = dto.toEntity();
        if (dto.parent!=null){
            Optional<Category> parent = categoryRepository.findById(dto.parent.id);
//            parent.ifPresent(value -> {
//                category.setParent(value);
//                category.setParent_id(value.getId());
//            });
//            parent.ifPresent(category::setParent);
            parent.ifPresent(value->{
                category.setParent(parent.get());
                Set<Category> children = parent.get().getChildren();
                children.add(category);
                parent.get().setChildren(children);
                categoryRepository.save(parent.get());
            });
        }
        return Payload.ok(categoryRepository.save(category).toDto());
    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.Direction.DESC, sortBy.orElse("createdAt"));
        Page<Category> all = categoryRepository.findAll(pg);
        return Payload.ok(all.getContent().stream().map(Category::toDto).collect(Collectors.toList()));
    }

    public ApiResponse one(Integer id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) return Payload.notFound();
        return Payload.ok(categoryOptional.get().toDto());
    }

    public ApiResponse edit(Category.CategoryDto categoryDto) {
        if (categoryDto.id==null) return Payload.badRequest("Id is null!");
        Optional<Category> category = categoryRepository.findById(categoryDto.id);
        if (category.isEmpty()) return Payload.notFound();
        Category edit = category.get().edit(categoryDto);

        if (categoryDto.parent!=null){
            Optional<Category> parent = categoryRepository.findById(categoryDto.parent.id);
            if (parent.isPresent()) edit.setParent(parent.get());
            else edit.setParent(null);
        }
        return Payload.ok(categoryRepository.save(edit).toDto());
    }
}
