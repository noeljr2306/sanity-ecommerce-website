"use client"
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function HydrationLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <Loader />;
  }

  return <>{children}</>;
}
