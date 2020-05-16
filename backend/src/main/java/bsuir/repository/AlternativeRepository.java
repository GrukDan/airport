package bsuir.repository;

import bsuir.model.Alternative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlternativeRepository extends JpaRepository<Alternative,Long> {

    Alternative findTopByOrderByIdAlternativeDesc();

    List<Alternative> findByTask(long task);
}
