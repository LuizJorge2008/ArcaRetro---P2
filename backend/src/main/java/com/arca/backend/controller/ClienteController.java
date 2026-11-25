
package com.arca.backend.controller;

import com.arca.backend.model.Cliente;
import com.arca.backend.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    // Buscar cliente
    @GetMapping("/{codigo}")
    public ResponseEntity<Cliente> buscar(
            @PathVariable Integer codigo) {
        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar cliente
    @PostMapping
    public ResponseEntity<String> cadastrar(
            @RequestBody Cliente cliente) {

        if (vazio(cliente.getNome()) ||
            vazio(cliente.getEmail()) ||
            vazio(cliente.getSenha())) {
            return ResponseEntity.badRequest()
                    .body("Preencha nome, email e senha!");
        }

        if (repository.findByEmailIgnoreCase(
                cliente.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Email ja cadastrado!");
        }

        cliente.setCodigo(null);
        cliente.setSenha(encoder.encode(cliente.getSenha()));

        Cliente salvo = repository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Cliente gravado com sucesso! "
                        + salvo.getCodigo());
    }

    // Atualizar cliente
    @PutMapping
    public ResponseEntity<String> atualizar(
            @RequestBody Cliente cliente) {

        if (cliente.getCodigo() == null) {
            return ResponseEntity.badRequest()
                    .body("Informe o codigo!");
        }

        var encontrado = repository.findById(
                cliente.getCodigo());

        if (encontrado.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (vazio(cliente.getNome()) ||
            vazio(cliente.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Nome e email obrigatorios!");
        }

        var outro = repository.findByEmailIgnoreCase(
                cliente.getEmail());

        if (outro.isPresent() &&
            !outro.get().getCodigo().equals(
                    cliente.getCodigo())) {
            return ResponseEntity.badRequest()
                    .body("Email ja cadastrado!");
        }

        Cliente atual = encontrado.get();

        atual.setNome(cliente.getNome());
        atual.setEmail(cliente.getEmail());
        atual.setDocumento(cliente.getDocumento());

        repository.save(atual);

        return ResponseEntity.ok(
                "Cliente alterado com sucesso!");
    }

    // Excluir cliente
    @DeleteMapping("/{codigo}")
    public ResponseEntity<String> excluir(
            @PathVariable Integer codigo) {

        if (!repository.existsById(codigo)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(codigo);

        return ResponseEntity.ok(
                "Cliente removido com sucesso!");
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> dados) {

        String email = dados.get("email");
        String senha = dados.get("senha");

        if (vazio(email) || vazio(senha)) {
            return ResponseEntity.badRequest()
                    .body("Informe email e senha!");
        }

        var encontrado = repository.findByEmailIgnoreCase(
                email);

        if (encontrado.isEmpty() ||
            !encoder.matches(senha,
                    encontrado.get().getSenha())) {

            return ResponseEntity.status(
                    HttpStatus.UNAUTHORIZED)
                    .body("Email ou senha invalidos!");
        }

        Cliente cliente = encontrado.get();

        return ResponseEntity.ok(Map.of(
                "codigo", cliente.getCodigo(),
                "nome", cliente.getNome(),
                "email", cliente.getEmail()
        ));
    }

    // Alterar senha
    @PatchMapping("/alterarSenha")
    public ResponseEntity<String> alterarSenha(
            @RequestBody Map<String, String> dados) {

        String email = dados.get("email");
        String senhaAtual = dados.get("senhaAtual");
        String novaSenha = dados.get("senha");

        if (vazio(email) || vazio(senhaAtual) ||
            vazio(novaSenha)) {
            return ResponseEntity.badRequest()
                    .body("Preencha todos os campos!");
        }

        var encontrado = repository.findByEmailIgnoreCase(
                email);

        if (encontrado.isEmpty() ||
            !encoder.matches(senhaAtual,
                    encontrado.get().getSenha())) {
            return ResponseEntity.status(
                    HttpStatus.UNAUTHORIZED)
                    .body("Credenciais invalidas!");
        }

        Cliente cliente = encontrado.get();
        cliente.setSenha(encoder.encode(novaSenha));
        repository.save(cliente);

        return ResponseEntity.ok(
                "Senha alterada com sucesso!");
    }

    // Recuperacao de senha pendente
    @PatchMapping("/resetarSenha")
    public ResponseEntity<String> resetarSenha() {
        return ResponseEntity.status(
                HttpStatus.NOT_IMPLEMENTED)
                .body("Recuperacao por email ainda nao configurada.");
    }

    private boolean vazio(String texto) {
        return texto == null || texto.isBlank();
    }
}
