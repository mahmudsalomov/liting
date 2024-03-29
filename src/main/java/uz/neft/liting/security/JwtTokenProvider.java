package uz.neft.liting.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import uz.neft.liting.user.User;

import java.util.Date;


@Component
public class JwtTokenProvider {
    @Value("${app.jwtSecret}")
    private String secretKey;

    public String generateToken(User user) {
        Date date = new Date();
        long tokenExpireTime = 604800000L;
        long l = date.getTime() + tokenExpireTime;
        Date expireDate = new Date(l);

        return Jwts
                .builder()
                .setSubject(user.getId().toString())
//                .setSubject(user.getPassword())
                .setIssuedAt(date)
                .claim("fio",user.getFio())
                .claim("roles", user.getRoles())
                .claim("pass",user.getPassword())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }


    public boolean validateToken(String token) {
        try {
            Jwts
                    .parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.err.println("Muddati o'tgan");
        } catch (MalformedJwtException malformedJwtException) {
            System.out.println(token);
            System.err.println("Buzilgan token");
        } catch (SignatureException s) {
            System.err.println("Kalit so'z xato");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            System.err.println("Qo'llanilmagan token");
        } catch (IllegalArgumentException ex) {
            System.err.println("Bo'sh token");
        }
        return false;
    }


    public String getUserIdFromToken(String token) {
        return Jwts
                .parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getUserPassFromToken(String token) {
        return Jwts
                .parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .get("pass",String.class);
    }

}
