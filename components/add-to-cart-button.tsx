"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";

interface AddToCartButtonProps {
  productId: string;
  selectedOptions?: Record<string, string>;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AddToCartButton({
  productId,
  selectedOptions,
  size = "lg",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  function handleClick() {
    setIsAdding(true);
    addItem(productId, selectedOptions);
    const timeout = setTimeout(() => setIsAdding(false), 300);
    return () => clearTimeout(timeout);
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isAdding}
    >
      {isAdding ? "Added" : "Add to cart"}
    </Button>
  );
}
