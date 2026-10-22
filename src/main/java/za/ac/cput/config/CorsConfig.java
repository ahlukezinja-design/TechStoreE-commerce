/* CORS Configuration – allows React frontend on port 3000
 * Author: Pertunia Sifunda (221692568)
 */
package za.ac.cput.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * CorsConfig – allows the React frontend (localhost:3000)
 * to call the Spring Boot REST API (localhost:8080).
 * Covers /api/** and other controller base paths (cart, payment, delivery).
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        source.registerCorsConfiguration("/shopping-cart/**", config);
        source.registerCorsConfiguration("/payment-details/**", config);
        source.registerCorsConfiguration("/delivery/**", config);
        source.registerCorsConfiguration("/uploads/**", config);

        return new CorsFilter(source);
    }
}
