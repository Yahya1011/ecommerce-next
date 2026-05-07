"use client";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Mencegah error hidrasi (perbedaan data server & client)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="w-5 h-5"></span>;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
          {totalItems}
        </span>
      )}
    </>
  );
}
