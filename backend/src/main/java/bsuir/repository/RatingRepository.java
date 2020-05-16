package bsuir.repository;

import bsuir.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findByExpertAndAlternativeIn(long expert, List<Long> alternative);

    List<Rating> findByExpertInAndAlternativeIn(List<Long> experts, List<Long> alternative);

    List<Rating> findByAlternativeIn(List<Long> alternativesId);
}
