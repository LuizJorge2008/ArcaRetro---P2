
package com.arca.backend.controller;

import com.arca.backend.model.*;
import com.arca.backend.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/pedidos")
    public List<Pedido> listar() {
        return repository.findAll();
    }

    @GetMapping("/pedido/{codigo}")
    public ResponseEntity<Pedido> buscar(
            @PathVariable Integer codigo) {

        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pedidos/cliente/{codigo}")
    public List<Pedido> listarPorCliente(
            @PathVariable Integer codigo) {

        return repository.findByClienteCodigo(codigo);
    }

    @PostMapping("/pedido")
    public ResponseEntity<?> cadastrar(
            @RequestBody Pedido pedido) {

        if (pedido.getClienteCodigo() == null ||
            !clienteRepository.existsById(
                pedido.getClienteCodigo())) {

            return ResponseEntity.badRequest()
                    .body("Cliente invalido!");
        }

        if (pedido.getItens() == null ||
            pedido.getItens().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("O pedido precisa ter produtos!");
        }

        BigDecimal subtotal = BigDecimal.ZERO;

        for (ItemPedido item : pedido.getItens()) {

            if (item.getProdutoCodigo() == null ||
                item.getQuantidade() == null ||
                item.getQuantidade() <= 0) {

                return ResponseEntity.badRequest()
                        .body("Item invalido!");
            }

            var produto = produtoRepository.findById(
                    item.getProdutoCodigo());

            if (produto.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Produto nao encontrado!");
            }

            Produto encontrado = produto.get();

            if (encontrado.getQuantidade() == null ||
                item.getQuantidade() > encontrado.getQuantidade()) {

                return ResponseEntity.badRequest()
                        .body("Estoque insuficiente!");
            }

            BigDecimal preco = encontrado.getValorPromo();

            if (preco == null) {
                preco = encontrado.getValor();
            }

            if (preco == null ||
                preco.compareTo(BigDecimal.ZERO) < 0) {

                return ResponseEntity.badRequest()
                        .body("Preco invalido!");
            }

            item.setPrecoUnitario(preco);

            subtotal = subtotal.add(
                preco.multiply(
                    BigDecimal.valueOf(item.getQuantidade())
                )
            );
        }

        pedido.setCodigoPedido(null);
        pedido.setStatus("Pendente");

        BigDecimal frete = new BigDecimal("29.90");
        pedido.setTotal(subtotal.add(frete));

        Pedido salvo = repository.save(pedido);

        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/pedido")
    public ResponseEntity<?> atualizar(
            @RequestBody Pedido pedido) {

        if (pedido.getCodigoPedido() == null) {
            return ResponseEntity.badRequest()
                    .body("Informe o codigo!");
        }

        var existente = repository.findById(
                pedido.getCodigoPedido());

        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Pedido atual = existente.get();

        if (pedido.getStatus() != null) {
            atual.setStatus(pedido.getStatus());
        }

        return ResponseEntity.ok(repository.save(atual));
    }

    @DeleteMapping("/pedido/{codigo}")
    public ResponseEntity<String> excluir(
            @PathVariable Integer codigo) {

        if (!repository.existsById(codigo)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(codigo);

        return ResponseEntity.ok(
                "Pedido removido com sucesso!");
    }
}
