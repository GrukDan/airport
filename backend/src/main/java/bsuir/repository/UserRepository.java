package bsuir.repository;

import bsuir.model.User;
import bsuir.model.viewModel.UserViewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByLoginAndPassword(String login, String password);

    List<User> findByRole(long i);

    List<User> findByIdUserIn(List<Long> idUser);

    List<User> findByAssessmentTask(long assessmentTask);
}
