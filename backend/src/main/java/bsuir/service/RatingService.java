package bsuir.service;

import bsuir.model.Rating;

import java.util.List;
import java.util.Map;

public interface RatingService {
    List<Rating> saveRatings(List<Rating> ratings);

    List<Rating> deleteByTaskAndExpert(long taskId, long expertId);

    List<Rating> getByTaskAndExpert(long taskId, long expert);

    List<Rating> getByUserAndAlternatives(long idUser, List<Long> alternativesId);

    List<Rating> getRatingsByExpertsAndAlternatives(List<Long> expertsId, List<Long> alternativesId);

    List<Rating> getRatingsByAlternatives(List<Long> alternativesId);

    Map<Long, Double> getSolution(List<Long> experts, List<Long> alternativesId);
}
