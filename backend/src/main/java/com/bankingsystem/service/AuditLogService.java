package com.bankingsystem.service;

import com.bankingsystem.entity.AuditLog;
import java.util.List;

public interface AuditLogService {
    void logAction(String username, String action, String details, String ipAddress);
    List<AuditLog> getLogsByUsername(String username);
    List<AuditLog> getAllLogs();
}
