'use client';

import Image from "next/image";
import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

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
                        <ProductImage
                            src={product.image}
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
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.title} - {product.size}
                            </Link>
                            <p>{product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={(quantity) => updateQuantity(product, quantity)}
                            />
                            <button
                                onClick={() => removeProduct(product)}
                                className="underline mt-5"
                            >
                                Remover
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
}
