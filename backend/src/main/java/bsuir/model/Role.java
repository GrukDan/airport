package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Role {
    private long idRole;
    private String role;

    @Id
    @Column(name = "id_role", nullable = false)
    public long getIdRole() {
        return idRole;
    }

    public void setIdRole(long idRole) {
        this.idRole = idRole;
    }

    @Basic
    @Column(name = "role", nullable = false, length = 45)
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role1 = (Role) o;
        return idRole == role1.idRole &&
                Objects.equals(role, role1.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRole, role);
    }
}
