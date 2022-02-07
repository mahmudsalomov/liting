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

    @Enumerated(EnumType.STRING)
    private Position position;

    @OneToOne
    private FileStorage photo;

    public EmployeeEntity(Integer id, Timestamp createdAt, boolean deleted, String fullName, Position position, FileStorage photo) {
        super(id, createdAt, deleted);
        this.fullName = fullName;
        this.position = position;
        this.photo = photo;
    }

    public EmployeeEntity(String fullName, Position position, FileStorage photo) {
        this.fullName = fullName;
        this.position = position;
        this.photo = photo;
    }
    public void edited(EmployeeEntity employeeEn){
        fullName = employeeEn.fullName;
        position = employeeEn.position;
        photo = employeeEn.photo;
    }
}
