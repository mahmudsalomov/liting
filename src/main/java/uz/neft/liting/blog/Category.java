package uz.neft.liting.blog;

import lombok.*;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Builder
@Entity
public class Category extends AbsEntityInteger {


    public Category(Integer id, Timestamp createdAt, boolean deleted, String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category category) {
        super(id, createdAt, deleted);
        this.name_oz = name_oz;
        this.name_uz = name_uz;
        this.name_en = name_en;
        this.name_ru = name_ru;
        this.description_oz = description_oz;
        this.description_uz = description_uz;
        this.description_en = description_en;
        this.description_ru = description_ru;
        this.category = category;
    }

    public Category(String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category category) {
        this.name_oz = name_oz;
        this.name_uz = name_uz;
        this.name_en = name_en;
        this.name_ru = name_ru;
        this.description_oz = description_oz;
        this.description_uz = description_uz;
        this.description_en = description_en;
        this.description_ru = description_ru;
        this.category = category;
    }

    @NotNull
    private String name_oz;
    private String name_uz;
    private String name_en;
    private String name_ru;


    @Column(columnDefinition = "text")
    private String description_oz;
    @Column(columnDefinition = "text")
    private String description_uz;
    @Column(columnDefinition = "text")
    private String description_en;
    @Column(columnDefinition = "text")
    private String description_ru;

    @ManyToOne
    private Category category;





    public CategoryDto toDto(){
        return CategoryDto
                .builder()
                .id(getId())
                .createdAt(getCreatedAt())
                .name_en(name_en)
                .name_oz(name_oz)
                .name_ru(name_ru)
                .name_uz(name_uz)
                .description_en(description_en)
                .description_oz(description_oz)
                .description_ru(description_ru)
                .description_uz(description_uz)
                .categoryDto(category.toDto())
                .build();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    static class CategoryDto{
        public int id;
        public Timestamp createdAt;
        public String name_oz;
        public String name_uz;
        public String name_en;
        public String name_ru;
        public String description_oz;
        public String description_uz;
        public String description_en;
        public String description_ru;
        public CategoryDto categoryDto;
    }
}
