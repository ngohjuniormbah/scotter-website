"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Star,
  ChevronRight,
  Battery,
  Gauge,
  Wind,
  Wrench,
  RefreshCw,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Play,
  Quote,
  Award,
  HeartHandshake,
  Leaf,
  Clock,
  Send,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

/* ─── helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.6, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

/* ─── data ─────────────────────────────────────────────── */
const stats = [
  { value: "10K+", label: "Happy Riders" },
  { value: "50+", label: "Models Available" },
  { value: "4.9★", label: "Average Rating" },
  { value: "5yr", label: "Warranty" },
];

const features = [
  { icon: Zap, title: "Powerful Performance", desc: "Motors up to 1000W delivering instant torque and smooth acceleration." },
  { icon: Battery, title: "Long-Lasting Battery", desc: "Ride up to 80 km on a single charge with our advanced lithium cells." },
  { icon: Shield, title: "Safety First", desc: "Dual braking systems, LED lighting, and IP67 waterproof ratings." },
  { icon: Truck, title: "Free Delivery", desc: "Every order ships free with door-to-door setup included." },
  { icon: Gauge, title: "Top Speed", desc: "Up to 65 km/h — get there fast without breaking a sweat." },
  { icon: Wind, title: "Eco Friendly", desc: "Zero emissions — reduce your carbon footprint every single ride." },
  { icon: Wrench, title: "Easy Maintenance", desc: "Modular parts design makes servicing quick, simple, and affordable." },
  { icon: Award, title: "Award Winning", desc: "Recognized by Green Mobility Awards 2024 for innovation and design." },
];

const services = [
  { icon: Wrench, title: "Expert Repair", desc: "Same-day minor repairs by certified technicians at our service centres.", color: "blue" },
  { icon: Shield, title: "Warranty Plans", desc: "Comprehensive 1–3 year plans covering parts, labour and roadside assist.", color: "indigo" },
  { icon: Zap, title: "Performance Upgrades", desc: "Motor boosts, battery upgrades and suspension tuning for thrill-seekers.", color: "violet" },
  { icon: GraduationCap, title: "Riding School", desc: "Learn to ride safely and confidently with our certified instructors.", color: "cyan" },
  { icon: Truck, title: "Free Delivery", desc: "Nationwide door-to-door delivery and complimentary setup session.", color: "teal" },
  { icon: RefreshCw, title: "Trade-In Program", desc: "Instant credit for your old scooter — any brand accepted, free appraisal.", color: "sky" },
];

const team = [
  { name: "Jordan Miles", role: "Founder & CEO", bio: "15 years in electric mobility. Passionate about sustainable urban transport.", initials: "JM", grad: "from-blue-500 to-blue-700" },
  { name: "Priya Sharma", role: "Head of Engineering", bio: "Former Tesla engineer. Leads the R&D team behind our flagship motors.", initials: "PS", grad: "from-violet-500 to-violet-700" },
  { name: "Lucas Okafor", role: "Chief Design Officer", bio: "Award-winning industrial designer shaping the future of e-scooter aesthetics.", initials: "LO", grad: "from-cyan-500 to-cyan-700" },
  { name: "Mei-Lin Park", role: "Customer Experience Lead", bio: "Dedicated to making every rider's journey smooth from first click to first ride.", initials: "ML", grad: "from-teal-500 to-teal-700" },
];

const testimonials = [
  { name: "Alex Johnson", role: "Daily Commuter, NYC", text: "My ScotterX Pro transformed my morning commute. I arrive fresh, on time, and I'm saving $200/month on fuel!", rating: 5, avatar: "AJ" },
  { name: "Sarah Chen", role: "Urban Explorer, LA", text: "The build quality is incredible. I've had mine for 2 years and it still rides like new. Best investment ever.", rating: 5, avatar: "SC" },
  { name: "Marcus Rivera", role: "Weekend Rider, Miami", text: "The TrailBlazer handles everything I throw at it. Mud, gravel, hills — it's a beast on any terrain.", rating: 5, avatar: "MR" },
  { name: "Emma Wilson", role: "Eco Commuter, Chicago", text: "Zero emissions and zero regrets. I've convinced three colleagues to switch to ScotterBikes already.", rating: 5, avatar: "EW" },
  { name: "Daniel Kim", role: "Delivery Rider, Seattle", text: "Reliable, fast, and the customer service team is phenomenal. They fixed an issue same-day. Unreal.", rating: 5, avatar: "DK" },
  { name: "Sofia Torres", role: "Student, Austin", text: "Lightweight, foldable, and fits under my desk at uni. The CitySprint Lite is literally perfect for campus.", rating: 5, avatar: "ST" },
];

