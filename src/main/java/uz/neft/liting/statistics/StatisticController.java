package uz.neft.liting.statistics;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.neft.liting.template.RestCrud;
import uz.neft.liting.user.User;

import java.util.Optional;
@RestController
@RequestMapping("api/statistics")
public class StatisticController implements RestCrud<Statistic> {

    private final StatisticService statisticService;

    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @Override
    public HttpEntity<?> all(Optional<Integer> page, Optional<Integer> pageSize, Optional<String> sortBy) {
        return statisticService.all().response();
    }

    @Override
    public HttpEntity<?> add(Statistic statistic, User user) {
        return statisticService.add(statistic).response();
    }

    @Override
    public HttpEntity<?> edit(Statistic statistic, User user) {
        return statisticService.edit(statistic).response();
    }

    @Override
    public HttpEntity<?> delete(Integer id, User user) {
        return statisticService.delete(id).response();
    }

    @Override
    public HttpEntity<?> one(Integer id) {
        return statisticService.one(id).response();
    }
}
