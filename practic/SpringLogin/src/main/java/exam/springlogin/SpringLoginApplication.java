package exam.springlogin;

import exam.springlogin.domain.AppUser;
import exam.springlogin.domain.FileC;
import exam.springlogin.service.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SpringLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLoginApplication.class, args);
    }

//    @Bean
//    CommandLineRunner run(IUserService userService){
//        return args -> {
//            userService.saveUser(new AppUser(1, "amalia", "amalia", null));
//        };
//    }

    @Bean
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
