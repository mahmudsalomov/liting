package uz.neft.liting.employee;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@Entity(name = "employee_entity")
public class EmployeeEntity extends AbsEntityInteger {

    @NotNull
    @JsonProperty("full_name")
    private String fullName;

    @NotNull
    @JsonProperty("full_name_ru")
    private String fullNameRu;

    @NotNull
    @JsonProperty("position_oz")
    private String positionOz;

    @NotNull
    @JsonProperty("position_uz")
    private String positionUz;

    @NotNull
    @JsonProperty("position_en")
    private String positionEn;

    @NotNull
    @JsonProperty("position_ru")
    private String positionRu;

    @OneToOne
    private FileStorage photo;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "text")
    @JsonProperty("text_ru")
    private String textRu;

    @Column(columnDefinition = "text")
    @JsonProperty("text_oz")
    private String textOz;

    @Column(columnDefinition = "text")
    @JsonProperty("text_uz")
    private String textUz;

    @Column(columnDefinition = "text")
    @JsonProperty("text_en")
    private String textEn;

    public EmployeeEntity(Integer id, Timestamp createdAt, Timestamp updatedAt, boolean deleted,
                          String fullName, String fullNameRu, String positionOz,
                          String positionUz, String positionEn, String positionRu,
                          FileStorage photo, Status status, String textRu,
                          String textOz, String textUz, String textEn) {
        super(id, createdAt, updatedAt, deleted);
        this.fullName = fullName;
        this.fullNameRu = fullNameRu;
        this.positionOz = positionOz;
        this.positionUz = positionUz;
        this.positionEn = positionEn;
        this.positionRu = positionRu;
        this.photo = photo;
        this.status = status;
        this.textRu = textRu;
        this.textOz = textOz;
        this.textUz = textUz;
        this.textEn = textEn;
    }

    public EmployeeEntity(String fullName, String fullNameRu, String positionOz,
                          String positionUz, String positionEn, String positionRu,
                          FileStorage photo, Status status, String textRu,
                          String textOz, String textUz, String textEn) {
        this.fullName = fullName;
        this.fullNameRu = fullNameRu;
        this.positionOz = positionOz;
        this.positionUz = positionUz;
        this.positionEn = positionEn;
        this.positionRu = positionRu;
        this.photo = photo;
        this.status = status;
        this.textRu = textRu;
        this.textOz = textOz;
        this.textUz = textUz;
        this.textEn = textEn;
    }
    public String getFullName() {
        return fullName;
    }
    public void setPhoto(FileStorage photo) {
        this.photo = photo;
    }
    public void edited(EmployeeEntity employeeEn){
        fullName = employeeEn.fullName;
        fullNameRu = employeeEn.fullNameRu;
        positionOz = employeeEn.positionOz;
        positionUz = employeeEn.positionUz;
        positionEn = employeeEn.positionEn;
        positionRu = employeeEn.positionRu;
        textRu = employeeEn.textRu;
        textOz = employeeEn.textOz;
        textUz = employeeEn.textUz;
        textEn = employeeEn.textEn;
        if (employeeEn.photo!=null) {
            photo = employeeEn.photo;
        }else System.out.println(photo);
    }
}
