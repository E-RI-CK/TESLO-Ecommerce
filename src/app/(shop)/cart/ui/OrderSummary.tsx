'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false); //Hidratación de estado, para la sincronización entre el estado del servidor y el cliente
    const { itemsInCart, subTotal, igv, total } = useCartStore(state => state.getSummaryInformation());
    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) return <p>Cargando...</p>;

    return (
        <>
            <span>No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(igv)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </>
    )
}
