package com.digitodael.redgit.controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsDTO {
    private long totalUsers;
    private long totalAdmins;
    private long totalRegularUsers;
}
