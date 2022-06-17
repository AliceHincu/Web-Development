package exam.springlogin.repo;

import exam.springlogin.domain.FileC;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilesRepo extends JpaRepository<FileC, Integer> {
    List<FileC> findByUserId(Integer userId);
}
