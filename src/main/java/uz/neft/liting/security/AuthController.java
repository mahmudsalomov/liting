package uz.neft.liting.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.user.User;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody SignIn signIn){
        ResToken resToken=authService.signIn(signIn);
        return ResponseEntity.status(resToken!=null?200:401).body(resToken);
    }



    @GetMapping("/me")
    public HttpEntity<?> me(@CurrentUser User user){
        System.out.println(user);
        if (user!=null){
            return ResponseEntity.ok(user.getFio());
        }else return null;
//        return ResponseEntity.ok(true);
    }

    @GetMapping("/check")
    public boolean check(HttpServletRequest request){
//        System.out.println("Authorization = "+request.getHeader("Authorization"));
        try {
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
