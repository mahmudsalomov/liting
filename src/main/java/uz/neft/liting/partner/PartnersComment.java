package uz.neft.liting.partner;

import com.sun.istack.NotNull;
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
@Entity(name = "partners_comment")
public class PartnersComment extends AbsEntityInteger{

    @NotNull
    private String name;
    private String surname;
    @NotNull
    private String company;
    @NotNull
    private String comment;
    @NotNull
    @OneToOne
    private FileStorage signature;
    @NotNull
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class PartnerDto{
        private Integer id;
        private String name;
        private String surname;
        private String company;
        private String comment;
        private FileStorage signature;
        private FileStorage photo;

        public PartnerDto(PartnersComment partnersComment){
            this.id=partnersComment.getId();
            this.name=partnersComment.getName();
            this.surname=partnersComment.getSurname();
            this.comment=partnersComment.getComment();
            this.company=partnersComment.getCompany();
            this.photo=partnersComment.getPhoto();
            this.signature=partnersComment.getSignature();

        }
        public PartnersComment toEntity(){
            return PartnersComment
                    .builder()
                    .name(name)
                    .surname(surname)
                    .company(company)
                    .comment(comment)
                    .signature(signature)
                    .photo(photo)
                    .build();
        }
    }
}

