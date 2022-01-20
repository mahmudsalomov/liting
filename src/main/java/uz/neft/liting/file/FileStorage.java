package uz.neft.liting.file;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileStorage  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String extension;
    private long fileSize;
    private String hashId;
    private String contentType;
    private String uploadPath;
    @Enumerated(EnumType.STRING)
    private FileStorageStatus fileStorageStatus;
}
