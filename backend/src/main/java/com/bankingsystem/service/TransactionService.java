package com.bankingsystem.service;

import com.bankingsystem.dto.TransactionDTO;
import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
    TransactionDTO deposit(Long accountId, BigDecimal amount, String description);
    TransactionDTO withdraw(Long accountId, BigDecimal amount, String description);
    TransactionDTO transfer(Long sourceAccountId, Long targetAccountId, BigDecimal amount, String description);
    List<TransactionDTO> getTransactionsByAccountId(Long accountId);
    List<TransactionDTO> getTransactionsByUser(String email);
    TransactionDTO getTransactionById(Long id);
}
