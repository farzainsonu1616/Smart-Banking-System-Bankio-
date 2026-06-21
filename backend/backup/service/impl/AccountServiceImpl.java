package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.*;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@SuppressWarnings("null")
public class AccountServiceImpl implements AccountService {

    @Autowired private AccountRepository accountRepository;
    @Autowired private UserRepository userRepository;

    @Override
    public AccountResponse createAccount(String email, AccountRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Account account = Account.builder()
                .user(user)
                .accountNumber(generateAccountNumber())
                .accountType(Account.AccountType.valueOf(request.getAccountType().toUpperCase()))
                .balance(BigDecimal.ZERO)
                .currency(request.getCurrency() != null ? request.getCurrency() : "INR")
                .status(Account.AccountStatus.ACTIVE)
                .build();

        accountRepository.save(account);
        return mapToResponse(account);
    }

    @Override
    public List<AccountResponse> getAccounts(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return accountRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public AccountResponse getAccountById(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if (!account.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to access this account");
        }
        return mapToResponse(account);
    }

    @Override
    public AccountResponse updateAccount(String email, Long id, AccountRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if (!account.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to modify this account");
        }
        if (request.getCurrency() != null) account.setCurrency(request.getCurrency());
        accountRepository.save(account);
        return mapToResponse(account);
    }

    private String generateAccountNumber() {
        String prefix = "SB" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        String suffix = String.format("%04d", new Random().nextInt(9999));
        String number = prefix + suffix;
        while (accountRepository.existsByAccountNumber(number)) {
            suffix = String.format("%04d", new Random().nextInt(9999));
            number = prefix + suffix;
        }
        return number;
    }

    private AccountResponse mapToResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType().name())
                .balance(account.getBalance())
                .currency(account.getCurrency())
                .status(account.getStatus().name())
                .ownerName(account.getUser().getFirstName() + " " + account.getUser().getLastName())
                .createdAt(account.getCreatedAt())
                .build();
    }
}
