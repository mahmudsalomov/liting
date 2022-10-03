package uz.neft.liting.metrics;

import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/metric")
public class MetricController {
    private final MetricService metricService;

    public MetricController(MetricService metricService) {
        this.metricService = metricService;
    }

    @GetMapping("/all/{year}")
    public List<Metric> all(@Nullable @PathVariable Integer year){
        return metricService.all(year!=null? Integer.valueOf(year - 1900) :year);
    }

}
