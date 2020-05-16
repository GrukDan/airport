package bsuir.repository;

import bsuir.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirportRepository extends JpaRepository<Airport,Long> {

    List<Airport> findByIdAirportIn(List<Long> idAirport);
}
