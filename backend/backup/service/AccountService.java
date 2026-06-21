package com.bankingsystem.service;

import com.bankingsystem.dto.*;
import java.util.List;

public interface AccountService {
    AccountResponse createAccount(String email, AccountRequest request);
    List<AccountResponse> getAccounts(String email);
    AccountResponse getAccountById(String email, Long id);
    AccountResponse updateAccount(String email, Long id, AccountRequest request);
}
