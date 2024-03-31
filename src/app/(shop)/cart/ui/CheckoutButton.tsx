'use client';

import { Address } from "@/interfaces";
import { useAddressStore } from "@/store";
import { redirect, useRouter } from "next/navigation";


interface Props {
  userAddress: Address | undefined
}

export const CheckoutButton = ({ userAddress }: Props) => {

  const setAddress = useAddressStore(state => state.setAddress);
  const router = useRouter();

  const onCheckout = () => {
    setAddress(userAddress!);
    router.push("/checkout/address");
  }

  return (
    <div className="mt-5 mb-2 w-full">
      <button
        className="flex btn-primary justify-center"
        onClick={onCheckout}
      //href="/checkout/address"
      >
        Checkout
      </button>
    </div >
  )
}
