
package com.arca.backend.repository;

import com.arca.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClienteRepository
        extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByEmailIgnoreCase(String email);
}
