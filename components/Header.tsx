"use client";
import useCartStore from "@/store/store";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Package2Icon, ShoppingCart } from "lucide-react";
import Link from "next/link";

function Header() {
  const { user } = useUser();
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <header className="flex shadow-lg top-0 left-0 z-50 right-0 justify-between px-6 py-4 items-center mx-6 my-4 border rounded-md">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-zinc-800 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 no-underline"
        >
          Eruotor
        </Link>
      </div>
      <div className="justify-between items-center flex space-x-4 sm:space-x-6">
        <Link
          href="/cart"
          className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 rounded-md bg-zinc-800 hover:bg-zinc-600 p-2 text-zinc-100 "
        >
          <ShoppingCart />
          <span className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        </Link>
        <ClerkLoaded>
          <SignedIn>
            <Link
              href="/orders"
              className="relative flex justify-center sm:justify-start sm:flex-none items-center bg-zinc-800 hover:bg-zinc-600 text-white font-bold p-2 rounded-md"
            >
              <Package2Icon />
              {/*<span className="font-semibold">My Orders</span>*/}
            </Link>
          </SignedIn>
          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton />
              <div className="hidden sm:block text-xs">
                <p className="text-zinc-800">Welcome Back</p>
                <p className="font-bold">{user.fullName}!</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;
