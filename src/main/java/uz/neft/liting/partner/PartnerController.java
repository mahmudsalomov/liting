package uz.neft.liting.partner;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;

@RestController
@RequestMapping("api/partner")
public class PartnerController implements RestCrud<PartnersComment.PartnerDto> {

    private final PartnerService partnerService;

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return null;
    }

    @Override
    public HttpEntity<?> add(PartnersComment.PartnerDto partnerDto, User user) {
        return null;
    }

    @Override
    public HttpEntity<?> edit(PartnersComment.PartnerDto partnerDto, User user) {
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
