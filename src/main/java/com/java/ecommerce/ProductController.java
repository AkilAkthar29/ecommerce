package com.java.ecommerce;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    private final List<Map<String, Object>> products = new ArrayList<>();

    public ProductController() {
        // Each product has name, description, price, and image
        products.add(Map.of(
                "id", 1,
                "name", "Apple iPhone 15",
                "description", "Powerful A16 chip, 48MP camera, and smooth design.",
                "price", "₹79,900",
                "imageUrl", "/images/iphone15.jpg"
        ));
        products.add(Map.of(
                "id", 2,
                "name", "Samsung Galaxy S24",
                "description", "Dynamic AMOLED display and AI-enhanced performance.",
                "price", "₹74,999",
                "imageUrl", "/images/galaxy-s24.jpg"
        ));
        products.add(Map.of(
                "id", 3,
                "name", "Sony Headphones",
                "description", "Noise cancellation and deep bass audio experience.",
                "price", "₹12,999",
                "imageUrl", "/images/headphones.jpg"
        ));
        products.add(Map.of(
                "id", 4,
                "name", "HP Laptop 15s",
                "description", "Intel i5, 8GB RAM, 512GB SSD, perfect for students.",
                "price", "₹58,990",
                "imageUrl", "/images/laptop.jpg"
        ));
        products.add(Map.of(
                "id", 5,
                "name", "Smart Watch Pro",
                "description", "Track health, fitness, and get notifications instantly.",
                "price", "₹5,999",
                "imageUrl", "/images/watch.jpg"
        ));
        products.add(Map.of(
                "id", 6,
                "name", "Canon DSLR Camera",
                "description", "24.1MP APS-C sensor with Wi-Fi and Bluetooth.",
                "price", "₹42,499",
                "imageUrl", "/images/camera.jpg"
        ));
        products.add(Map.of(
                "id", 7,
                "name", "Apple MacBook Air M2",
                "description", "Blazing-fast M2 chip, 13.6-inch Liquid Retina display.",
                "price", "₹1,24,900",
                "imageUrl", "/images/macbook.jpg"
        ));
        products.add(Map.of(
                "id", 8,
                "name", "JBL Bluetooth Speaker",
                "description", "Portable, waterproof, and deep bass performance.",
                "price", "₹4,499",
                "imageUrl", "/images/speaker.jpg"
        ));
        products.add(Map.of(
                "id", 9,
                "name", "Gaming Keyboard RGB",
                "description", "Mechanical keys with dynamic RGB lighting.",
                "price", "₹2,199",
                "imageUrl", "/images/keyboard.jpg"
        ));
        products.add(Map.of(
                "id", 10,
                "name", "Logitech Mouse M330",
                "description", "Silent wireless mouse with long battery life.",
                "price", "₹1,199",
                "imageUrl", "/images/mouse.jpg"
        ));
    }

    @GetMapping("/products")
    public List<Map<String, Object>> getAllProducts() {
        return products;
    }

    @GetMapping("/products/{id}")
    public Object getProductById(@PathVariable int id) {
        return products.stream()
                .filter(p -> (int) p.get("id") == id)
                .findFirst()
                .orElse(Map.of("error", "Product not found"));
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return Map.of(
                "totalProducts", products.size(),
                "message", "Backend running smoothly!"
        );
    }
}
