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

    public ApiResponse add(Category category){

//        if (dto.parent != null && dto.type == CategoryType.PARENT) return Payload.badRequest();

        try {
//            Category category = dto;


//            if (dto.parent!=null){
//                Optional<Category> parent = categoryRepository.findById(dto.parent.id);
//
//                if (parent.isPresent()){
//
//                }
//
//            }
//            category.setParent(dto.getParent()!=null?categoryRepository.getOne(dto.getParent().getId()):null);

            if (category.getParent()!=null){
                Optional<Category> parent = categoryRepository.findById(category.getParent().getId());

//                if (parent)
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


            System.out.println(category);
            return Payload.ok(category);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        try {
//            Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.Direction.DESC, sortBy.orElse("createdAt"));
            Pageable pg = PageRequest.of(page.orElse(0), 1000, Sort.Direction.DESC, sortBy.orElse("createdAt"));
            Page<Category> all = categoryRepository.findAll(pg);
            return Payload.ok(all.getContent());
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }

    }

    public ApiResponse one(Integer id) {

        try {
            Optional<Category> categoryOptional = categoryRepository.findById(id);
            if (!categoryOptional.isPresent()) return Payload.notFound();
//            System.out.println(categoryOptional.get().getChildren()!=null?categoryOptional.get().getChildren():"Yo'q");
            return Payload.ok(categoryOptional.get());
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }

    public ApiResponse edit(Category categoryDto) {

        try {
            if (categoryDto.getId()==null) return Payload.badRequest("Id is null!");
            Optional<Category> category = categoryRepository.findById(categoryDto.getId());
            if (!category.isPresent()) return Payload.notFound();
            Category edit = category.get().edit(categoryDto);

            if (categoryDto.getParent()!=null){
                Optional<Category> parent = categoryRepository.findById(categoryDto.getParent().getId());

                // Otasi o'zi bilan bir xil bo'lib qolsa
                if (parent.equals(category)) return Payload.badRequest("Category must not be equal to parent category");

                // Otasi o'zini bola kategoriyasiga teng bo'lmasligi kerak
                if (parent.isPresent()&&category.get().getChildren().size()!=0){
                    for (Category ch:category.get().getChildren()) {
                        if(ch.getId()==parent.get().getId()) return Payload.badRequest("Parent must not equal himself to child category");
                    }
                }

                if (parent.isPresent()) edit.setParent(parent.get());
                else edit.setParent(null);
            }
            return Payload.ok(categoryRepository.save(edit));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }


    }

    public ApiResponse allBySort(){
        try {
            List<Category> allParents = categoryRepository.findAllByDeletedFalseAndParentIsNull();
            return Payload.ok(allParents);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse allNotParent(){
        try {
            List<Category> allParents = categoryRepository.findAllByDeletedFalseAndTypeNot(CategoryType.PARENT);
            return Payload.ok(allParents);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public String name(Integer id){
        if (id==null) return "Bloglar";
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) return category.get().getName_oz();
        return "";
    }

    public ApiResponse allChildren(Integer id) {
        try {
            if (id==null||id==0) return Payload.ok(categoryRepository.findAllByDeletedFalseAndParentIsNull());
            return categoryRepository.findById(id).map(category -> Payload.ok(category.getChildren())).orElseGet(() -> Payload.notFound("Category not found"));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse getParent(Integer id) {
        try {
            if (id==null||id==0) return Payload.ok(null);
            return categoryRepository.findById(id).map(category -> Payload.ok(category.getParent())).orElseGet(() -> Payload.notFound("Category not found!"));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse types() {
        List<CategoryType> types=new ArrayList<>();
        types.add(CategoryType.PAGE);
        types.add(CategoryType.PARENT);
        types.add(CategoryType.BLOGS);
        return Payload.ok(types);
    }
}
