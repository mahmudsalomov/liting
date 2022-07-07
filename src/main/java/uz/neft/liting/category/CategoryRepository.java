package uz.neft.liting.category;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {


    Page<Category> findAllByDeletedFalseOrderByOrderNumberAsc(Pageable pg);

    List<Category> findAllByDeletedFalseAndParent(Category parent);
    List<Category> findAllByDeletedFalseAndParentOrderByOrderNumberAsc(Category parent);
    List<Category> findAllByDeletedFalseAndParentIsNull();
    List<Category> findAllByDeletedFalseAndParentIsNullOrderByOrderNumberAsc();
    List<Category> findAllByDeletedFalseAndTypeNot(CategoryType type);
    List<Category> findAllByDeletedFalseAndTypeNotOrderByOrderNumberAsc(CategoryType type);
    List<Category> findAllByDeletedFalse();
    List<Category> findAllByDeletedFalseAndParentNotNull();
    List<Category> findAllByDeletedFalseAndParentNotNullOrderByOrderNumberAsc();

    @Query(value = "select * from category where parent_id=:parent_id",nativeQuery = true)
    List<Category> findAllByParentId(@Param(value = "parent_id") Integer parent_id);

    boolean existsByParent(Category parent);

    List<Category> findAllByDeletedFalseAndParentIsNullOrderByOrderNumberAsc(int i, Pageable secondPageWithFiveElements);
}
