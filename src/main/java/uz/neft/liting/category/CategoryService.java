package uz.neft.liting.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;


    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ApiResponse add(Category.CategoryDto dto){

//        if (dto.parent != null && dto.type == CategoryType.PARENT) return Payload.badRequest();

        try {
            Category category = dto.toEntity();


//            if (dto.parent!=null){
//                Optional<Category> parent = categoryRepository.findById(dto.parent.id);
//
//                if (parent.isPresent()){
//
//                }
//
//            }
//            category.setParent(dto.getParent()!=null?categoryRepository.getOne(dto.getParent().getId()):null);

            if (dto.parent!=null){
                Optional<Category> parent = categoryRepository.findById(dto.parent.id);

//            parent.ifPresent(value -> {
//                category.setParent(value);
//                category.setParent_id(value.getId());
//            });
//                parent.ifPresent(category::setParent);



                if (parent.isPresent()){
                    category.setParent(parent.get());
                }else category.setParent(null);
//            parent.ifPresent(value->{
//                category.setParent(parent.get());
////                Set<Category> children = parent.get().getChildren();
////                children.add(category);
////                parent.get().setChildren(children);
//                categoryRepository.save(parent.get());
//            });
            }
            category=categoryRepository.save(category);


//            if (category.getParent()!=null){
//                category.getParent().getChildren().add(category);
//                System.out.println(category.getParent());
//                System.out.println(category.getParent().getChildren());
//
//                categoryRepository.save(category.getParent());
//            }

            Category.CategoryDto save = category.toDto();
            System.out.println(category);
            return Payload.ok(save);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        try {
            Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.Direction.DESC, sortBy.orElse("createdAt"));
            Page<Category> all = categoryRepository.findAll(pg);
            return Payload.ok(all.getContent().stream().map(Category::toDto).collect(Collectors.toList()));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }

    }

    public ApiResponse one(Integer id) {

        try {
            Optional<Category> categoryOptional = categoryRepository.findById(id);
            if (categoryOptional.isEmpty()) return Payload.notFound();
//            System.out.println(categoryOptional.get().getChildren()!=null?categoryOptional.get().getChildren():"Yo'q");
            return Payload.ok(categoryOptional.get().toDto());
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }

    public ApiResponse edit(Category.CategoryDto categoryDto) {

        try {
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
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }

    public ApiResponse allBySort(){

        try {

            List<Category> allParents = categoryRepository.findAllByDeletedFalseAndParentIsNull();

            return Payload.ok(allParents.stream().map(Category::toDto));

        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }




    }

}
