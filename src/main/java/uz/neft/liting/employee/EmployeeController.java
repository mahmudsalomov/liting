package uz.neft.liting.employee;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

@RestController
@RequestMapping("api/employee")
public class EmployeeController implements RestCrud<EmployeeEntity> {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return employeeService.all().response();
    }

    @Override
    public HttpEntity<?> add(EmployeeEntity employeeEntity, User user) {
        return employeeService.add(employeeEntity).response();
    }

    @Override
    public HttpEntity<?> edit(EmployeeEntity employeeEntity, User user) {
        return employeeService.edit(employeeEntity).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return employeeService.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return employeeService.one(id).response();
    }
}
