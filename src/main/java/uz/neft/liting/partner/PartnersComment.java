package uz.neft.liting.partner;

import lombok.*;
import uz.neft.liting.blog.BlogStatus;
import uz.neft.liting.category.Category;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Optional;


@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@Entity(name = "partners_comment")
public class PartnersComment extends AbsEntityInteger{

    @NotNull
    private String name;
    private String surname;
    @NotNull
    private String company;
    @NotNull
    private String comment;


    @OneToOne
    private FileStorage signature;
//    @NotNull
    @OneToOne
    private FileStorage photo;


    public PartnersComment(Integer id, Timestamp createdAt, boolean deleted, String name, String surname, String company, String comment, FileStorage signature, FileStorage photo) {
        super(id, createdAt, deleted);
        this.name = name;
        this.surname = surname;
        this.company = company;
        this.comment = comment;
        this.signature = signature;
        this.photo = photo;
    }

    public PartnersComment(String name, String surname, String company, String comment, FileStorage signature, FileStorage photo) {
        this.name = name;
        this.surname = surname;
        this.company = company;
        this.comment = comment;
        this.signature = signature;
        this.photo = photo;
    }
    public void edit(PartnersComment parCom){
        name=parCom.name;
        surname=parCom.surname;
        company=parCom.company;
        comment=parCom.comment;
        signature=parCom.signature;
        photo=parCom.photo;
    }
}

