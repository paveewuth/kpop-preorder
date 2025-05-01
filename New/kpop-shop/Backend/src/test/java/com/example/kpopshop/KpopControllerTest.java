package com.example.kpopshop;

import com.example.kpopshop.controller.KpopController;
import com.example.kpopshop.service.KpopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
public class KpopControllerTest {

    private MockMvc mockMvc;

    @Mock
    private KpopService kpopService;

    @InjectMocks
    private KpopController kpopController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(kpopController).build();
    }

    @Test
    public void testGetProducts() throws Exception {
        when(kpopService.getAllProducts()).thenReturn(List.of(
                new Product("BLACKPINK BORN PINK", 599.0),
                new Product("NCT DREAM ISTJ", 520.0)
        ));

        mockMvc.perform(get("/kpop/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("BLACKPINK BORN PINK"))
                .andExpect(jsonPath("$[1].name").value("NCT DREAM ISTJ"));
    }
}
