'use client';

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-6">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mr-5 rounded"
                            style={{
                                width: '150px',
                                height: '150px'
                            }}
                        />

                        <div>
                            <span>
                                {product.title} - {product.size} ({product.quantity})
                            </span>
                            <p className="font-bold">{product.quantity} x {currencyFormat(product.price)} = {currencyFormat(product.price * product.quantity)}</p>
                        </div>

                    </div>
                ))
            }
        </>
    )
}
