package bsuir.controller;

import bsuir.model.Alternative;
import bsuir.service.AlternativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alternatives")
public class AlternativeController {

    @Autowired
    private AlternativeService alternativeService;

    @RequestMapping(method = RequestMethod.POST)
    public Alternative save(@RequestBody Alternative alternative){
        return alternativeService.save(alternative);
    }


}
