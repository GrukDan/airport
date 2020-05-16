package bsuir.controller;


import bsuir.model.Airport;
import bsuir.model.viewModel.AirportViewModel;
import bsuir.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airports")
public class AirportController {
    
    @Autowired
    private AirportService airportService;
    
    @RequestMapping(method = RequestMethod.POST)
    public Airport save(@RequestBody Airport airport){
        return airportService.save(airport);
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("id") long id){
        airportService.delete(id);
    }
    
    @RequestMapping(value = "/get-all",method = RequestMethod.GET)
    public List<AirportViewModel> getAllAirportViewModel(){
        return airportService.getAllAirportViewModel();
    }

    @RequestMapping(value = "/view-models-by-id",method = RequestMethod.POST)
    public List<AirportViewModel> getAirportViewModelsByIdIn(@RequestBody List<Long> airportsId){
        return airportService.getAirportViewModelsByIdIn(airportsId);
    }
}
