package bsuir.service;

import bsuir.model.Alternative;

import java.util.List;

public interface AlternativeService {
    Alternative save(Alternative alternative);

    boolean saveAlternatives(List<Alternative> alternatives);

    List<Alternative> getAlternativesByTask(long idTask);
}
