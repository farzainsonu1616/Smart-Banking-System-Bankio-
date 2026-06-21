package com.bankingsystem.service;

import com.bankingsystem.dto.CardDTO;
import java.util.List;

public interface CardService {
    CardDTO issueCard(Long accountId, String cardType);
    List<CardDTO> getCardsByAccountId(Long accountId);
    List<CardDTO> getCardsByUser(String email);
    CardDTO getCardById(Long id);
    CardDTO updateCardStatus(Long id, String status);
}
