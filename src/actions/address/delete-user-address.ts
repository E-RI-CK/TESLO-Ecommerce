'use server';

import prisma from "@/lib/prisma";




export const deleteUserAddress = async (userId: string) => {

    const userAddress = await prisma.userAddress.findUnique({
        where: {
            userId
        }
    })

    try {

        if (userAddress) {

            const deletedUserAddress = await prisma.userAddress.delete({
                where: {
                    userId
                }
            })

            return {
                ok: true,
                message: 'UserAddress deleted',
                userAddress: deletedUserAddress
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error('UserAdress no existe');

    }
}