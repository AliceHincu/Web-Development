package exam.springlogin.api;

import exam.springlogin.domain.AppUser;
import exam.springlogin.domain.FileC;
import exam.springlogin.dtos.FilesResponse;
import exam.springlogin.dtos.LoginRequest;
import exam.springlogin.dtos.LoginResponse;
import exam.springlogin.security.JwtUtil;
import exam.springlogin.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.stream.Collectors;

@RestController @RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder encoder;

    @GetMapping("/user")
    public ResponseEntity<String> getUser(){
        return ResponseEntity.ok().body("works");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        authenticationManager.authenticate(token);

        AppUser user = userService.getUser(request.getUsername());
        if (encoder.matches(request.getPassword(), user.getPassword())){
            String jwtToken = jwtUtil.generate(user.getId().toString(), user.getUsername());
            return ResponseEntity.ok(new LoginResponse(jwtToken));
        }
        return ResponseEntity.ok(new LoginResponse(""));
    }

    @GetMapping("/files")
    public ResponseEntity<FilesResponse> getFiles(@RequestParam Integer userId,
                                                  @RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "5") Integer pageSize){
        //return actorService.getActorsWithPagination(pageNo, pageSize);
        Page<FileC> pageF = userService.getFilesWithPagination(page, pageSize);
        int count = userService.getFiles(userId).size();
        int pag = (count/5)+1;
        return ResponseEntity.ok(new FilesResponse(pageF.stream().collect(Collectors.toList()), pag));

    }
}
