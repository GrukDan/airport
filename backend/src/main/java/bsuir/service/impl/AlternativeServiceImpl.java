package bsuir.service.impl;

import bsuir.model.Alternative;
import bsuir.repository.AlternativeRepository;
import bsuir.service.AlternativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlternativeServiceImpl implements AlternativeService {

    @Autowired
    private AlternativeRepository alternativeRepository;

    @Override
    public Alternative save(Alternative alternative) {
        return alternativeRepository.save(alternative);
    }
}
