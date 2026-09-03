import React from "react";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "./ProductCard";

// Images
import product1 from "../../../assets/images/hero.jpg";


export default function ProductSection() {
  const products = [
    {
      id: 1,
      name: "Performance Air Filter",
      category: "Engine",
      image: product1,
      price: 89,
      oldPrice: 110,
      rating: 4.9,
      isNew: true,
    },
    {
      id: 2,
      name: "Premium Brake Kit",
      category: "Brakes",
      image: product1,
      price: 249,
      oldPrice: 299,
      rating: 4.8,
      isNew: false,
    },
    {
      id: 3,
      name: "LED Headlight Set",
      category: "Lighting",
      image: product1,
      price: 159,
      oldPrice: 189,
      rating: 4.7,
      isNew: true,
    },
    {
      id: 4,
      name: "Alloy Sport Wheels",
      category: "Wheels",
      image: product1,
      price: 499,
      oldPrice: 560,
      rating: 5.0,
      isNew: false,
    },
  ];

  return (
    <section className="bg-[#111111] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-400">
              Featured Collection
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white">
              Best Selling Products
            </h2>

            <p className="mt-3 text-zinc-400 max-w-xl">
              Explore our most popular automotive parts, carefully selected for
              quality, durability, and performance.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-indigo-500 hover:bg-indigo-500">
            View All
            <FiArrowRight />
          </button>
        </div>

        {/* Products */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}