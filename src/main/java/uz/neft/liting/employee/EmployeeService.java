package uz.neft.liting.employee;

import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public ApiResponse add(EmployeeEntity employeeEntity){
        try {
            if (employeeEntity.getFullName()== null) return Payload.badRequest("isimmi bermadezyu oka");
            employeeEntity=employeeRepository.save(employeeEntity);
            return Payload.ok("bo'lauradi", employeeEntity);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("xatolik yuz berdi");
        }
    }

    public ApiResponse edit(EmployeeEntity employeeEntity){
        try {
            if (employeeEntity.getId()==null) return Payload.badRequest("isimmi bermadezyu oka");
            Optional<EmployeeEntity> employee = employeeRepository.findById(employeeEntity.getId());
            if (employee.isPresent()){
                EmployeeEntity entity = employee.get();
                entity.edited(employeeEntity);
                employeeRepository.save(entity);
            }
        }catch (Exception e){
         e.printStackTrace();
         return Payload.conflict("xatolik yuz berdi");
        }
        return Payload.ok("joyida",employeeEntity);
    }
    public ApiResponse one(Integer id){
        if (id == null) return Payload.badRequest("id berilmadi");
        Optional<EmployeeEntity> one = employeeRepository.findById(id);
        if (!one.isPresent()) return Payload.notFound();
        return Payload.ok(one.get());
    }

    public ApiResponse all(){
        try {
            List<EmployeeEntity> all = employeeRepository.findAll();
            return Payload.ok(all);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest("xoto yuz berdi");
        }
    }
    public ApiResponse delete(Integer id){
        try {
            employeeRepository.deleteById(id);
            return Payload.ok("O'chib ketti");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest("xatolik yuz berdi");
        }
    }
}
