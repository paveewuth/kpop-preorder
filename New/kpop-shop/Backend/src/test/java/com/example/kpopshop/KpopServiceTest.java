package test.java.com.example.kpopshop;

import com.example.kpopshop.service.KpopService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class KpopServiceTest {

    KpopService kpopService = new KpopService();

    @Test
    void testRegisterUser() {
        String response = kpopService.registerUser("testUser");
        assertNotNull(response);
        assertEquals("สมัครสำเร็จ! รับโปร 10% ทุกออเดอร์แรก 🎉", response);
    }

    @Test
    void testPreorder() {
        String response = kpopService.preorder("testUser", "BLACKPINK BORN PINK");
        assertNotNull(response);
        assertTrue(response.contains("สั่งซื้อสำเร็จ"));
    }

    @Test
    void testGetTrackingNumber() {
        kpopService.preorder("testUser", "BLACKPINK BORN PINK");
        String tracking = kpopService.getTrackingNumber("testUser", "BLACKPINK BORN PINK");
        assertNotNull(tracking);
    }
}
