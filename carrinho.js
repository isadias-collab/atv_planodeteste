function calcularTotal(itens, cupom) {

    if (!itens || itens.length === 0) {
        throw new Error("Carrinho inválido");
    }

    for (const item of itens) {
        if (item.quantidade <= 0) {
            throw new Error("Carrinho inválido");
        }
    }

    // Calcula o subtotal
    let subtotal = 0;

    for (const item of itens) {
        subtotal += item.preco * item.quantidade;
    }

    // Desconto
    if (cupom === "PROMO10") {
        subtotal = subtotal * 0.90;
    }

    // Frete
    let frete = subtotal >= 100 ? 0 : 15;

    // Total
    let total = subtotal + frete;

    // Arredonda para duas casas decimais
    return Number(total.toFixed(2));
}

module.exports = { calcularTotal };