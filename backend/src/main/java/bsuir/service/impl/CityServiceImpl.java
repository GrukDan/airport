package bsuir.service.impl;

import bsuir.model.City;
import bsuir.repository.CityRepository;
import bsuir.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public City save(City city) {
        return cityRepository.save(city);
    }

    @Override
    public void delete(long id) {
        cityRepository.deleteById(id);
    }

    @Override
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @Override
    public List<City> getByCountry(long country) {
        return cityRepository.findByCountry(country);
    }

    @Override
    public City getById(long id) {
        return null;
    }
}
