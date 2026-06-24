"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, Truck, RefreshCw, Shield, Leaf, ChevronRight, Heart, Sparkles, Check } from 'lucide-react';
import { products, productCategories, brand, type ProductCategory } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over $60. Express options available at checkout.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return anything within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "256-bit SSL encryption and trusted payment partners keep every transaction safe.",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description: "Every product is vetted for ethical production and environmental responsibility.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Lindqvist",
    location: "Stockholm",
    avatar: "https://8billiontrees.com/wp-content/uploads/2022/08/what-does-sustainably-sourced-mean.png",
    rating: 5,
    text: "The ceramic pour-over set transformed my morning ritual. The craftsmanship is extraordinary — every detail feels intentional.",
    product: "Ceramic Pour-Over Set",
  },
  {
    id: 2,
    name: "James Okafor",
    location: "London",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    text: "I've ordered from Lumière three times now. The quality is consistently exceptional and the packaging is genuinely beautiful.",
    product: "Leather Card Wallet",
  },
  {
    id: 3,
    name: "Suki Tanaka",
    location: "Tokyo",
    avatar: "https://covers.libro.fm/9781792227080_1120.jpg",
    rating: 5,
    text: "The linen throw blanket is softer than I imagined. It's become the centrepiece of my living room and I get compliments constantly.",
    product: "Linen Throw Blanket",
  },
];

const collections = [
  {
    id: 1,
    title: "Morning Rituals",
    subtitle: "Start the day with intention",
    image: "https://cdn.sanity.io/images/ruord509/production/a270bb6acf40cc4b121fd220b4274aa798ce2660-800x800.jpg?w=3840&q=75&fit=clip&auto=format",
    count: 12,
    accent: "bg-amber-50",
    textAccent: "text-amber-700",
  },
  {
    id: 2,
    title: "Calm & Restore",
    subtitle: "Wellness for the modern home",
    image: "https://media.ulta.com/i/ulta/2570004?w=500&h=500",
    count: 9,
    accent: "bg-emerald-50",
    textAccent: "text-emerald-700",
  },
  {
    id: 3,
    title: "Desk Edit",
    subtitle: "Elevate your workspace",
    image: "https://media.ulta.com/i/ulta/2570004?w=500&h=500",
    count: 7,
    accent: "bg-indigo-50",
    textAccent: "text-indigo-700",
  },
];

const badgeStyles: Record<string, string> = {
  New: "bg-indigo-600 text-white",
  Sale: "bg-rose-500 text-white",
  Bestseller: "bg-amber-500 text-white",
  Limited: "bg-slate-800 text-white",
};

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

const imageScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-slate-50">
          <motion.img
            variants={imageScale}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                badgeStyles[product.badge] ?? "bg-slate-800 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWished((w) => !w)}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
              }`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-slate-900">${product.price}</span>
              {product.originalPrice != null && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-indigo-600 transition-colors duration-200"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-20">
        {/* Subtle mesh glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/80 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  New arrivals for Spring 2025
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance"
              >
                Objects worth
                <br />
                <span className="text-indigo-600">living with.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
              >
                {brand.tagline}. Every piece in our collection is chosen for its
                craft, longevity, and quiet beauty — things that earn their place
                in your home.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                >
                  {brand.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#collections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                >
                  View Collections
                  <ChevronRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 pt-2"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-200 to-indigo-400 overflow-hidden"
                    >
                      <img
                        src={`/images/avatar-customer-${i}.jpg`}
                        alt={`Customer ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Loved by <span className="font-semibold text-slate-700">4,200+</span> customers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right image grid */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                  <img
                    src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                    alt="Ceramic Pour-Over Set"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]">
                  <img
                    src="https://buffalojackson.com/cdn/shop/files/roosevekt-buffalo-leather-grain-ID-wallet-1-lifestyle_2000x.jpg?v=1755630456"
                    alt="Leather Card Wallet"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]">
                  <img
                    src="https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg"
                    alt="Linen Throw Blanket"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                  <img
                    src="https://m.media-amazon.com/images/I/61tJfrHcROL._AC_UF1000,1000_QL80_.jpg"
                    alt="Lavender Sleep Mist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] border border-black/5 flex items-center gap-3"
              >
                <span className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Sustainably made</p>
                  <p className="text-xs text-slate-500">Carbon-neutral shipping</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <vp.icon className="w-5 h-5 text-indigo-600" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{vp.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5 hidden sm:block">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
                The Collection
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                Thoughtfully chosen,
                <br />
                <span className="text-slate-500 font-normal">beautifully made.</span>
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group flex-shrink-0"
            >
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-2 flex-wrap mb-8"
          >
            {productCategories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Product grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COLLECTIONS ──────────────────────────────────────────────────── */}
      <section id="collections" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Curated Edits
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Shop by collection.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={i === 1 ? scaleIn : fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                  i === 1 ? "md:mt-8" : ""
                }`}
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px -8px rgba(0,0,0,0.12)" }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${col.accent} ${col.textAccent}`}>
                    {col.count} products
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{col.title}</h3>
                  <p className="text-sm text-white/70 mb-4">{col.subtitle}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-200">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / BRAND STORY ──────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]">
                <img
                  src="https://runescape.wiki/images/thumb/Artisans%27_Workshop.png/1200px-Artisans%27_Workshop.png?415e7"
                  alt="Artisan workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stat card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 -bottom-6 bg-indigo-600 rounded-2xl p-5 shadow-xl"
              >
                <p className="text-3xl font-bold text-white">120+</p>
                <p className="text-sm text-indigo-200 mt-0.5">Independent makers</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeInUp} className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                Our Story
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
                Made by hands,
                <br />chosen with care.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Lumière began as a search for objects that last. We partner with
                independent artisans and small-batch studios across Europe and
                Asia, selecting only pieces that meet our standards for material
                quality, ethical production, and enduring design.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Every product is tested in our homes before it reaches yours. We
                believe the best things are made slowly, with intention — and
                that your space deserves nothing less.
              </motion.p>
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                {[
                  { value: "2019", label: "Founded" },
                  { value: "4.8★", label: "Avg. rating" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
              <motion.a
                variants={fadeInUp}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors duration-200 shadow-[0_4px_16px_rgba(99,102,241,0.4)]"
              >
                Shop the collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Customer Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Loved by those who live well.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4 ${
                  i === 1 ? "md:mt-6" : ""
                }`}
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.location} &middot; {t.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-16 md:py-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/40 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-700/40 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Free shipping on orders over $60
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance leading-tight"
            >
              Your home deserves
              <br />something beautiful.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-200 text-lg max-w-xl text-pretty">
              Join over 4,200 customers who have found their favourite everyday
              objects at Lumière. New arrivals every week.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap justify-center">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Browse Collections
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}