package bsuir.service;

import bsuir.model.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> saveRatings(List<Rating> ratings);

    List<Rating> deleteByTaskAndExpert(long taskId, long expertId);

    List<Rating> getByTaskAndExpert(long taskId, long expert);
}
