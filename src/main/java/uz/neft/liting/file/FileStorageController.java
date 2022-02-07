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
import javax.validation.Valid;
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
    public HttpEntity<?> upload(@Valid @RequestBody MultipartFile[] files){
//        System.out.println(files.length);
//        String image=fileStorageService.save(multipartFile);
//        System.out.println(files.length);
        return ResponseEntity.ok(fileStorageService.save(files));
    }

    @PostMapping("/upload/{name}")
    public HttpEntity<?> upload(@Valid @RequestBody MultipartFile[] files, @Valid @PathVariable String name){
//        System.out.println(files.length);
//        String image=fileStorageService.save(multipartFile);
//        System.out.println(files.length);
        return ResponseEntity.ok(fileStorageService.saveFile(files,name));
    }



    /** File **/
    @GetMapping("/photo/{hashId}")
    public HttpEntity<?> image(@PathVariable String hashId,
                                @CurrentUser User user,
                                HttpServletRequest request) throws MalformedURLException {
        FileStorage fileStorage=fileStorageService.findByHashId(hashId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline: filename\""+ URLEncoder.encode(fileStorage.getName()))
                .contentType(MediaType.parseMediaType(fileStorage.getContentType()))
                .contentLength(fileStorage.getFileSize())
                .body(new FileUrlResource(fileStorage.getUploadPath()));
    }

    @GetMapping("/video/{hashId}")
    public HttpEntity<?> video(@PathVariable String hashId,
                                @CurrentUser User user,
                                HttpServletRequest request) throws MalformedURLException {
        FileStorage fileStorage=fileStorageService.findByHashId(hashId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline: filename\""+ URLEncoder.encode(fileStorage.getName()))
                .contentType(MediaType.parseMediaType(fileStorage.getContentType()))
                .contentLength(fileStorage.getFileSize())
                .body(new FileUrlResource(fileStorage.getUploadPath()));
    }

    @GetMapping("/file/{hashId}")
    public HttpEntity<?> file(@PathVariable String hashId,
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
