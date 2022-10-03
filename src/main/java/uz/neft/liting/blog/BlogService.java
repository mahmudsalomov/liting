package uz.neft.liting.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.neft.liting.category.Category;
import uz.neft.liting.category.CategoryRepository;
import uz.neft.liting.category.CategoryType;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.ApiResponseObject;
import uz.neft.liting.payload.Payload;
import uz.neft.liting.user.User;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
            System.out.println(blog.getMainImage());
            if (blog.getStatus()==null) blog.setStatus(BlogStatus.DRAFT);
            if (blog.getCategory()==null) return Payload.badRequest("Category is not null!");

            Optional<Category> category = categoryRepository.findById(blog.getCategory().getId());

            if (!category.isPresent()) return Payload.badRequest("Category not found");
            if (category.get().getType()==CategoryType.PARENT) return Payload.badRequest("Bu "+category.get().getName_oz()+" kategoriyaga blog qo'shib bo'lmaydi");

            if (category.get().getType()==CategoryType.PAGE){
                List<Blog> all = blogRepository.findAllByCategory(category.get());
                if (all.size()>=1) return Payload.badRequest("Bu kategoriyaga boshqa blog qo'shib bo'lmaydi");
            }

            blog.setCategory(category.get());
            if (blog.getPublishDate()==null) blog.setPublishDate(new Timestamp(new Date().getTime()));
            return Payload.ok(blogRepository.save(blog));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }

    }


    public ApiResponse all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(9), Sort.Direction.DESC, sortBy.orElse("createdAt"));
        Page<Blog> all = blogRepository.findAllByDeletedFalse(pg);
        ApiResponseObject response = (ApiResponseObject) Payload.ok(all.getContent());
        response.setPage(all.getNumber());
        response.setTotalPages(all.getTotalPages());
        response.setTotalElements(all.getTotalElements());
        return response;
    }

    public ApiResponse one(Integer id, User user) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isPresent()){
                if (user==null) blogOptional.get().setView_count(blogOptional.get().getView_count()+1);
                return Payload.ok(blogRepository.save(blogOptional.get()));
            } return Payload.notFound("Bunaqa id li blog topilmadi");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }

    }



    public ApiResponse edit(Blog dto) {
        try {

            if (dto.getId()==null) return Payload.badRequest("Id is null!");
            Optional<Blog> blog = blogRepository.findById(dto.getId());
            if (!blog.isPresent()) return Payload.notFound();
            Blog edit = blog.get().edit(dto);

            if (dto.getCategory()!=null&&dto.getCategory().getId()!=null){


                Optional<Category> category = categoryRepository.findById(dto.getCategory().getId());
                if (!category.isPresent()) return Payload.badRequest("Category not found!");


                blog.get().setCategory(category.get());
            }
            return Payload.ok(blogRepository.save(edit));
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest();
        }
    }


    public ApiResponse allByCategory(Integer id,Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy){
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()){
                Pageable pg = PageRequest.of(page.orElse(0), pageSize.orElse(9), Sort.Direction.DESC, sortBy.orElse("createdAt"));
                Page<Blog> all = blogRepository.findAllByCategory(category.get(),pg);

                ApiResponseObject response = (ApiResponseObject) Payload.ok(all.getContent());
                response.setPage(all.getNumber());
                response.setTotalPages(all.getTotalPages());
                response.setTotalElements(all.getTotalElements());
                return response;
            }
            return Payload.notFound();
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }

    }

    public Integer checkPage(Integer category_id){
        Optional<Category> category = categoryRepository.findById(category_id);
        if (category.isPresent()&&category.get().getType()==CategoryType.PAGE){
            List<Blog> blogs = blogRepository.findAllByCategory(category.get());
            if (blogs.size()==1) return blogs.get(0).getId();
        }
        return null;
    }


    public ApiResponse mainSliderChanger(Integer blog_id, boolean isMainSlider) {
        try {
            Optional<Blog> blog = blogRepository.findById(blog_id);
            if (blog.isPresent()){
                blog.get().setMainSlider(isMainSlider);
                blogRepository.save(blog.get());
                return Payload.ok();
            }
            return Payload.notFound("Blog not found");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }




    public ApiResponse allByMainSliderTrue() {
        try {
            List<Blog> allByMainSliderTrue = blogRepository.findAllByMainSliderTrueOrderByIdDesc();
            return Payload.ok(allByMainSliderTrue);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse allBlogByType(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy,BlogType type) {
        try {
            List<Blog> all = blogRepository.findAllByDeletedFalseAndType(type);
            System.out.println(all);
            System.out.println(all.size());
            return Payload.ok(all);
        }catch (Exception e){
            return Payload.conflict();
        }
    }

    public ApiResponse delete(Integer id){
        try {
            blogRepository.deleteById(id);
            return Payload.ok("Successfully deleted!");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }


    public long count(Integer id){
        try {
            if (id==null||id==0){
                return blogRepository.count();
            }else {
                Optional<Category> category = categoryRepository.findById(id);
                return blogRepository.countByCategory(category.get());
            }
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
}