const whyUs = [
  { icon: HeartHandshake, title: "Rider-First Philosophy", desc: "Every product decision starts with one question: does it make the rider's life better?" },
  { icon: Leaf, title: "Sustainable by Design", desc: "Fully recyclable packaging, carbon-offset logistics, and bikes built to last a decade." },
  { icon: Award, title: "Industry Recognition", desc: "Winner of the Green Mobility Innovation Award 2023 and 2024." },
  { icon: Clock, title: "24/7 Support", desc: "Our rider support team is available around the clock — call, chat or email anytime." },
];

const brands = ["Bosch", "Samsung SDI", "Shimano", "Brembo", "Continental", "LG Chem"];

const faqs = [
  { q: "How far can I ride on a single charge?", a: "Depending on the model, our scooters offer a range of 25–80 km per charge. The ScotterX Pro 5000 leads with 50 km and the SpeedDemon S9 reaches 80 km." },
  { q: "Do you offer financing options?", a: "Yes! We partner with major lenders to offer 0% APR for 12 months on orders over $500. Apply at checkout in under 2 minutes." },
  { q: "What's included with every purchase?", a: "Every scooter comes with a charger, helmet discount voucher, free delivery, and a 30-minute setup & orientation session with one of our experts." },
  { q: "Is servicing expensive?", a: "Basic maintenance is very affordable — most services cost under $50. Our Pro and Elite maintenance plans give you unlimited minor repairs for a flat annual fee." },
  { q: "Can I ride in rain?", a: "All of our models carry at minimum an IP54 rating (splash-proof). Our premium models are IP67-rated and fully waterproof for riding in heavy rain." },
];

