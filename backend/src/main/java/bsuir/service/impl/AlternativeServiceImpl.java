package bsuir.service.impl;

import bsuir.model.Alternative;
import bsuir.repository.AlternativeRepository;
import bsuir.service.AlternativeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlternativeServiceImpl implements AlternativeService {

    @Autowired
    private AlternativeRepository alternativeRepository;

    @Override
    public Alternative save(Alternative alternative) {
        Alternative alt = alternativeRepository.findTopByOrderByIdAlternativeDesc();
        if (alt == null) {
            alternative.setIdAlternative(1);
        } else
            alternative.setIdAlternative(alt.getIdAlternative() + 1);
        alternativeRepository.save(alternative);
        return alternative;
    }

    @Override
    public List<Alternative> getAlternativesByTask(long idTask) {
        return alternativeRepository.findByTask(idTask);
    }

    @Override
    public boolean saveAlternatives(List<Alternative> alternatives) {
        return alternativeRepository.saveAll(alternatives).size() == alternatives.size();
    }
}
