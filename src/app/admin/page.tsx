"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronUp,
  Zap,
} from "lucide-react";
import { products } from "@/lib/data";

const stats = [
  { label: "Total Revenue", value: "$48,294", change: "+12.5%", up: true, icon: DollarSign, color: "blue" },
  { label: "Orders", value: "284", change: "+8.2%", up: true, icon: ShoppingCart, color: "green" },
  { label: "Customers", value: "1,429", change: "+5.1%", up: true, icon: Users, color: "purple" },
  { label: "Avg Order Value", value: "$1,203", change: "-2.3%", up: false, icon: TrendingUp, color: "amber" },
];

const recentOrders = [
  { id: "#ORD-1042", customer: "Alex Johnson", product: "ScotterX Pro 5000", amount: 1299, status: "Delivered", date: "Jun 26" },
  { id: "#ORD-1041", customer: "Sarah Chen", product: "TrailBlazer X", amount: 1599, status: "Shipped", date: "Jun 25" },
  { id: "#ORD-1040", customer: "Marcus Rivera", product: "UrbanRider Elite", amount: 899, status: "Processing", date: "Jun 25" },
  { id: "#ORD-1039", customer: "Emma Wilson", product: "CitySprint Lite", amount: 549, status: "Delivered", date: "Jun 24" },
  { id: "#ORD-1038", customer: "James Brown", product: "SpeedDemon S9", amount: 2199, status: "Pending", date: "Jun 24" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-slate-100 text-slate-700",
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Products" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Users, label: "Customers" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex pt-16">
      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-slate-900 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">ScotterBikes</p>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === item.label
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <div>
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-slate-400 text-xs">admin@scotterbikes.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 overflow-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                  <ChevronUp className={`w-3.5 h-3.5 ${!stat.up ? "rotate-180" : ""}`} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Recent Orders</h2>
                <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase border-b border-slate-50">
                      <th className="px-5 py-3 text-left">Order</th>
                      <th className="px-5 py-3 text-left">Customer</th>
                      <th className="px-5 py-3 text-left hidden md:table-cell">Product</th>
                      <th className="px-5 py-3 text-right">Amount</th>
                      <th className="px-5 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-mono text-blue-600">{order.id}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-700">{order.customer}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-500 hidden md:table-cell">{order.product}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 text-right">${order.amount.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Top Products</h2>
              <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                    <p className="text-xs text-blue-600">${product.price.toLocaleString()}</p>
                  </div>
                  <div className="hidden group-hover:flex items-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
