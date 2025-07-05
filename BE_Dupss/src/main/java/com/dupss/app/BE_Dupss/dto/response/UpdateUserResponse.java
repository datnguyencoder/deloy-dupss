package com.dupss.app.BE_Dupss.dto.response;

import com.dupss.app.BE_Dupss.entity.AcademicTitle;
import com.dupss.app.BE_Dupss.entity.ERole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserResponse {

    private Long id;


    private String username;
    private String fullname;
    private String avatar;
    private LocalDate yob;
    private String gender;

    private String email;
    private String phone;
    private String address;

    //ìnformation for consultant profile
    private String bio;
    private String certificates;
    private AcademicTitle academicTitle;

    private ERole role;
    private String message;

}


