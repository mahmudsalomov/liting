package uz.neft.liting.project;

import org.springframework.http.HttpEntity;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

public class ProjectController implements RestCrud<ProjectEntity> {
    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }


    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return service.all().response();
    }

    @Override
    public HttpEntity<?> add(ProjectEntity projectEntity, User user) {
        return service.add(projectEntity).response();
    }

    @Override
    public HttpEntity<?> edit(ProjectEntity projectEntity, User user) {
        return service.edit(projectEntity).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return service.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return service.one(id).response();
    }
}
