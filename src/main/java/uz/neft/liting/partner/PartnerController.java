package uz.neft.liting.partner;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

@RestController
@RequestMapping("api/partner")
public class PartnerController implements RestCrud<PartnersComment> {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return partnerService.all().response();
    }

    @Override
    public HttpEntity<?> add(PartnersComment partnersComment, User user) {
        return partnerService.add(partnersComment).response();
    }

    @Override
    public HttpEntity<?> edit(PartnersComment partnersComment, User user) {
        return partnerService.edit(partnersComment).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return partnerService.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return partnerService.one(id).response();
    }
}

