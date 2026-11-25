
package com.arca.backend.repository;

import com.arca.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository
        extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByClienteCodigo(Integer clienteCodigo);
}
