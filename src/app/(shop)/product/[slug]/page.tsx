export const revalidate = 86400; //Revalidación en 1 dia


import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encotrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encotrado',
      description: product?.description ?? '',
      //images:[],//https://misitioweb.com/products/prod-1/image.png,
      images: [`/products/${product?.images[1]}`]
    }
  }
}


export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/*SlideShow */}
      <div className="col-span-1 md:col-span-2 ">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="sm:hidden overflow-hidden"
        />


        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden sm:block max-w-[90vw]"
        />

      </div>

      {/*Detalles */}
      <div className="col-span-1 px-7 py-4 w-[95%] sm:w-[95vw] md:w-[auto] max-w-[100%]">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product}/>

        {/*Descripción */}

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light max-w-full">
          {product.description}
        </p>
      </div>
    </div>
  )
}
