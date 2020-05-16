package bsuir.service;

import bsuir.model.Airport;
import bsuir.model.viewModel.AirportViewModel;

import java.util.List;

public interface AirportService {
    Airport save(Airport airport);

    void delete(long id);

    List<AirportViewModel> getAllAirportViewModel();

    List<AirportViewModel> getAirportViewModelsByIdIn(List<Long> airportsId);
}
