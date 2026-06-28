export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ScotterX Pro 5000",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Electric",
    description: "The ultimate electric scooter for urban commuters. Featuring a powerful 500W motor and 50km range on a single charge.",
    features: ["500W Motor", "50km Range", "LED Lighting", "Disc Brakes", "App Connected"],
    badge: "Best Seller",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "UrbanRider Elite",
    price: 899,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    category: "Electric",
    description: "Sleek and agile city scooter designed for daily commutes with premium suspension and smart connectivity.",
    features: ["350W Motor", "35km Range", "Smart Lock", "USB Charging", "Lightweight"],
    badge: "New",
    rating: 4.6,
    reviews: 87,
    inStock: true,
  },
  {
    id: "3",
    name: "TrailBlazer X",
    price: 1599,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80",
    category: "Off-Road",
    description: "Built for adventure. Conquer any terrain with dual suspension, off-road tires, and a powerful 750W motor.",
    features: ["750W Motor", "60km Range", "Dual Suspension", "Off-road Tires", "Waterproof"],
    badge: "Popular",
    rating: 4.9,
    reviews: 56,
    inStock: true,
  },
  {
    id: "4",
    name: "CitySprint Lite",
    price: 549,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1601758065893-25c11b9a0e37?w=600&q=80",
    category: "Electric",
    description: "Lightweight and foldable — perfect for last-mile commuting. Fits under your desk and in car trunks.",
    features: ["250W Motor", "25km Range", "Foldable", "8.5\" Tires", "Rear Brake"],
    rating: 4.4,
    reviews: 203,
    inStock: true,
  },
  {
    id: "5",
    name: "SpeedDemon S9",
    price: 2199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Performance",
    description: "For the speed enthusiast. Dual motors deliver breathtaking acceleration and a top speed of 65 km/h.",
    features: ["Dual 1000W Motors", "80km Range", "65 km/h Top Speed", "Hydraulic Brakes", "OLED Display"],
    badge: "Premium",
    rating: 4.9,
    reviews: 41,
    inStock: true,
  },
  {
    id: "6",
    name: "EcoGlide Mini",
    price: 399,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    category: "Kids",
    description: "Safe, fun, and eco-friendly scooter for younger riders. Parental speed limit control included.",
    features: ["150W Motor", "15km Range", "Speed Limiter", "LED Deck", "Easy Fold"],
    rating: 4.7,
    reviews: 312,
    inStock: false,
  },
];

export const categories = ["All", "Electric", "Off-Road", "Performance", "Kids"];

export const services = [
  {
    icon: "Wrench",
    title: "Expert Repair & Maintenance",
    description: "Our certified technicians handle everything from battery replacements to full overhauls. Fast turnaround guaranteed.",
    features: ["Same-day minor repairs", "Battery health check", "Firmware updates", "Brake adjustments"],
  },
  {
    icon: "Shield",
    title: "Extended Warranty Plans",
    description: "Protect your investment with our comprehensive warranty plans covering parts, labor, and roadside assistance.",
    features: ["1, 2 & 3-year plans", "Parts & labor covered", "Roadside assistance", "Theft protection"],
  },
  {
    icon: "Zap",
    title: "Performance Upgrades",
    description: "Unlock your scooter's full potential with our certified performance upgrade packages.",
    features: ["Motor upgrades", "Battery capacity boost", "Suspension tuning", "Custom lighting"],
  },
  {
    icon: "Truck",
    title: "Free Delivery & Setup",
    description: "Every purchase includes free delivery to your door and a complimentary setup and orientation session.",
    features: ["Free nationwide delivery", "Door-to-door service", "Setup & orientation", "Test ride guidance"],
  },
  {
    icon: "GraduationCap",
    title: "Riding School",
    description: "New to electric scooters? Our certified instructors will have you riding confidently and safely.",
    features: ["Beginner sessions", "Safety certification", "Advanced techniques", "Group discounts"],
  },
  {
    icon: "RefreshCw",
    title: "Trade-In Program",
    description: "Upgrade your ride with our hassle-free trade-in program. Get top value for your old scooter.",
    features: ["Free appraisal", "Instant credit", "Any brand accepted", "Eco-friendly recycling"],
  },
];
