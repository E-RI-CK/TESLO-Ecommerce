

import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { CheckoutButton } from "./ui/CheckoutButton";
import { getUserAddress } from "@/actions";
import { auth } from "@/auth.config";




export default async function CartPage() {
    const session = await auth();
    //if (productsInCart.length === 0) redirect('/empty');
    const userAddress = await getUserAddress(session?.user.id!) ?? undefined;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link
                            href={'/'}
                            className="underline mb-5"
                        >
                            Continua comprando
                        </Link>


                        {/* Items */}
                        <ProductsInCart />

                    </div>
                    {/* Checkout - Resumen de Orden */}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <OrderSummary />
                        </div>
                        <CheckoutButton
                            userAddress={userAddress}
                        />
                        {/* <div className="mt-5 mb-2 w-full">
                            <Link
                                className="flex btn-primary justify-center"
                                href="/checkout/address"
                            >
                                Checkout
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}