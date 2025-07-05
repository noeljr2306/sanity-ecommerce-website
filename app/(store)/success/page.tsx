"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-zinc-100 p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="text-green-600" />
          </div>
        </div>
        <h1 className="text-xl font-bold mb-6 text-center">
          Thank you for your order!
        </h1>
        <div className="border-t border-b border-zinc-200 py-6 mb-6">
          <p className="text-lg text-zinc-600 mb-4 text-center">
            Your order has been confirmed and will be shipped shortly.
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-zinc-600 flex items-center space-x-5">
                <span>Order Number:</span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-zinc-600 text-center">
            A confirmation email has been sent to your registered email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-zinc-800 hover:bg-zinc-700">
              <Link href="/orders">View order details</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;
