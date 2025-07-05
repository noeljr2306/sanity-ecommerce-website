"use client";
import AddToCartButton from "@/components/AddToCartButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useCartStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createCheckoutSession, Metadata } from "@/action/createCheckoutSession";


function CartPage() {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if(checkoutUrl){
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-zinc-800">Your Cart</h1>
        <p className="text-zinc-500 text-lg">Your cart is empty</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              className="mb-4 p-4 border rounded flex items-center justify-between"
              key={item.product._id}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                {item.product.image && (
                  <Image
                    alt={item.product.name ?? "Product Image"}
                    src={imageUrl(item.product.image).url()}
                    className="w-full h-full object-cover rounded"
                    width={96}
                    height={96}
                  />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                  {item.product.name}
                </h2>
                <p className="text-sm sm:text-base">
                  Price: ₦
                  {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToCartButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-first fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>₦{useCartStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-zinc-300"
            >
              {isLoading ? "processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign In to checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
}
export default CartPage;
