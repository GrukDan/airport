package bsuir.service.impl;

import bsuir.model.Rating;
import bsuir.preferenceMethod.PreferenceMethod;
import bsuir.repository.RatingRepository;
import bsuir.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private PreferenceMethod preferenceMethod;

    @Override
    public List<Rating> saveRatings(List<Rating> ratings) {
        return ratingRepository.saveAll(ratings);
    }


    @Override
    public List<Rating> deleteByTaskAndExpert(long taskId, long expertId) {
        return null;
    }

    @Override
    public List<Rating> getByTaskAndExpert(long taskId, long expert) {
        return null;
    }

    @Override
    public List<Rating> getByUserAndAlternatives(long idUser, List<Long> alternativesId) {
        return ratingRepository.findByExpertAndAlternativeIn(idUser, alternativesId);
    }

    @Override
    public List<Rating> getRatingsByExpertsAndAlternatives(List<Long> expertsId, List<Long> alternativesId) {
        return ratingRepository.findByExpertInAndAlternativeIn(expertsId,alternativesId);
    }

    @Override
    public List<Rating> getRatingsByAlternatives(List<Long> alternativesId) {
        return ratingRepository.findByAlternativeIn(alternativesId);
    }

    @Override
    public Map<Long, Double> getSolution(List<Long> experts, List<Long> alternativesId) {
        List<Rating> ratings = ratingRepository.findByExpertInAndAlternativeIn(experts,alternativesId);
        double[][] preferenceMatrix = new double[experts.size()][alternativesId.size()];
        for(int i = 0;i<preferenceMatrix.length;i++){
            for(int j =0;j<preferenceMatrix[0].length;j++){
                int finalJ = j;
                int finalI = i;
                ratings.stream()
                        .filter(rating -> {
                            return rating.getExpert() == experts.get(finalJ) && rating.getAlternative() == alternativesId.get(finalJ);
                        })
                        .forEach(rating -> preferenceMatrix[finalI][finalJ] = rating.getRating());
            }
        }
        return preferenceMethod.getSolution(preferenceMatrix,alternativesId);
    }
}
