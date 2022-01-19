package uz.neft.liting.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileStorageRepository extends JpaRepository<FileStorage,Integer> {

    FileStorage findByHashId(String hashId);
}
