export const revalidate = 60; //60 segundos revalidar

import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";



interface Props {
    params: {
        gender: Gender
    }
}

export default async function OrderByGenderPage({ params }: Props) {

    const { gender } = params;
    const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({gender});

    const allowedCategories = ['men', 'women', 'kid'];

    if (!allowedCategories.includes(gender)) {
        notFound();
    }

    const labels: { [key in Category]: string } = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'Unisex'
    }
    
    return (
        <>
            <Title
                title={`Artículos de ${labels[gender]}`}
                subTitle='Todos los productos'
                className="mb-2"
            />
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </>
    );
}