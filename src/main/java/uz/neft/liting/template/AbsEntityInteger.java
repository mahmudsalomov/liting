package uz.neft.liting.template;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

// Integer entity template
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class AbsEntityInteger implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OrderBy
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AbsEntityInteger that = (AbsEntityInteger) o;
        return Objects.equals(id, that.id);
    }

    private boolean deleted=false;

    @Override
    public int hashCode() {
        return 0;
    }
}
