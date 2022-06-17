package exam.springlogin.repo;

import exam.springlogin.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AppUser, Integer> {
    AppUser findByUsernameAndPassword(String username, String password);
    AppUser findByUsername(String username);
}
