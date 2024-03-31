import { getOrderById } from "@/actions";
import { OrderStatus, PayPalButton, Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from '../../../../utils/currencyFormat';
import { redirect } from "next/navigation";


interface Props {
  params: {
    id: string
  }
}

export default async function OrdersByIdPage({ params }: Props) {

  const { id } = params;

  //Todo: Llamar el server action

  const { ok, orderAddress, productsInOrder, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }




  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split('-').at(-1)}`} />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}

          <div className="flex flex-col mt-5">

            <OrderStatus isPaid={order!.isPaid ?? false} />


            {/* Items */}

            {
              productsInOrder!.map(product => (
                <Link
                  key={`${product.id}-${product.size}`}
                  className="flex mb-6"
                  href={`/product/${product.slug}`}
                >
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
                    <p>{product.title} <span className="font-bold">(Talla: {product.size})</span></p>
                    <p>{product.price} x {product.quantity}</p>
                    <p className="font-bold">Subtotal: ${product.price * product.quantity}</p>
                    {/* <button className="underline mt-5">
                      Remover
                    </button> */}
                  </div>

                </Link>
              ))
            }
          </div>
          {/* Checkout - Resumen de Orden */}

          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de Entrega</h2>

            <div className="mb-10">
              <p className="font-bold">{orderAddress?.firstName} {orderAddress?.lastName}</p>
              <p>{orderAddress!.address}</p>
              <p>{orderAddress!.address2}</p>
              <p>{orderAddress!.city}</p>
              <p>{orderAddress!.postalCode}</p>
              <p>{orderAddress!.phone}</p>
            </div>

            {/* Divider */}

            <div
              className="w-full h-0.5 rounded bg-gray-200 mb-10"
            />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder} artículos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order?.subTotal ?? 0)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order?.igv ?? 0)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order?.total ?? 0)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {
                order!.isPaid
                  ? <OrderStatus isPaid={order!.isPaid ?? false} />
                  : <PayPalButton
                    amount={order!.total}
                    orderId={order!.id}
                  />
              }

            </div>
          </div>
        </div>
      </div>
    </div >
  );
}