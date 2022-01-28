package uz.neft.liting.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {


    List<Category> findAllByDeletedFalseAndParent(Category parent);
    List<Category> findAllByDeletedFalseAndParentIsNull();
    List<Category> findAllByDeletedFalse();
    List<Category> findAllByDeletedFalseAndParentNotNull();

}
