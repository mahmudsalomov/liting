package uz.neft.liting.employee;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import uz.neft.liting.file.FileStorage;
import uz.neft.liting.template.AbsEntityInteger;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
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

    public EmployeeEntity(Integer id, Timestamp createdAt, boolean deleted, String fullName, String fullNameRu, String positionOz, String positionUz, String positionEn, String positionRu, FileStorage photo, Status status) {
        super(id, createdAt, deleted);
        this.fullName = fullName;
        this.fullNameRu = fullNameRu;
        this.positionOz = positionOz;
        this.positionUz = positionUz;
        this.positionEn = positionEn;
        this.positionRu = positionRu;
        this.photo = photo;
        this.status = status;
    }

    public EmployeeEntity(String fullName, String fullNameRu, String positionOz, String positionUz, String positionEn, String positionRu, FileStorage photo, Status status) {
        this.fullName = fullName;
        this.fullNameRu = fullNameRu;
        this.positionOz = positionOz;
        this.positionUz = positionUz;
        this.positionEn = positionEn;
        this.positionRu = positionRu;
        this.photo = photo;
        this.status = status;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullNameRu() {
        return fullNameRu;
    }

    public void setFullNameRu(String fullNameRu) {
        this.fullNameRu = fullNameRu;
    }

    public String getPositionOz() {
        return positionOz;
    }

    public void setPositionOz(String positionOz) {
        this.positionOz = positionOz;
    }

    public String getPositionUz() {
        return positionUz;
    }

    public void setPositionUz(String positionUz) {
        this.positionUz = positionUz;
    }

    public String getPositionEn() {
        return positionEn;
    }

    public void setPositionEn(String positionEn) {
        this.positionEn = positionEn;
    }

    public String getPositionRu() {
        return positionRu;
    }

    public void setPositionRu(String positionRu) {
        this.positionRu = positionRu;
    }

    public FileStorage getPhoto() {
        return photo;
    }

    public void setPhoto(FileStorage photo) {
        this.photo = photo;
    }


    public void edited(EmployeeEntity employeeEn){
        fullName = employeeEn.fullName;
        positionOz = employeeEn.positionOz;
        if (employeeEn.photo!=null)
        photo = employeeEn.photo;
    }
}
