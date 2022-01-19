package uz.neft.liting.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.neft.liting.user.User;


@RestController
@Controller
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

//    @Autowired
//    private Converter converter;
    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody SignIn signIn){
        ResToken resToken=authService.signIn(signIn);
        return ResponseEntity.status(resToken!=null?200:401).body(resToken);
    }


//    @GetMapping("/test")
//    public HttpEntity<?> test(){
//        return ResponseEntity.ok(converter.apiSuccess());
//    }

    @GetMapping("/me")
    public HttpEntity<?> me(@CurrentUser User user){
        if (user!=null){
            return ResponseEntity.ok(user.getFio());
        }else return null;
    }

}
