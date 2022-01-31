package uz.neft.liting.category;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {


    List<Category> findAllByDeletedFalseAndParent(Category parent);
    List<Category> findAllByDeletedFalseAndParentIsNull();
    List<Category> findAllByDeletedFalse();
    List<Category> findAllByDeletedFalseAndParentNotNull();

    @Query(value = "select * from category where parent_id=:parent_id",nativeQuery = true)
    List<Category> findAllByParentId(@Param(value = "parent_id") Integer parent_id);

}
