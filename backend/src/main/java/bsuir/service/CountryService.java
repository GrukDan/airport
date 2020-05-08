package bsuir.service;

import bsuir.model.Country;

import java.util.List;

public interface CountryService {
    List<Country> getAll();


    Country save(Country country);

    Country update(Country country);

    Country getById(long id);

    void delete(long id);

}
