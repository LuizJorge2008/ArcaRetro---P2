
package com.arca.backend.controller;

import com.arca.backend.model.Produto;
import com.arca.backend.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    // Listar todos os produtos
    @GetMapping("/produtos")
    public List<Produto> listar() {
        return repository.findAll();
    }

    // Buscar produto pelo codigo
    @GetMapping("/produto/{codigo}")
    public ResponseEntity<Produto> buscar(
            @PathVariable Integer codigo) {
        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar produto
    @PostMapping("/produto")
    public String cadastrar(@RequestBody Produto produto) {
        produto.setCodigo(null);
        Produto salvo = repository.save(produto);
        return "Produto gravado com sucesso! " + salvo.getCodigo();
    }

    // Atualizar produto
    @PutMapping("/produto")
    public String atualizar(@RequestBody Produto produto) {
        if (produto.getCodigo() == null ||
                !repository.existsById(produto.getCodigo())) {
            return "Produto não encontrado!";
        }

        repository.save(produto);
        return "Produto alterado com sucesso!";
    }

    // Excluir produto
    @DeleteMapping("/produto/{codigo}")
    public String excluir(@PathVariable Integer codigo) {
        if (!repository.existsById(codigo)) {
            return "Produto não encontrado!";
        }

        repository.deleteById(codigo);
        return "Produto removido com sucesso!";
    }

    // Produtos da vitrine
    @GetMapping("/produto/vitrine")
    public List<Produto> vitrine() {
        return repository.findByDestaque(1);
    }

    // Pesquisar produtos
    @GetMapping("/produto/busca/{termo}")
    public List<Produto> pesquisar(
            @PathVariable String termo) {
        return repository
                .findByNomeContainingIgnoreCaseOrDescritivoContainingIgnoreCase(
                        termo, termo);
    }
}
