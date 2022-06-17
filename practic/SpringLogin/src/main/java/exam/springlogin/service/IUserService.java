package exam.springlogin.service;

import exam.springlogin.domain.AppUser;
import exam.springlogin.domain.FileC;
import org.springframework.data.domain.Page;

import java.io.File;
import java.util.List;

public interface IUserService {
    AppUser getUser(String username);
    List<FileC> getFiles(Integer userId);
    AppUser saveUser(AppUser user);

    Page<FileC> getFilesWithPagination(int offset, int pageSize);
}
