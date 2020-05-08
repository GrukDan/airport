package bsuir.service;

import bsuir.model.City;

import java.util.List;

public interface CityService {
    City save(City city);

    void delete(long id);

    List<City> getAll();

    List<City> getByCountry(long country);

    City getById(long id);

}
