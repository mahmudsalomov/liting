package uz.neft.liting.metrics;

import lombok.*;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Month;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"year", "month"})})
public class Metric extends AbsEntityInteger {
    private int year;

    @Enumerated(EnumType.STRING)
    private Month month;

    private long count;

    @Builder
    public Metric(Integer id, Timestamp createdAt, Timestamp updatedAt, boolean deleted, int year, Month month, long count) {
        super(id, createdAt, updatedAt, deleted);
        this.year = year;
        this.month = month;
        this.count = count;
    }

    public Metric(int year, Month month, long count) {
        this.year = year;
        this.month = month;
        this.count = count;
    }
}
