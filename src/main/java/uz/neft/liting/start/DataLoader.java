package uz.neft.liting.start;
//lord

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.neft.liting.user.*;


import java.util.Collections;

@Component
@NoArgsConstructor
public class DataLoader implements CommandLineRunner {


    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public void run(String... args) throws Exception {
//        if (mode.equals("always")) {
        try {
            Role admin = roleRepository.save(new Role(RoleName.ADMIN));
            Role moderator = roleRepository.save(new Role(RoleName.MODERATOR));
            Role user = roleRepository.save(new Role(RoleName.USER));

            userRepository.save(
                    User
                            .builder()
                            .active(true)
                            .email("admin")
                            .password(passwordEncoder.encode("admin"))
                            .fio("admin")
                            .phone("+998993793877")
                            .roles(Collections.singleton(admin))
                            .username("admin")
                            .build()
            );
            userRepository.save(
                    User
                            .builder()
                            .active(true)
                            .email("moderator")
                            .password(passwordEncoder.encode("moderator"))
                            .fio("moderator")
                            .phone("+998993793877")
                            .roles(Collections.singleton(moderator))
                            .username("moderator")
                            .build()
            );

            userRepository.save(
                    User
                            .builder()
                            .active(true)
                            .email("user")
                            .password(passwordEncoder.encode("user"))
                            .fio("user")
                            .phone("+998993793877")
                            .roles(Collections.singleton(user))
                            .username("user")
                            .build()
            );




        } catch (Exception e) {
            e.printStackTrace();
        }



    }
}


