package uz.neft.liting.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import uz.neft.liting.blog.BlogType;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
public class Category extends AbsEntityInteger {

    @Builder
    public Category(Integer id, Timestamp createdAt, boolean deleted, String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category parent, List<Category> children, CategoryType type
    ) {
        super(id, createdAt, deleted);
        this.name_oz = name_oz;
        this.name_uz = name_uz;
        this.name_en = name_en;
        this.name_ru = name_ru;
        this.description_oz = description_oz;
        this.description_uz = description_uz;
        this.description_en = description_en;
        this.description_ru = description_ru;
        this.parent = parent;
        this.children=children;
        this.type=type;
    }

    public Category(String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category parent, CategoryType type
    ) {
        this.name_oz = name_oz;
        this.name_uz = name_uz;
        this.name_en = name_en;
        this.name_ru = name_ru;
        this.description_oz = description_oz;
        this.description_uz = description_uz;
        this.description_en = description_en;
        this.description_ru = description_ru;
        this.parent = parent;
        this.type=type;
    }

    public Category(CategoryDto dto){
        name_en=dto.name_en;
        name_uz=dto.name_uz;
        name_ru=dto.name_ru;
        name_oz=dto.name_oz;
        description_en=dto.description_en;
        description_oz=dto.description_uz;
        description_uz=dto.description_uz;
        description_ru=dto.description_ru;
        parent=dto.parent.toEntity();
    }

    public Category edit(CategoryDto dto){
        name_en=dto.name_en;
        name_uz=dto.name_uz;
        name_ru=dto.name_ru;
        name_oz=dto.name_oz;
        description_en=dto.description_en;
        description_oz=dto.description_uz;
        description_uz=dto.description_uz;
        description_ru=dto.description_ru;
        type=dto.type;
        return this;
    }

    @NotNull
    @Column(unique = true)
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


    @JsonIgnore
    @ManyToOne
    private Category parent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent",cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Category> children;

    @Enumerated(EnumType.STRING)
    private CategoryType type;






    public CategoryDto toDto(){
        System.out.println("PARENT:");
        System.out.println(parent);
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
                .parent(parent!=null?new CategoryDto(parent):null)
                .type(type)
                .children(children!=null&&children.size()>0?children.stream().map(Category::toDto).collect(Collectors.toList()):new ArrayList<>())
                .build();
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class CategoryDto{
        public Integer id;
        public Timestamp createdAt;
        public String name_oz;
        public String name_uz;
        public String name_en;
        public String name_ru;
        public String description_oz;
        public String description_uz;
        public String description_en;
        public String description_ru;
        public CategoryDto parent;
        public CategoryType type;
        public List<CategoryDto> children=new ArrayList<>();


        public CategoryDto(Category category){
            this.id=category.getId();
            this.createdAt=category.getCreatedAt();
            this.name_oz=category.getName_oz();
            this.name_uz=category.getName_uz();
            this.name_en=category.getName_en();
            this.name_ru=category.getName_ru();

            this.description_oz=category.getDescription_oz();
            this.description_uz=category.getDescription_uz();
            this.description_en=category.getDescription_en();
            this.description_ru=category.getDescription_ru();
            this.type=category.getType();
            if (category.getParent()!=null){
                this.parent=category.getParent().toDto();
            }
        }

        public Category toEntity(){
            return Category
                    .builder()
                    .parent(parent!=null?parent.toEntity():null)
                    .name_en(name_en)
                    .name_oz(name_oz)
                    .name_ru(name_ru)
                    .name_uz(name_uz)
                    .description_en(description_en)
                    .description_oz(description_oz)
                    .description_ru(description_ru)
                    .description_uz(description_uz)
                    .type(type!=null?type:CategoryType.PARENT)
                    .build();
        }
    }
}
