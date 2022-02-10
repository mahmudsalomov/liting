package uz.neft.liting.controller;

import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.stereotype.Controller
public class LoginLogoutController {

    @RequestMapping("/login")
    public String main() {
        return "admin/login";
    }
}
