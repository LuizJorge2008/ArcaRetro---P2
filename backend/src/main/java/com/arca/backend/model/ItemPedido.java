
package com.arca.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Embeddable
public class ItemPedido {

    private Integer produtoCodigo;
    private Integer quantidade;
    private BigDecimal precoUnitario;

    public Integer getProdutoCodigo() {
        return produtoCodigo;
    }

    public void setProdutoCodigo(Integer produtoCodigo) {
        this.produtoCodigo = produtoCodigo;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
}
