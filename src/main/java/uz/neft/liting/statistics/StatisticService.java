package uz.neft.liting.statistics;

import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;

import java.util.Optional;

@Service
public class StatisticService {

    private final StatisticRepository statisticRepository;

    public StatisticService(StatisticRepository statisticRepository) {
        this.statisticRepository = statisticRepository;
    }


    public ApiResponse all() {
        try {
            return Payload.ok(statisticRepository.findAll());
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse add(Statistic statistic) {
        try {
            if (statistic.getId()!=null) return Payload.badRequest();
            statisticRepository.save(statistic);
            return Payload.ok("Saved");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse edit(Statistic statistic) {
        try {
            if (statistic.getId()==null) return Payload.badRequest("Id is null!");
            statisticRepository.save(statistic);
            return Payload.ok("Successfully edited");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }



    public ApiResponse delete(Integer id) {
        try {
            statisticRepository.deleteById(id);
            return Payload.ok("Successfully deleted");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }
    }

    public ApiResponse one(Integer id) {
        Optional<Statistic> byId = statisticRepository.findById(id);
        return byId.map(Payload::ok).orElseGet(() -> Payload.notFound("Statistic not found!"));
    }
}