/* ─── animated counter ─────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          1. HERO — centered
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        {/* grid bg */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* glows */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium px-5 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4" /> New 2025 Models — Free Delivery This Month
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-6">
            Ride the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-pulse">
              Future
            </span>
            of Mobility
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Premium electric scooters engineered for performance, style, and sustainability. Join 10,000+ riders redefining urban travel.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-2 border border-slate-500 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              <Play className="w-5 h-5 fill-current" /> Watch Video
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-700/60">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-4 text-white">
            <p className="text-xs text-slate-400 mb-0.5">Top Speed</p>
            <p className="text-2xl font-extrabold">65 km/h</p>
          </div>
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-4 text-white">
            <p className="text-xs text-slate-400 mb-0.5">Range</p>
            <p className="text-2xl font-extrabold">80 km</p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none"><path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40L0 80Z" fill="#f8fafc" /></svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. PARTNER BRANDS
      ══════════════════════════════════════════════════ */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm font-medium uppercase tracking-widest mb-6">Powered by world-class components from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {brands.map((b, i) => (
              <motion.span key={b} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-slate-400 font-bold text-lg hover:text-blue-600 transition-colors cursor-default">
                {b}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. WHY SCOTTER — 8-feature grid
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why ScotterBikes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Built for the Modern Rider</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Every component, every curve, every line of firmware — engineered with one goal in mind.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.06)} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group cursor-default">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                  <f.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. ABOUT US
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div {...fadeUp()} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&q=80" alt="Our story" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent" />
              </div>
              {/* stat badge */}
              <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }} className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-2xl px-7 py-5 shadow-xl">
                <p className="text-4xl font-extrabold"><Counter target={10} suffix="K+" /></p>
                <p className="text-blue-200 text-sm">Riders worldwide</p>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <div>
              <motion.span {...fadeUp(0.1)} className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</motion.span>
              <motion.h2 {...fadeUp(0.15)} className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                We Started with a Simple Belief — Cities Should Move Smarter
              </motion.h2>
              <motion.p {...fadeUp(0.2)} className="text-slate-600 leading-relaxed mb-4">
                Founded in 2019 by a team of engineers and urban planners, ScotterBikes was born from frustration with gridlocked cities and polluted air. We believed there had to be a better way to move through the city — faster, cleaner, and more joyful.
              </motion.p>
              <motion.p {...fadeUp(0.25)} className="text-slate-600 leading-relaxed mb-8">
                Today, with over 10,000 riders in 30+ cities, we&apos;re proud to be one of the fastest-growing electric scooter brands in North America. Every bike we build carries that founding belief: cities deserve better, and so do the people who live in them.
              </motion.p>
              <motion.div {...fadeUp(0.3)} className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { n: 10, s: "K+", l: "Riders globally" },
                  { n: 30, s: "+", l: "Cities covered" },
                  { n: 50, s: "+", l: "Scooter models" },
                  { n: 98, s: "%", l: "Customer satisfaction" },
                ].map((item) => (
                  <div key={item.l} className="bg-blue-50 rounded-xl p-4">
                    <p className="text-2xl font-extrabold text-blue-700"><Counter target={item.n} suffix={item.s} /></p>
                    <p className="text-sm text-slate-600 mt-0.5">{item.l}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fadeUp(0.35)}>
                <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
                  Discover Our Fleet <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. ANIMATED STATS BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { target: 10000, suffix: "+", label: "Happy Riders" },
              { target: 50, suffix: "+", label: "Models" },
              { target: 30, suffix: "+", label: "Cities" },
              { target: 4, suffix: ".9★", label: "Avg Rating" },
            ].map((s) => (
              <motion.div key={s.label} {...fadeUp()}>
                <p className="text-4xl md:text-5xl font-extrabold"><Counter target={s.target} suffix={s.suffix} /></p>
                <p className="text-blue-200 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. FEATURED PRODUCTS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <motion.div {...fadeUp()}>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Featured Scooters</h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <Link href="/products" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                View All Products <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. SERVICES PREVIEW
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Everything You Need, Under One Roof</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">From first purchase to long-term ownership — we&apos;ve got you covered at every step.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.07)} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group">
                <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-5 transition-colors">
                  <s.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link href="/services" className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3.5 rounded-xl font-bold transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">How It Works</h2>
            <p className="text-slate-500 mt-3">From click to first ride in 4 simple steps.</p>
          </motion.div>
          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Browse & Choose", desc: "Explore our full range and find the perfect match for your lifestyle." },
                { step: "02", title: "Order Online", desc: "Secure checkout in minutes. Multiple payment & financing options." },
                { step: "03", title: "We Deliver", desc: "Free door-to-door delivery, fully assembled and ready to ride." },
                { step: "04", title: "Ride & Enjoy", desc: "Hit the road with a free orientation session from our team." },
              ].map((item, i) => (
                <motion.div key={item.step} {...fadeUp(i * 0.1)} className="text-center">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold shadow-lg shadow-blue-200 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Why Thousands Choose ScotterBikes</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <motion.div key={w.title} {...fadeUp(i * 0.1)} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-white hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center mb-5">
                  <w.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">{w.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. MEET THE TEAM
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">The People Behind the Brand</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Meet Our Team</h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">Passionate engineers, designers, and riders united by a mission to change the way cities move.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.1)} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.grad} flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-5 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          11. TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">What People Say About Us</h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">Real riders, real stories. Over 10,000 five-star reviews and counting.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.08)} className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-all group relative">
                <Quote className="w-8 h-8 text-blue-100 group-hover:text-blue-200 absolute top-6 right-6 transition-colors" />
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-5 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          12. FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Common Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <span className={`w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          13. CONTACT STRIP
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: info */}
            <motion.div {...fadeUp()}>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Have Questions? We&apos;d Love to Hear from You</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Whether you&apos;re ready to buy, need advice, or just want to chat about scooters — our team is standing by.</p>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Visit Us", val: "123 Scooter Street, Urban District, NY 10001" },
                  { icon: Phone, label: "Call Us", val: "+1 (555) 123-4567" },
                  { icon: Mail, label: "Email Us", val: "hello@scotterbikes.com" },
                  { icon: Clock, label: "Hours", val: "Mon–Fri 9am–6pm · Sat 10am–4pm" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-slate-800 font-medium">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                {["Email", "Phone", "Live Chat"].map((m) => (
                  <span key={m} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> {m}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: mini form */}
            <motion.div {...fadeUp(0.15)}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                {contactSent ? (
                  <div className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
                    <button onClick={() => setContactSent(false)} className="mt-4 text-blue-600 font-semibold text-sm hover:underline">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Send a Message</h3>
                    <input required type="text" placeholder="Your name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400 text-sm" />
                    <input required type="email" placeholder="Your email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400 text-sm" />
                    <textarea required rows={4} placeholder="How can we help?" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder-slate-400 text-sm resize-none" />
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition-all">
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          14. FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <motion.div {...fadeUp()} className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Start Your Electric Journey Today</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of happy riders. Free delivery on all orders. 30-day money-back guarantee.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-xl">
              Shop the Collection
            </Link>
            <Link href="/contact" className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              Talk to an Expert
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
