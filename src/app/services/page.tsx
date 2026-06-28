"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  Shield,
  Zap,
  Truck,
  GraduationCap,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Shield,
  Zap,
  Truck,
  GraduationCap,
  RefreshCw,
};

const plans = [
  {
    name: "Basic",
    price: 99,
    period: "/year",
    features: [
      "Annual tune-up",
      "Tire pressure check",
      "Brake adjustment",
      "Software updates",
      "Email support",
    ],
    cta: "Get Basic",
    highlight: false,
  },
  {
    name: "Pro",
    price: 249,
    period: "/year",
    features: [
      "Everything in Basic",
      "Quarterly maintenance",
      "Battery health report",
      "Priority booking",
      "Phone & chat support",
      "10% parts discount",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: 499,
    period: "/year",
    features: [
      "Everything in Pro",
      "Monthly maintenance",
      "Free minor repairs",
      "Loaner scooter",
      "Dedicated account manager",
      "25% parts discount",
    ],
    cta: "Get Elite",
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            World-Class Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg max-w-xl mx-auto"
          >
            From purchase to maintenance, we&apos;re with you every mile of the journey.
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-slate-100 hover:border-blue-100 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  {Icon && <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Maintenance Plans */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Maintenance Plans</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              Choose Your Coverage
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Protect your scooter and ride worry-free with our flexible maintenance plans.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 border-2 transition-all ${
                  plan.highlight
                    ? "bg-blue-600 border-blue-600 shadow-2xl shadow-blue-200 scale-105"
                    : "bg-white border-slate-200 hover:border-blue-300"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`} />
                      <span className={plan.highlight ? "text-blue-100" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-xl font-bold transition-all ${
                    plan.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-extrabold mb-4">Need Custom Service?</h2>
          <p className="text-blue-100 mb-6">
            Our experts are ready to create a tailored service plan just for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-bold transition-all"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
