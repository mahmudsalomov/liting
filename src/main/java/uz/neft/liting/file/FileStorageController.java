package uz.neft.liting.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileUrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uz.neft.liting.security.CurrentUser;
import uz.neft.liting.user.User;

import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;
import java.net.URLEncoder;

@RestController
@RequestMapping("api/file")
@CrossOrigin
public class FileStorageController {

    @Autowired
    private FileStorageService fileStorageService;


    /** Fayllar uchun **/

    @PostMapping("/upload")
    public HttpEntity<?> upload(@RequestBody MultipartFile[] files){
//        String image=fileStorageService.save(multipartFile);
//        System.out.println(files.length);
        return ResponseEntity.ok(fileStorageService.save(files));
    }



    /** File **/
    @GetMapping("/photo/{hashId}")
    public HttpEntity<?> images(@PathVariable String hashId,
                                @CurrentUser User user,
                                HttpServletRequest request) throws MalformedURLException {
        FileStorage fileStorage=fileStorageService.findByHashId(hashId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline: filename\""+ URLEncoder.encode(fileStorage.getName()))
                .contentType(MediaType.parseMediaType(fileStorage.getContentType()))
                .contentLength(fileStorage.getFileSize())
                .body(new FileUrlResource(fileStorage.getUploadPath()));
    }
}
