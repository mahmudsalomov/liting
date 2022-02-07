package uz.neft.liting.partner;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PartnerService{

    private final PartnerRepository partnerRepository;

    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    public ApiResponse add(PartnersComment partnersComment) {
        try {
            if (partnersComment.getName()==null|| Objects.equals(partnersComment.getName(), "")) return Payload.badRequest("Name bo'sh bo'lmasligi kerak");
            partnersComment=partnerRepository.save(partnersComment);
            return Payload.ok("Saqlandi",partnersComment);
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("Berilgan obyekt xato");
        }
    }

    public ApiResponse edit(PartnersComment partnersComment){
        try {
            if (partnersComment.getId()==null) return Payload.badRequest("id berilmadi");

            Optional<PartnersComment> partOptional = partnerRepository.findById(partnersComment.getId());
            if (partOptional.isPresent()){
                PartnersComment partComBaza=partOptional.get();
                partComBaza.edit(partnersComment);
                partnerRepository.save(partComBaza);
            }

        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict("berilgan type xato");
        }
        return Payload.ok("joyida", partnersComment);
    }

    public ApiResponse one(Integer id){
        Optional<PartnersComment> one = partnerRepository.findById(id);
        if (!one.isPresent()) return Payload.notFound();
        return Payload.ok(one.get());
    }

    public ApiResponse delete(Integer id) {
        try {
            partnerRepository.deleteById(id);
            return Payload.ok("Uchib kettiku");
        } catch (Exception e) {
            e.printStackTrace();
            return Payload.ok("Error in deleting Constant", e);
        }
    }

    public ApiResponse all() {
        try {
            List<PartnersComment> all = partnerRepository.findAll();
            return Payload.ok(all);
        } catch (Exception e) {
            e.printStackTrace();
            return Payload.ok("toppaku", e);
        }
    }
}
