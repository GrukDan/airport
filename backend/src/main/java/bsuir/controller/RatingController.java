package bsuir.controller;


import bsuir.model.Rating;
import bsuir.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;


    @RequestMapping(method = RequestMethod.PUT)
    public List<Rating> saveRatings(@RequestBody List<Rating> ratings){
        return ratingService.saveRatings(ratings);
    }

    @RequestMapping(value = "/delete-by-task-expert",method = RequestMethod.DELETE)
    public List<Rating> deleteRatingsByTaskAndExpert(
            @RequestParam("task")long taskId,
            @RequestParam("expert") long expertId){
        return ratingService.deleteByTaskAndExpert(taskId,expertId);
    }

    @RequestMapping(value = "/all-by-task-expert",method = RequestMethod.GET)
    public List<Rating> getByTaskAndExpert(
            @RequestParam("task")long taskId,
            @RequestParam("expert") long expert){
        return ratingService.getByTaskAndExpert(taskId,expert);
    }
}
