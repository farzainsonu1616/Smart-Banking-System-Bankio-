package com.bankingsystem.service.impl;

import com.bankingsystem.dto.TransactionDTO;
import com.bankingsystem.dto.UserDTO;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.Transaction;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.CardRepository;
import com.bankingsystem.repository.LoanRepository;
import com.bankingsystem.repository.TransactionRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CardRepository cardRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Override
    @Transactional
    public void approveUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void freezeUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setLocked(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(true);
        user.setLocked(false);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(false);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    @Override
    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAccounts", accountRepository.count());
        stats.put("totalLoans", loanRepository.count());
        stats.put("totalTransactions", transactionRepository.count());
        stats.put("totalCards", cardRepository.count());
        
        // Calculate total balance across all accounts
        List<Account> allAccounts = accountRepository.findAll();
        BigDecimal totalBalance = allAccounts.stream()
                .map(Account::getBalance)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.put("totalBalance", totalBalance);
        
        // Count pending loans
        long pendingLoans = loanRepository.findAll().stream()
                .filter(l -> "PENDING".equals(l.getStatus()))
                .count();
        stats.put("pendingLoans", pendingLoans);
        
        return stats;
    }

    @Override
    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::mapTransactionToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getReportData() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalUsers", userRepository.count());
        report.put("totalAccounts", accountRepository.count());
        report.put("totalTransactions", transactionRepository.count());
        report.put("totalLoans", loanRepository.count());
        
        // Transaction breakdown
        List<Transaction> allTxns = transactionRepository.findAll();
        long deposits = allTxns.stream().filter(t -> "DEPOSIT".equals(t.getTransactionType())).count();
        long withdrawals = allTxns.stream().filter(t -> "WITHDRAWAL".equals(t.getTransactionType())).count();
        long transfers = allTxns.stream().filter(t -> t.getTransactionType() != null && t.getTransactionType().startsWith("TRANSFER")).count();
        long successTxns = allTxns.stream().filter(t -> "SUCCESS".equals(t.getStatus())).count();
        long failedTxns = allTxns.stream().filter(t -> "FAILED".equals(t.getStatus())).count();
        
        report.put("totalDeposits", deposits);
        report.put("totalWithdrawals", withdrawals);
        report.put("totalTransfers", transfers);
        report.put("successfulTransactions", successTxns);
        report.put("failedTransactions", failedTxns);
        
        return report;
    }

    private UserDTO mapToDTO(User user) {
        String[] nameParts = user.getFullName() != null ? user.getFullName().split(" ", 2) : new String[]{"", ""};
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        return UserDTO.builder()
                .id(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(user.getEmail())
                .phone(user.getMobile())
                .username(user.getEmail())
                .roles(user.getRoles().stream().map(r -> "ROLE_" + r.getName()).reduce((a, b) -> a + "," + b).orElse(""))
                .isActive(user.isEnabled())
                .isLocked(user.isLocked())
                .createdAt(user.getCreatedAt())
                .build();
    }

    private TransactionDTO mapTransactionToDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .id(transaction.getId())
                .transactionId(transaction.getTransactionReference())
                .referenceNumber(transaction.getTransactionReference())
                .accountId(transaction.getSourceAccount() != null ? transaction.getSourceAccount().getId() : null)
                .amount(transaction.getAmount())
                .type(transaction.getTransactionType())
                .status(transaction.getStatus())
                .description(transaction.getDescription())
                .targetAccountId(transaction.getDestinationAccount() != null ? transaction.getDestinationAccount().getId() : null)
                .timestamp(transaction.getTransactionDate())
                .build();
    }
}
