import { CartProduct } from "@/interfaces";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[],
    getTotalItems: () => number,
    getSummaryInformation: () => {
        subTotal: number;
        igv: number;
        total: number;
        itemsInCart: number;
    },
    addProductCart: (product: CartProduct) => void,
    updateProductQuantity: (product: CartProduct, quantity: number) => void,
    removeProduct: (product: CartProduct) => void,
    clearCart: () => void
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            //Method

            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0)

                const igv = subTotal * 0.15;
                const total = subTotal + igv;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, igv, total, itemsInCart
                }

            },

            addProductCart: (product: CartProduct) => {
                const { cart } = get();

                //1. Revisar si el producto existe en el carrito con la talla seleccionada+
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //2. Se que el producto existe por talla... tengo que incrementar
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }

                    return item;
                })

                set({ cart: updatedCartProducts })
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...product,
                            quantity: quantity,
                        }
                    }

                    return item;
                })

                set({ cart: updatedProducts })
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const restProduct = cart.filter(item => (item.id !== product.id || item.size !== product.size));
                console.log(restProduct);

                set({ cart: restProduct })
            },
            clearCart: () => {
                set({ cart: [] })
            }
        })
        , {
            name: 'shopping-cart'
        }
    )


)
