
package com.arca.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;

    private String nome;
    private String descritivo;
    private String categoria;
    private String imagem;

    private BigDecimal valor;
    private BigDecimal valorPromo;

    private Integer quantidade;
    private Integer destaque;

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescritivo() {
        return descritivo;
    }

    public void setDescritivo(String descritivo) {
        this.descritivo = descritivo;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public BigDecimal getValorPromo() {
        return valorPromo;
    }

    public void setValorPromo(BigDecimal valorPromo) {
        this.valorPromo = valorPromo;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getDestaque() {
        return destaque;
    }

    public void setDestaque(Integer destaque) {
        this.destaque = destaque;
    }
}
