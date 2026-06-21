package com.bankingsystem.service;

import com.bankingsystem.dto.AccountDTO;
import java.util.List;

public interface AccountService {
    AccountDTO createAccount(Long userId, String accountType, Long branchId);
    AccountDTO getAccountById(Long id);
    AccountDTO getAccountByNumber(String accountNumber);
    List<AccountDTO> getAccountsByUserId(Long userId);
    AccountDTO updateAccountStatus(Long id, String status);
}
