package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.exception.*;
import com.bankingsystem.repository.*;
import com.bankingsystem.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@SuppressWarnings("null")
public class CardServiceImpl implements CardService {

    @Autowired private CardRepository cardRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private AccountRepository accountRepository;

    @Override
    public CardResponse requestCard(String email, CardRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Account account = null;
        if (request.getAccountId() != null) {
            account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        }

        Card card = Card.builder()
                .user(user)
                .account(account)
                .cardNumber(generateMaskedCardNumber())
                .cardType(Card.CardType.valueOf(request.getCardType().toUpperCase()))
                .cardCategory(request.getCardCategory() != null ?
                        Card.CardCategory.valueOf(request.getCardCategory().toUpperCase()) : Card.CardCategory.SECURED)
                .cardHolderName((user.getFirstName() + " " + user.getLastName()).toUpperCase())
                .expiryDate(LocalDate.now().plusYears(3))
                .cvv("***")
                .creditLimit(request.getCardType().equalsIgnoreCase("CREDIT") ? new BigDecimal("100000") : BigDecimal.ZERO)
                .availableBalance(request.getCardType().equalsIgnoreCase("CREDIT") ? new BigDecimal("100000") : BigDecimal.ZERO)
                .status(Card.CardStatus.REQUESTED)
                .build();

        cardRepository.save(card);
        return mapToResponse(card);
    }

    @Override
    public List<CardResponse> getCards(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return cardRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public CardResponse getCardById(String email, Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found"));
        return mapToResponse(card);
    }

    @Override
    public CardResponse blockCard(String email, Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found"));
        card.setStatus(Card.CardStatus.BLOCKED);
        cardRepository.save(card);
        return mapToResponse(card);
    }

    @Override
    public CardResponse activateCard(String email, Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found"));
        card.setStatus(Card.CardStatus.ACTIVE);
        cardRepository.save(card);
        return mapToResponse(card);
    }

    private String generateMaskedCardNumber() {
        Random rng = new Random();
        return String.format("%04d", rng.nextInt(9999)) + "XXXX" + String.format("%04d", rng.nextInt(9999));
    }

    private CardResponse mapToResponse(Card card) {
        return CardResponse.builder()
                .id(card.getId())
                .cardNumber(card.getCardNumber())
                .cardType(card.getCardType().name())
                .cardCategory(card.getCardCategory().name())
                .cardHolderName(card.getCardHolderName())
                .expiryDate(card.getExpiryDate())
                .creditLimit(card.getCreditLimit())
                .availableBalance(card.getAvailableBalance())
                .status(card.getStatus().name())
                .accountNumber(card.getAccount() != null ? card.getAccount().getAccountNumber() : null)
                .createdAt(card.getCreatedAt())
                .build();
    }
}
