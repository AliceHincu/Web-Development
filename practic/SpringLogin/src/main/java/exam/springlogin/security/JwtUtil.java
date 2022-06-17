package exam.springlogin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;


@Service
public class JwtUtil {
    private static final int expireInMs = 1000 * 60 * 1000;
    private final static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generate(String userId, String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuer("localhost:8080")
                .setExpiration(new Date(System.currentTimeMillis() + expireInMs))
                .claim("userId", userId)
                .signWith(key)
                .compact();
    }
    public boolean validate(String token) {
        return getUserId(token) != null && isExpired(token);
    }

    public String getUserId(String token) {
        Claims claims = getClaims(token);
        return (String) claims.get("userId");
    }

    public String getUsername(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public boolean isExpired(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration().after(new Date(System.currentTimeMillis()));
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}
