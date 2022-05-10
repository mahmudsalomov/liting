package uz.neft.liting.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Short> {
    boolean existsByRoleName(RoleName roleName);
    Role findFirstByRoleName(RoleName roleName);
}
