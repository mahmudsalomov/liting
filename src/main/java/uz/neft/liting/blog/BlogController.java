package uz.neft.liting.blog;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

@RestController
@RequestMapping("api/blog")
public class BlogController implements RestCrud<Blog.BlogDto> {

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return null;
    }

    @Override
    public HttpEntity<?> add(Blog.BlogDto blogDto, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> edit(Blog.BlogDto blogDto, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return null;
    }
}
