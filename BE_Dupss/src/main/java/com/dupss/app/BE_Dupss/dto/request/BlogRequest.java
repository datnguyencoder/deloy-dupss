package com.dupss.app.BE_Dupss.dto.request;

import com.dupss.app.BE_Dupss.entity.Topic;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotNull(message = "Topic ID cannot be blank")
    private Long topicId;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Content cannot be blank")
    private String content;

    private List<MultipartFile> images;

}