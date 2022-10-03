package uz.neft.liting.metrics;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Month;
import java.util.List;
import java.util.Optional;

public interface MetricRepository extends JpaRepository<Metric,Integer> {
    List<Metric> findAllByYear(int year);
    List<Metric> findAllByMonth(Month month);
    Optional<Metric> findByYearAndMonth(int year, Month month);

}
