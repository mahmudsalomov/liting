package uz.neft.liting.file;

import org.hashids.Hashids;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uz.neft.liting.payload.ApiResponse;
import uz.neft.liting.payload.Payload;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FileStorageService {


    private final Hashids hashids;
    public FileStorageService() {
        this.hashids = new Hashids(getClass().getName(),6);
    }
    @Autowired
    private FileStorageRepository fileStorageRepository;

    public ApiResponse save(MultipartFile[] files){
        List<FileStorage> fileStorages=new ArrayList<>();
        try {
            if (files!=null&&files.length>0){
                for (MultipartFile multipartFile : files) {
                    FileStorage fileStorage = FileStorage
                            .builder()
                            .name(multipartFile.getOriginalFilename())
                            .fileSize(multipartFile.getSize())
                            .contentType(multipartFile.getContentType())
                            .fileStorageStatus(FileStorageStatus.ACTIVE)
                            .extension(getEx(multipartFile.getOriginalFilename()))
                            .build();
            fileStorageRepository.save(fileStorage);


                    Date now = new Date();
                    //                this.uploadFolder+
                    File uploadFolder = new File(
                            (1900 + now.getYear()) +
                                    "/"
                                    + (1 + now.getMonth()) +
                                    "/"
                                    + now.getDate()
                    );

                    if (!uploadFolder.exists() && uploadFolder.mkdirs()) {
                        System.out.println("Papkalar yaratildi!");
                    }
                    fileStorage.setHashId(hashids.encode(fileStorage.getId()));
                    fileStorage.setUploadPath(
//                        this.uploadFolder+
                            (1900 + now.getYear()) +
                                    "/"
                                    + (1 + now.getMonth()) +
                                    "/"
                                    + now.getDate() +
                                    "/"
                                    + fileStorage.getHashId() +
                                    "."
                                    + fileStorage.getExtension()
                    );

                    uploadFolder = uploadFolder.getAbsoluteFile();
                    File file = new File(uploadFolder, fileStorage.getHashId() + "." + fileStorage.getExtension());
                    try {
                        multipartFile.transferTo(file);
                        fileStorages.add(fileStorageRepository.save(fileStorage));
                    } catch (IOException e) {
                        e.printStackTrace();
                        return Payload.conflict();
                    }
                }
                return Payload.ok(fileStorages);
            } return Payload.conflict("Rasmlar bo'sh");
        }catch (Exception e){
            e.printStackTrace();
            return Payload.conflict();
        }


    }



    public String getEx(String fileName){
        String ext=null;
        if (fileName!=null&&!fileName.isEmpty()){
            int dot=fileName.lastIndexOf(".");
            if (dot>0&&dot<=fileName.length()-2){
                ext=fileName.substring(dot+1);
            }
        }
        return ext;
    }


    public FileStorage findByHashId(String hashId) {
        return fileStorageRepository.findByHashId(hashId);
    }
}