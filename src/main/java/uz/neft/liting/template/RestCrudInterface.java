package uz.neft.liting.template;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.util.Optional;

public interface RestCrudInterface extends Serializable {
    @GetMapping("/all")
    HttpEntity<?> all( @RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                       @RequestParam(value = "pageSize", required = false, defaultValue = "10") Optional<Integer> pageSize,
                       @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") Optional<String> sortBy);

}
