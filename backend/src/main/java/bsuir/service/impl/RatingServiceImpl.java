package bsuir.service.impl;

import bsuir.model.Rating;
import bsuir.repository.RatingRepository;
import bsuir.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

@Autowired
private RatingRepository ratingRepository;

    @Override
    public List<Rating> saveRatings(List<Rating> ratings) {
        return null;
    }

    @Override
    public List<Rating> deleteByTaskAndExpert(long taskId, long expertId) {
        return null;
    }

    @Override
    public List<Rating> getByTaskAndExpert(long taskId, long expert) {
        return null;
    }
}
