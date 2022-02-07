package uz.neft.liting.project;

import lombok.*;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@Entity(name = "project_entity")
public class ProjectEntity extends AbsEntityInteger{

    private String title;
    private String text;
    @OneToOne
    private FileStorage photo;

    public ProjectEntity(Integer id, Timestamp createdAt, boolean deleted, String title, String text, FileStorage photo) {
        super(id, createdAt, deleted);
        this.title = title;
        this.text = text;
        this.photo = photo;
    }

    public ProjectEntity(String title, String text, FileStorage photo) {
        this.title = title;
        this.text = text;
        this.photo = photo;
    }
    public void edit(ProjectEntity project){
        title = project.title;
        text = project.text;
        photo = project.photo;

    }
}
