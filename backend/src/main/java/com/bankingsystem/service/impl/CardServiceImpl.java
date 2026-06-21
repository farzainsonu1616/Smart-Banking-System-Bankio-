package com.bankingsystem.service.impl;

import com.bankingsystem.dto.CardDTO;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.Card;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.CardRepository;
import com.bankingsystem.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;
    private final com.bankingsystem.repository.UserRepository userRepository;

    @Override
    public CardDTO issueCard(Long accountId, String cardType) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        String cardNumber = generateUniqueCardNumber();
        String cvv = String.format("%03d", (int) (Math.random() * 1000));
        LocalDate expiryDate = LocalDate.now().plusYears(5);

        BigDecimal limit = "CREDIT".equalsIgnoreCase(cardType) ? new BigDecimal("50000.00") : null;

        Card card = Card.builder()
                .cardNumber(cardNumber)
                .cardType(cardType)
                .expiryDate(expiryDate)
                .cvv(cvv)
                .creditLimit(limit)
                .status("ACTIVE")
                .account(account)
                .build();

        return mapToDTO(cardRepository.save(card));
    }

    @Override
    public List<CardDTO> getCardsByAccountId(Long accountId) {
        return cardRepository.findByAccountId(accountId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CardDTO> getCardsByUser(String email) {
        com.bankingsystem.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Account> accounts = accountRepository.findByUserId(user.getId());
        List<CardDTO> allCards = new java.util.ArrayList<>();
        for (Account acc : accounts) {
            allCards.addAll(getCardsByAccountId(acc.getId()));
        }
        return allCards;
    }

    @Override
    public CardDTO getCardById(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found"));
        return mapToDTO(card);
    }

    @Override
    public CardDTO updateCardStatus(Long id, String status) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found"));
        card.setStatus(status);
        return mapToDTO(cardRepository.save(card));
    }

    private String generateUniqueCardNumber() {
        String cardNum;
        do {
            long randomNum = (long) (Math.random() * 1000000000000000L) + 4000000000000000L;
            cardNum = String.valueOf(randomNum);
        } while (cardRepository.existsByCardNumber(cardNum));
        return cardNum;
    }

    private CardDTO mapToDTO(Card card) {
        return CardDTO.builder()
                .id(card.getId())
                .cardNumber(card.getCardNumber())
                .cardType(card.getCardType())
                .expirationDate(card.getExpiryDate())
                .cvv(card.getCvv())
                .creditLimit(card.getCreditLimit())
                .status(card.getStatus())
                .accountId(card.getAccount().getId())
                .build();
    }
}
