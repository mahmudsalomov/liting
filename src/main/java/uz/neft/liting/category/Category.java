package uz.neft.liting.category;

import lombok.*;
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
//@Builder
@Entity
@ToString
public class Category extends AbsEntityInteger {
//    @Override
//    public String toString() {
//        return "Category{" +
//                "name_oz='" + name_oz + '\'' +
//                ", name_uz='" + name_uz + '\'' +
//                ", name_en='" + name_en + '\'' +
//                ", name_ru='" + name_ru + '\'' +
//                ", description_oz='" + description_oz + '\'' +
//                ", description_uz='" + description_uz + '\'' +
//                ", description_en='" + description_en + '\'' +
//                ", description_ru='" + description_ru + '\'' +
//                ", parent=" + parent +
//                ", children=" + children +
//                '}';
//    }

    //    @Override
//    public String toString() {
//        return "Category{" +
//                "id='" + this.getId() + '\'' +
//                ", createdAt='" + this.getCreatedAt() + '\'' +
//                ", name_oz='" + name_oz + '\'' +
//                ", name_uz='" + name_uz + '\'' +
//                ", name_en='" + name_en + '\'' +
//                ", name_ru='" + name_ru + '\'' +
//                ", description_oz='" + description_oz + '\'' +
//                ", description_uz='" + description_uz + '\'' +
//                ", description_en='" + description_en + '\'' +
//                ", description_ru='" + description_ru + '\'' +
//                ", parent=" + parent +
////                ", children=" + children +
//                '}';
//    }

    @Builder
    public Category(Integer id, Timestamp createdAt, boolean deleted, String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category parent
//            , List<Category> children
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
//        this.children=children;
    }

    public Category(String name_oz, String name_uz, String name_en, String name_ru, String description_oz, String description_uz, String description_en, String description_ru, Category parent
//            , List<Category> children
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
//        this.children=children;
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
//        category=dto.category!=null?dto.category.toEntity():null;
        return this;
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

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "parent_id")
    private Category parent;
//    @OneToMany(fetch = FetchType.EAGER,mappedBy = "parent",cascade = CascadeType.ALL)
//    @ToString.Exclude
//    private List<Category> children;


//    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
//    @ToString.Exclude
//
//    private Set<Category> children = new HashSet<>();
//
//    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
//    private Set<Category> children;





    public CategoryDto toDto(){
//        System.out.println(children);
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
                .parent(parent!=null?parent.toDto():null)
//                .children(children!=null?children.stream().map(Category::toDto).collect(Collectors.toList()):null)
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
//        public List<CategoryDto> children=new ArrayList<>();


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
                    .build();
        }
    }
}
