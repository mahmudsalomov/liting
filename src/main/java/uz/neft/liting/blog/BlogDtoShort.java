package uz.neft.liting.blog;

import lombok.*;
import uz.neft.liting.category.Category;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
//@Builder
//@Entity
@ToString
public class BlogDtoShort extends AbsEntityInteger {

    @Builder
    public BlogDtoShort(Integer id, Timestamp createdAt, Timestamp updatedAt, boolean deleted, String title_oz, String title_uz, String title_en, String title_ru, long view_count, String anons_oz, String anons_uz, String anons_en, String anons_ru, FileStorage mainImage, Category category, Set<FileStorage> files, BlogType type, BlogStatus status, Timestamp publishDate) {
        super(id, createdAt, updatedAt, deleted);
        this.title_oz = title_oz;
        this.title_uz = title_uz;
        this.title_en = title_en;
        this.title_ru = title_ru;
        this.view_count = view_count;
        this.anons_oz = anons_oz;
        this.anons_uz = anons_uz;
        this.anons_en = anons_en;
        this.anons_ru = anons_ru;
        this.mainImage = mainImage;
        this.category = category;
//        this.files = files;
        this.type = type;
        this.status = status;
        this.publishDate = publishDate;
    }

    public BlogDtoShort(String title_oz, String title_uz, String title_en, String title_ru, long view_count, String anons_oz, String anons_uz, String anons_en, String anons_ru, FileStorage mainImage, Category category, BlogType type, BlogStatus status, Timestamp publishDate) {
        this.title_oz = title_oz;
        this.title_uz = title_uz;
        this.title_en = title_en;
        this.title_ru = title_ru;
        this.view_count = view_count;
        this.anons_oz = anons_oz;
        this.anons_uz = anons_uz;
        this.anons_en = anons_en;
        this.anons_ru = anons_ru;
        this.mainImage = mainImage;
        this.category = category;
//        this.files = files;
        this.type = type;
        this.status = status;
        this.publishDate = publishDate;
    }

    private String title_oz;
    private String title_uz;
    private String title_en;
    private String title_ru;

    private long view_count;

    private String anons_oz;
    private String anons_uz;
    private String anons_en;
    private String anons_ru;


    private FileStorage mainImage;

    private Category category;

//    private Set<FileStorage> files;

    private BlogType type;

    private BlogStatus status;

    private Timestamp publishDate;


}
