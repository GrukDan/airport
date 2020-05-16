package bsuir.service.impl;

import bsuir.model.Country;
import bsuir.repository.CountryRepository;
import bsuir.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<Country> getAll() {
        return countryRepository.findAll();
    }

    @Override
    public Country save(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Country update(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Country getById(long id) {
        return countryRepository.getOne(id);
    }

    @Override
    public void delete(long id) {
        countryRepository.deleteById(id);
    }
}
