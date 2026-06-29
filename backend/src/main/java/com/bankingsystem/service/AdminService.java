package com.bankingsystem.service;

import com.bankingsystem.dto.TransactionDTO;
import com.bankingsystem.dto.UserDTO;
import java.util.List;
import java.util.Map;

public interface AdminService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long userId);
    void approveUser(Long userId);
    void freezeUser(Long userId);
    void activateUser(Long userId);
    void deactivateUser(Long userId);
    void deleteUser(Long userId);
    Map<String, Object> getDashboardStatistics();
    List<TransactionDTO> getAllTransactions();
    Map<String, Object> getReportData();
}
