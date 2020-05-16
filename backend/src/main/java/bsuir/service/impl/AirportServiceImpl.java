package bsuir.service.impl;

import bsuir.model.Airport;
import bsuir.model.City;
import bsuir.model.Country;
import bsuir.model.viewModel.AirportViewModel;
import bsuir.repository.AirportRepository;
import bsuir.repository.CityRepository;
import bsuir.repository.CountryRepository;
import bsuir.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AirportServiceImpl implements AirportService {

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public Airport save(Airport airport) {
        return airportRepository.save(airport);
    }

    @Override
    public void delete(long id) {
        airportRepository.deleteById(id);
    }

    @Override
    public List<AirportViewModel> getAllAirportViewModel() {
        List<Airport> airports = airportRepository.findAll();
        List<AirportViewModel> airportViewModels = new ArrayList<>();
        airports.stream().forEach(airport -> airportViewModels.add(new AirportViewModel(airport)));
        setCityNameAndCountryId(airportViewModels);
        setCountryName(airportViewModels);
        return airportViewModels;
    }

    private List<AirportViewModel> setCityNameAndCountryId(List<AirportViewModel> airportViewModels) {
        if (airportViewModels != null && airportViewModels.size() > 0) {
            List<City> cities = cityRepository.findAll();
            for (City city : cities) {
                airportViewModels.stream()
                        .filter(airportViewModel -> airportViewModel.getIdCity() == city.getIdCity())
                        .forEach(airportViewModel -> {
                            airportViewModel.setIdCountry(city.getCountry());
                            airportViewModel.setCity(city.getCity());
                        });
            }
        }
        return airportViewModels;
    }

    private List<AirportViewModel> setCountryName(List<AirportViewModel> airportViewModels) {
        if (airportViewModels != null && airportViewModels.size() > 0) {
            List<Country> countries = countryRepository.findAll();
            for (Country country:countries) {
                airportViewModels.stream()
                        .filter(airportViewModel -> airportViewModel.getIdCountry() == country.getIdCountry())
                        .forEach(airportViewModel -> airportViewModel.setCountry(country.getCountry()));
            }
        }
        return airportViewModels;
    }

    @Override
    public List<AirportViewModel> getAirportViewModelsByIdIn(List<Long> airportsId) {
        List<Airport> airports = airportRepository.findByIdAirportIn(airportsId);
        List<AirportViewModel> airportViewModels = new ArrayList<>();
        airports.stream().forEach(airport -> airportViewModels.add(new AirportViewModel(airport)));
        setCityNameAndCountryId(airportViewModels);
        setCountryName(airportViewModels);
        return airportViewModels;
    }
}
