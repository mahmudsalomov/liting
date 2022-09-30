package uz.neft.liting.statistics;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.sql.Timestamp;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
//@Builder
@Entity
public class Statistic extends AbsEntityInteger {
    private String name;
    @OneToOne
    @JoinColumn(name = "icon_id")
    private FileStorage icon;
    private int count;

    @Builder
    public Statistic(Integer id, Timestamp createdAt, Timestamp updatedAt, boolean deleted, String name, FileStorage icon, int count) {
        super(id, createdAt, updatedAt, deleted);
        this.name = name;
        this.icon = icon;
        this.count = count;
    }

    public Statistic(String name, FileStorage icon, int count) {
        this.name = name;
        this.icon = icon;
        this.count = count;
    }
}
