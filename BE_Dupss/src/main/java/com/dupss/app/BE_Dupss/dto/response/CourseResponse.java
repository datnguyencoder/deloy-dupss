package com.dupss.app.BE_Dupss.dto.response;

import com.dupss.app.BE_Dupss.entity.EnrollmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String coverImage;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String creator;
    private List<CourseModuleResponse> modules;
    private SurveyResponse quiz;
    private Integer enrollmentCount;
    private EnrollmentStatus enrollmentStatus;
    private double progress;
} 