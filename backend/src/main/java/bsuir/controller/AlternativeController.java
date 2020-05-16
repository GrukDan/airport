package bsuir.controller;

import bsuir.model.Alternative;
import bsuir.service.AlternativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alternatives")
public class AlternativeController {

    @Autowired
    private AlternativeService alternativeService;

    @RequestMapping(method = RequestMethod.POST)
    public Alternative save(@RequestBody Alternative alternative){
        return alternativeService.save(alternative);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public boolean saveAlternatives(@RequestBody List<Alternative> alternatives){
        int count = 0;
        for(Alternative alternative:alternatives){
            count++;
            alternativeService.save(alternative);
        }
        return count == alternatives.size();
    }


    @RequestMapping(value = "/by-task",method = RequestMethod.GET)
    public List<Alternative> getAlternativesByTask(@RequestParam("idTask") long idTask){
        return alternativeService.getAlternativesByTask(idTask);
    }
}
