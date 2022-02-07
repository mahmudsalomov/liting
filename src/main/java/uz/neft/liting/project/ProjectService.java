package uz.neft.liting.project;

import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public ApiResponse add(ProjectEntity project){
        try {
            if (project.getTitle() == null) return Payload.badRequest("text yozilmadi");
            project=repository.save(project);
            return Payload.ok("saqlandi");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.badRequest("xatolik yuz berdi");
        }
    }
    public ApiResponse edit(ProjectEntity projectEntity){
        try {
            if (projectEntity.getId()==null) return Payload.badRequest("id yozilmadi");
            Optional<ProjectEntity> project = repository.findById(projectEntity.getId());
            if (project.isPresent()){
                ProjectEntity entity = project.get();
                entity.edit(projectEntity);
                repository.save(entity);
            }
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("xotilik yuz berdi");
        }
        return Payload.ok("uzgardi", projectEntity);
    }
    public ApiResponse all(){
        try {
            List<ProjectEntity> all = repository.findAll();
            return Payload.ok(all);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("xatolik yuz berdi");
        }
    }
    public ApiResponse one(Integer id){
        if (id == null) return Payload.badRequest("id yuq");
        Optional<ProjectEntity> one = repository.findById(id);
        if (!one.isPresent()) return Payload.conflict("xech nima topilmadi");
        return Payload.ok("topildi", one.get());
    }
    public ApiResponse delete(Integer id){
        try{
            if (id == null) return Payload.badRequest("id yuq");
            repository.deleteById(id);
            return Payload.ok("o'chirildi");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("xatolik yuz berdi");
        }
    }
}
