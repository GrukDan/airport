package bsuir.controller;


import bsuir.model.City;
import bsuir.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

@Autowired
    private CityService cityService;

@RequestMapping(method = RequestMethod.POST)
    public City save(@RequestBody City city){
    return cityService.save(city);
}

@RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("id") long id){
    cityService.delete(id);
}

@RequestMapping(value = "/get-all",method = RequestMethod.GET)
    public List<City> getAll(){
    return cityService.getAll();
}

@RequestMapping(value = "/get-by-country",method = RequestMethod.GET)
    public List<City> getByCountry(@RequestParam("country") long country){
    return cityService.getByCountry(country);
}

@RequestMapping(method = RequestMethod.GET)
    public City getById(@RequestParam("id") long id){
    return cityService.getById(id);
}

}
