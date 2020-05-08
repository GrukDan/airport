package bsuir.controller;


import bsuir.model.Country;
import bsuir.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @RequestMapping(value = "/get-all",method = RequestMethod.GET)
    public List<Country> getAll(){
        return countryService.getAll();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Country save(@RequestBody Country country){
        return countryService.save(country);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Country update(@RequestBody Country country){
        return countryService.update(country);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Country getById(@RequestParam("id") long id){
        return  countryService.getById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("id") long id){
        countryService.delete(id);
    }
}
