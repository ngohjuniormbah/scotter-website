"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                {product.badge}
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                <span className="bg-white text-slate-700 font-semibold px-4 py-1.5 rounded-xl text-sm">
                  Out of Stock
                </span>
              </div>
            )}
            <button
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-5">
            <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
            <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-3">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">({product.reviews})</span>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through ml-2">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : product.inStock
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added!" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
