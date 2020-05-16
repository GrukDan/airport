package bsuir.controller;


import bsuir.model.Alternative;
import bsuir.model.Rating;
import bsuir.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;


    @RequestMapping(method = RequestMethod.PUT)
    public List<Rating> saveRatings(@RequestBody List<Rating> ratings) {
        return ratingService.saveRatings(ratings);
    }

    @RequestMapping(value = "/delete-by-task-expert", method = RequestMethod.DELETE)
    public List<Rating> deleteRatingsByTaskAndExpert(
            @RequestParam("task") long taskId,
            @RequestParam("expert") long expertId) {
        return ratingService.deleteByTaskAndExpert(taskId, expertId);
    }

    @RequestMapping(value = "/by-user-alternatives", method = RequestMethod.POST)
    public List<Rating> getByUserAndAlternatives(
            @RequestBody List<Long> alternativesId,
            @RequestParam("idUser") long idUser) {
        return ratingService.getByUserAndAlternatives(idUser, alternativesId);
    }

    @RequestMapping(value = "/by-experts-and-alternatives", method = RequestMethod.POST)
    public List<Rating> getRatingsByExpertsAndAlternatives(
            @RequestParam("alternatives") List<Long> alternativesId,
            @RequestBody List<Long> expertsId) {
        return ratingService.getRatingsByExpertsAndAlternatives(expertsId, alternativesId);
    }

    @RequestMapping(value = "/by-alternatives", method = RequestMethod.POST)
    public List<Rating> getRatingsByAlternatives(@RequestBody List<Long> alternativesId) {
        return ratingService.getRatingsByAlternatives(alternativesId);
    }

    @RequestMapping(value = "/solution", method = RequestMethod.POST)
    public Map<Long, Double> getSolution(@RequestParam("experts") List<Long> experts,
                                         @RequestBody List<Long> alternativesId) {
        return ratingService.getSolution(experts, alternativesId);
    }
}
