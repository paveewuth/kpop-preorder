package main.java.com.example.kpopshop.controller;

import com.example.kpopshop.model.Product;
import com.example.kpopshop.service.KpopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kpop")
public class KpopController {

    @Autowired
    private KpopService service;

    // Service 1: สมัครสมาชิก
    @PostMapping("/register")
    public String register(@RequestParam String username) {
        return service.registerUser(username);
    }

    // Service 2: Pre-order
    @PostMapping("/preorder")
    public String preorder(@RequestParam String username, @RequestParam String album) {
        return service.preorder(username, album);
    }

    // Service 3: ขอข้อมูลสินค้าทั้งหมด
    @GetMapping("/products")
    public List<Product> getProducts() {
        return service.getAllProducts();
    }

    // Service 4: ขอ tracking number
    @GetMapping("/tracking")
    public String getTracking(@RequestParam String username, @RequestParam String album) {
        return service.getTrackingNumber(username, album);
    }
}
