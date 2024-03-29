package uz.neft.liting.template;

import org.springframework.http.HttpEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.security.CurrentUser;
import uz.neft.liting.user.User;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.Optional;

@RestController
@CrossOrigin
public interface RestCrud<T> extends Serializable {
    @GetMapping("/all")
    HttpEntity<?> all( @RequestParam(value = "page", required = false, defaultValue = "0") Optional<Integer> page,
                       @RequestParam(value = "pageSize", required = false, defaultValue = "9") Optional<Integer> pageSize,
                       @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") Optional<String> sortBy,
                       @Nullable @CurrentUser User user);

    @PostMapping("/add")
    HttpEntity<?> add(@RequestBody T t, @Nullable @CurrentUser User user);
    @PutMapping("/edit")
    HttpEntity<?> edit(@Valid @RequestBody T t, @Nullable @CurrentUser User user);
    @PostMapping("/delete/{id}")
    HttpEntity<?> delete(@Valid @PathVariable Integer id, @Nullable @CurrentUser User user);

    @GetMapping("/one/{id}")
    HttpEntity<?> one(@Valid @PathVariable Integer id, @Nullable @CurrentUser User user);

}
