package com.bankingsystem.service.impl;

import com.bankingsystem.dto.AccountDTO;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.Branch;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.BranchRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;

    @Override
    @Transactional
    public AccountDTO createAccount(Long userId, String accountType, Long branchId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id: " + branchId));

        String generatedAccountNumber = generateUniqueAccountNumber();

        Account account = Account.builder()
                .accountNumber(generatedAccountNumber)
                .accountType(accountType)
                .balance(BigDecimal.ZERO)
                .currency("INR")
                .status("ACTIVE")
                .user(user)
                .branch(branch)
                .build();

        Account savedAccount = accountRepository.save(account);
        return mapToDTO(savedAccount);
    }

    @Override
    public AccountDTO getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        return mapToDTO(account);
    }

    @Override
    public AccountDTO getAccountByNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with number: " + accountNumber));
        return mapToDTO(account);
    }

    @Override
    public List<AccountDTO> getAccountsByUserId(Long userId) {
        return accountRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AccountDTO updateAccountStatus(Long id, String status) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        account.setStatus(status);
        Account updatedAccount = accountRepository.save(account);
        return mapToDTO(updatedAccount);
    }

    private String generateUniqueAccountNumber() {
        String accNum;
        do {
            long randomNum = (long) (Math.random() * 10000000000L) + 1000000000L;
            accNum = String.valueOf(randomNum);
        } while (accountRepository.existsByAccountNumber(accNum));
        return accNum;
    }

    private AccountDTO mapToDTO(Account account) {
        return AccountDTO.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType())
                .balance(account.getBalance())
                .currency(account.getCurrency())
                .status(account.getStatus())
                .userId(account.getUser().getId())
                .branchId(account.getBranch() != null ? account.getBranch().getId() : null)
                .createdAt(account.getCreatedAt())
                .build();
    }
}
