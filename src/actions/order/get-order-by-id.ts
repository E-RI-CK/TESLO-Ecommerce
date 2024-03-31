'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


export const getOrderById = async (id: string) => {

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    try {

        //Obtener información sobre los items pedidos

        const orders = await prisma.orderItem.findMany({
            where: {
                orderId: id
            }
        })

        // Obtener todos los productos
        const products = await prisma.product.findMany();

        //Obtener todas la imágenes
        const productImages = await prisma.productImage.findMany();

        //Obtener dirección de orden

        const orderAddress = await prisma.orderAddress.findUnique({
            where: {
                orderId: id
            }
        })

        //Obtener Orden

        const order = await prisma.order.findUnique({
            where: {
                id
            }
        })

        const productsInOrder = orders.map(order => {

            const getProduct = products.filter(product => product.id === order.productId);
            const getProductImage = productImages.filter(productImage => productImage.productId === order.productId);

            console.log(getProduct[0]);

            return {
                id: getProduct[0].id,
                title: getProduct[0].title,
                quantity: order.quantity,
                price: order.price,
                image: getProductImage[0].url,
                size: order.size,
                slug: getProduct[0].slug
            }

        });

        if (!order) {
            throw new Error('No existe la orden');
        }

        if(session.user.role === 'user'){
            if(session.user.id !== order.userId){
                throw `${id} no es de ese usuario`;
            }
        }

        return {
            ok: true,
            orderAddress,
            productsInOrder,
            order
        }

    } catch (error) {

        return {
            ok: false,
            message: 'Orden no existe'
        }
    }
}

