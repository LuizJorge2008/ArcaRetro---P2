package com.arca.backend.repository;

import com.arca.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdutoRepository
        extends JpaRepository<Produto, Integer> {

    // Buscar produtos pelo nome ou descricao
    List<Produto> findByNomeContainingIgnoreCaseOrDescritivoContainingIgnoreCase(
            String nome, String descritivo);

    // Buscar produtos em destaque
    List<Produto> findByDestaque(Integer destaque);
}
