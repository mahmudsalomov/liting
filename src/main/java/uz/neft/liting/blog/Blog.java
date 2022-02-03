package uz.neft.liting.blog;

import lombok.*;
import uz.neft.liting.category.Category;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
//@Builder
@Entity
public class Blog extends AbsEntityInteger {

    @Builder
    public Blog(Integer id, Timestamp createdAt, boolean deleted, @NonNull String title_oz, String title_uz, String title_en, String title_ru, @NonNull String anons_oz, String anons_uz, String anons_en, String anons_ru, @NonNull String text_oz, String text_uz, String text_en, String text_ru, FileStorage mainImage, Set<Category> categories, Set<FileStorage> files, BlogType type) {
        super(id, createdAt, deleted);
        this.title_oz = title_oz;
        this.title_uz = title_uz;
        this.title_en = title_en;
        this.title_ru = title_ru;
        this.anons_oz = anons_oz;
        this.anons_uz = anons_uz;
        this.anons_en = anons_en;
        this.anons_ru = anons_ru;
        this.text_oz = text_oz;
        this.text_uz = text_uz;
        this.text_en = text_en;
        this.text_ru = text_ru;
        this.mainImage=mainImage;
        this.categories = categories;
        this.files = files;
        this.type = type;
    }

//    public Blog(@NonNull String title_oz, String title_uz, String title_en, String title_ru, @NonNull String anons_oz, String anons_uz, String anons_en, String anons_ru, @NonNull String text_oz, String text_uz, String text_en, String text_ru, Set<Category> categories, Set<FileStorage> files, BlogType type) {
//        this.title_oz = title_oz;
//        this.title_uz = title_uz;
//        this.title_en = title_en;
//        this.title_ru = title_ru;
//        this.anons_oz = anons_oz;
//        this.anons_uz = anons_uz;
//        this.anons_en = anons_en;
//        this.anons_ru = anons_ru;
//        this.text_oz = text_oz;
//        this.text_uz = text_uz;
//        this.text_en = text_en;
//        this.text_ru = text_ru;
//        this.categories = categories;
//        this.files = files;
//        this.type = type;
//    }

    @NonNull
    private String title_oz;
    private String title_uz;
    private String title_en;
    private String title_ru;

    @NonNull
    @Column(columnDefinition = "text")
    private String anons_oz;
    @Column(columnDefinition = "text")
    private String anons_uz;
    @Column(columnDefinition = "text")
    private String anons_en;
    @Column(columnDefinition = "text")
    private String anons_ru;


    @NonNull
    @Column(columnDefinition = "text")
    private String text_oz;
    @Column(columnDefinition = "text")
    private String text_uz;
    @Column(columnDefinition = "text")
    private String text_en;
    @Column(columnDefinition = "text")
    private String text_ru;

    @ManyToOne
    private FileStorage mainImage;

    @ManyToMany
    private Set<Category> categories;

    @ManyToMany
    private Set<FileStorage> files;

    @Enumerated(EnumType.STRING)
    private BlogType type;

    @Enumerated(EnumType.STRING)
    private BlogStatus status;

    @Column(nullable = false)
    private boolean isMainSlider=false;


    public Blog edit(Blog dto){
        title_en=dto.title_en;
        title_uz=dto.title_uz;
        title_oz=dto.title_oz;
        title_ru=dto.title_ru;
        anons_en=dto.anons_en;
        anons_oz=dto.anons_oz;
        anons_uz=dto.anons_uz;
        anons_ru=dto.anons_ru;
        text_en=dto.text_en;
        text_oz=dto.text_oz;
        text_uz=dto.text_uz;
        text_ru=dto.text_ru;
        mainImage=dto.mainImage;
        files=dto.files;
        type=dto.type;
        return this;
    }




}
