package uz.neft.liting.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.payload.Payload;
import uz.neft.liting.user.User;
import uz.neft.liting.user.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;

    private boolean isValid=false;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody SignIn signIn){
        ResToken resToken=authService.signIn(signIn);
        return ResponseEntity.status(resToken!=null?200:401).body(resToken);
    }



    @GetMapping("/me")
    public HttpEntity<?> me(@CurrentUser User user,HttpServletRequest request){
        System.out.println("PASSSSSSSSSSS : "+user.getPassword());
        String tokenClient = request.getHeader("Authorization").substring(7);
        String userPass= jwtTokenProvider.getUserPassFromToken(tokenClient);
//        if (!isValid){
            try {
//                Optional<User> byUsername = userRepository.findByUsername(user.getUsername());
                System.out.println("Match : ");
//                System.out.println(passwordEncoder.matches(user.getPassword(),byUsername.get().getPassword()));
//                if (!passwordEncoder.matches(user.getPassword(),byUsername.get().getPassword())) return Payload.unauthorized().response();
                System.out.println(userPass);
                System.out.println(user.getPassword());
//                boolean test= user.getPassword() == byUsername.get().getPassword();
                boolean test= Objects.equals(userPass, user.getPassword());
                System.out.println(test);
//                System.out.println(Objects.equals(user.getPassword(), byUsername.get().getPassword()));
                if (!test) return Payload.unauthorized().response();
//                if (!Objects.equals(user.getPassword(),byUsername.get().getPassword())) return Payload.unauthorized().response();
            }catch (Exception e){
                e.printStackTrace();
                return Payload.unauthorized().response();
            }
//        }

        System.out.println("Meeeeeeeeeeeee");
//            System.out.println(tokenClient);
        boolean b = jwtTokenProvider.validateToken(tokenClient);

        System.out.println(b);
        System.out.println(user);

        if (user!=null){
            return ResponseEntity.ok(user.getFio());
        }else return null;
//        return ResponseEntity.ok(true);
    }

    @GetMapping("/check")
    public boolean check(@CurrentUser User user,HttpServletRequest request){
//        System.out.println("Authorization = "+request.getHeader("Authorization"));
        try {
//            System.out.println("PASSSSSSSSSSS : "+user.getPassword());
            String tokenClient = request.getHeader("Authorization").substring(7);
//            System.out.println(tokenClient);
            System.out.println(jwtTokenProvider.validateToken(tokenClient));
//            System.out.println(user);
            return jwtTokenProvider.validateToken(tokenClient);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

}
