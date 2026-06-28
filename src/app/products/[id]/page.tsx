"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star, Check, Zap, Shield, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100"
          >
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-xl">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <p className="text-blue-600 font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`}
                  />
                ))}
              </div>
              <span className="text-slate-500 text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <div>
                  <span className="text-slate-400 line-through text-lg">${product.originalPrice.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-green-600 font-semibold">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity + Add */}
            {product.inStock ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all ${
                    added ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            ) : (
              <div className="mb-6 py-3 px-6 bg-slate-100 text-slate-500 rounded-xl text-center font-semibold">
                Out of Stock
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
              {[
                { icon: Truck, label: "Free Delivery" },
                { icon: Shield, label: "2yr Warranty" },
                { icon: Zap, label: "Fast Shipping" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
