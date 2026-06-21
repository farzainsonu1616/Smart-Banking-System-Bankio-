package com.bankingsystem.service;

import com.bankingsystem.dto.*;
import java.util.List;

public interface CardService {
    CardResponse requestCard(String email, CardRequest request);
    List<CardResponse> getCards(String email);
    CardResponse getCardById(String email, Long id);
    CardResponse blockCard(String email, Long id);
    CardResponse activateCard(String email, Long id);
}
