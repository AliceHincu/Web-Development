package exam.springlogin.service;

import exam.springlogin.domain.AppUser;
import exam.springlogin.domain.FileC;
import exam.springlogin.repo.FilesRepo;
import exam.springlogin.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional
//if you have transactional, when you update an entity in a rel with another
// you don't have to save it to repo bcs transactional will do that for you
//, UserDetailsService
public class UserService implements IUserService {
    private final UserRepo userRepo;
    private final FilesRepo filesRepo;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public AppUser getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<FileC> getFiles(Integer userId) {
        return filesRepo.findByUserId(userId);
    }

    @Override
    public AppUser saveUser(AppUser user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Page<FileC> getFilesWithPagination(int offset, int pageSize) {
        return filesRepo.findAll(PageRequest.of(offset, pageSize));
    }

}
