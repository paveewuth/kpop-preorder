package main.java.com.example.kpopshop.service;

import com.example.kpopshop.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KpopService {
    private List<User> users = new ArrayList<>();
    private List<Order> orders = new ArrayList<>();
    private List<Product> products = List.of(
        new Product("BLACKPINK BORN PINK", 599.0),
        new Product("NCT DREAM ISTJ", 520.0),
        new Product("TWICE READY TO BE", 550.0)
    );

    public String registerUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setPromotionMessage("สมัครสำเร็จ! รับโปร 10% ทุกออเดอร์แรก 🎉");
        users.add(user);
        return user.getPromotionMessage();
    }

    public String preorder(String username, String album) {
        Order order = new Order();
        order.setUsername(username);
        order.setAlbum(album);
        order.setStatus("pre-ordered");
        order.setTrackingNumber(UUID.randomUUID().toString());
        orders.add(order);
        return "สั่งซื้อสำเร็จ! เลขติดตาม: " + order.getTrackingNumber();
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public String getTrackingNumber(String username, String album) {
        return orders.stream()
                .filter(o -> o.getUsername().equals(username) && o.getAlbum().equals(album))
                .map(Order::getTrackingNumber)
                .findFirst()
                .orElse("ไม่พบคำสั่งซื้อ");
    }
}
