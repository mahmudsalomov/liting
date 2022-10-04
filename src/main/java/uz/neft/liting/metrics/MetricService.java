package uz.neft.liting.metrics;

import org.springframework.stereotype.Service;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.user.User;

import java.time.Month;
import java.time.Year;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MetricService {
    private final MetricRepository metricRepository;

    public MetricService(MetricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }

    public void count(){
        try {
            Date date = new Date();

            Optional<Metric> metric = metricRepository.findByYearAndMonth(date.getYear(), Month.of(date.getMonth()+1));
            if (metric.isPresent()){
                metric.get().setCount(metric.get().getCount()+1);
                metricRepository.save(metric.get());
            } else {
                metricRepository.save(
                Metric
                        .builder()
                        .month(Month.of(date.getMonth()+1))
                        .year(date.getYear())
                        .count(1)
                        .build()
                );
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void count(User user){
        if(user==null) count();
    }


    public long month(int year, Month month){
        Optional<Metric> byYearAndMonth = metricRepository.findByYearAndMonth(year, month);
        return byYearAndMonth.map(Metric::getCount).orElse(0L);
    }
    public long month(int year, int month){
        return month(year,Month.of(month));
    }
    public long month(){
        Date date = new Date();
        return month(date.getYear(),date.getMonth());
    }

    public long annually(int year){
        List<Metric> allByYear = metricRepository.findAllByYearOrderByMonthDesc(year);
        long sum=0;
        for (Metric metric : allByYear) {
            sum+=metric.getCount();
        }
        return sum;
    }
    public long annually(){
        return annually(new Date().getYear());
    }

    public List<Metric> all(Integer year){
        if (year==null) year=new Date().getYear();
        List<Metric> allByYear = metricRepository.findAllByYearOrderByMonthDesc(year);
        for (Metric metric : allByYear) {
            metric.setYear(metric.getYear()+1900);
        }
        return allByYear;
    }
    public List<Metric> all(){
        return metricRepository.findAllByYearOrderByMonthDesc(new Date().getYear());
    }

}
