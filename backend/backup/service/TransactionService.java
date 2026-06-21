package com.bankingsystem.service;

import com.bankingsystem.dto.*;
import java.util.List;

public interface TransactionService {
    TransactionResponse deposit(String email, TransactionRequest request);
    TransactionResponse withdraw(String email, TransactionRequest request);
    TransactionResponse transfer(String email, TransactionRequest request);
    List<TransactionResponse> getTransactionHistory(String email);
    TransactionResponse getTransactionById(String email, Long id);
    List<TransactionResponse> getTransactionsByAccount(String email, Long accountId);
}
