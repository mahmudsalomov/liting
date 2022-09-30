package uz.neft.liting.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.neft.liting.category.Category;

import java.util.List;
import java.util.Set;

public interface BlogRepository extends JpaRepository<Blog,Integer> {

    List<Blog> findAllByDeletedFalse();
    Page<Blog> findAllByDeletedFalse(Pageable pageable);
    List<Blog> findAllByCategory(Category category);
    Page<Blog> findAllByCategory(Category category,Pageable pageable);
    List<Blog> findAllByMainSliderTrueOrderByIdDesc();
    List<Blog> findAllByDeletedFalseAndType(BlogType type);
    Page<Blog> findAllByDeletedFalseAndType(BlogType type,Pageable pageable);
    boolean existsByCategory(Category category);

    List<Blog> findAllByPublishDateIsNull();
    long countByCategory(Category category);
//    List<Blog> findAllByCategoriesAndDeletedFalse(Set<Category> categorySet);
//    Page<Blog> findAllByCategoriesAndDeletedFalse(Set<Category> categorySet,Pageable pageable);

}
