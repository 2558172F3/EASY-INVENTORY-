const formatearMoneda = (numero: number): string => {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
    return formatter.format(numero);
};

export default formatearMoneda;