export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold?: number;
  description?: string;
  specs?: Record<string, string>;
  reviews?: Review[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const allProducts: Product[] = [
  // Flash sale products
  { id: 1, name: "Wireless Earbuds Pro", price: 29.99, originalPrice: 79.99, image: "🎧", rating: 4.5, sold: 234,
    description: "Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and IPX5 water resistance. Perfect for workouts and commuting.",
    specs: { "Battery Life": "30 hours", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX5", "Driver Size": "12mm", "Weight": "5.4g per earbud" },
    reviews: [
      { id: 1, author: "James M.", rating: 5, date: "2026-02-15", comment: "Best earbuds I've ever owned at this price. The noise cancellation is surprisingly good.", verified: true },
      { id: 2, author: "Sarah K.", rating: 4, date: "2026-02-10", comment: "Great sound quality. Fit could be slightly better for smaller ears.", verified: true },
      { id: 3, author: "David L.", rating: 5, date: "2026-01-28", comment: "Incredible value. Battery lasts forever!", verified: false },
    ],
  },
  { id: 2, name: "Smart Watch Series 5", price: 89.99, originalPrice: 199.99, image: "⌚", rating: 4.3, sold: 189,
    description: "Track your fitness goals with heart rate monitoring, GPS, sleep tracking, and 100+ workout modes. Beautiful AMOLED display with always-on option.",
    specs: { "Display": "1.4\" AMOLED", "Battery": "7 days", "Water Resistance": "5 ATM", "Sensors": "Heart rate, SpO2, GPS" },
    reviews: [
      { id: 4, author: "Mike R.", rating: 4, date: "2026-02-12", comment: "Solid smartwatch for the price. GPS accuracy is great.", verified: true },
      { id: 5, author: "Emily T.", rating: 5, date: "2026-02-01", comment: "Love the sleep tracking feature!", verified: true },
    ],
  },
  { id: 3, name: "Portable Bluetooth Speaker", price: 19.99, originalPrice: 49.99, image: "🔊", rating: 4.7, sold: 456,
    description: "Compact yet powerful speaker with 360° surround sound, 20-hour playtime, and rugged waterproof design for any adventure.",
    specs: { "Power": "20W", "Battery": "20 hours", "Waterproof": "IP67", "Weight": "540g" },
    reviews: [
      { id: 6, author: "Alex P.", rating: 5, date: "2026-02-20", comment: "Unbelievable sound for such a small speaker!", verified: true },
    ],
  },
  { id: 4, name: "USB-C Fast Charger 65W", price: 14.99, originalPrice: 39.99, image: "🔌", rating: 4.6, sold: 312,
    description: "GaN technology delivers 65W of power in an ultra-compact design. Charges laptops, phones, and tablets simultaneously.",
    specs: { "Output": "65W PD 3.0", "Ports": "2x USB-C, 1x USB-A", "Technology": "GaN III" },
    reviews: [
      { id: 7, author: "Chris W.", rating: 5, date: "2026-02-18", comment: "Tiny charger that powers my MacBook. Amazing!", verified: true },
    ],
  },
  { id: 5, name: "Laptop Stand Adjustable", price: 24.99, originalPrice: 59.99, image: "💻", rating: 4.4, sold: 178,
    description: "Ergonomic aluminum laptop stand with 6 adjustable height levels. Improves posture and keeps your laptop cool.",
    specs: { "Material": "Aluminum Alloy", "Compatibility": "10-17\" laptops", "Adjustable Heights": "6 levels" },
    reviews: [],
  },
  { id: 6, name: "LED Desk Lamp", price: 18.99, originalPrice: 44.99, image: "💡", rating: 4.2, sold: 267,
    description: "Eye-caring LED desk lamp with 5 color temperatures, 10 brightness levels, USB charging port, and 1-hour auto-off timer.",
    specs: { "Brightness": "10 levels", "Color Temps": "5 modes", "Power": "12W LED" },
    reviews: [
      { id: 8, author: "Lisa N.", rating: 4, date: "2026-01-25", comment: "Nice lamp, good for reading at night.", verified: true },
    ],
  },
  // Featured products
  { id: 10, name: "iPhone 15 Pro Max 256GB", price: 999.99, originalPrice: 1199.99, image: "📱", rating: 4.8, sold: 1245,
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, 48MP camera system, and all-day battery life. Action button for instant access to your favorite features.",
    specs: { "Chip": "A17 Pro", "Storage": "256GB", "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto", "Display": "6.7\" Super Retina XDR", "Battery": "All-day" },
    reviews: [
      { id: 9, author: "Tom H.", rating: 5, date: "2026-02-22", comment: "Best phone I've ever used. Camera is incredible.", verified: true },
      { id: 10, author: "Anna S.", rating: 4, date: "2026-02-14", comment: "Great phone but pricey. Titanium feels premium.", verified: true },
      { id: 11, author: "Mark J.", rating: 5, date: "2026-02-05", comment: "Action button is more useful than I expected!", verified: true },
      { id: 12, author: "Rachel B.", rating: 5, date: "2026-01-30", comment: "Switched from Android, no regrets.", verified: false },
    ],
  },
  { id: 11, name: "Samsung Galaxy S24 Ultra", price: 879.99, originalPrice: 1099.99, image: "📱", rating: 4.7, sold: 987,
    description: "Galaxy AI built in. Titanium frame, 200MP camera, S Pen included, and the brightest display ever on a Galaxy phone.",
    specs: { "Chip": "Snapdragon 8 Gen 3", "Storage": "256GB", "Camera": "200MP", "Display": "6.8\" Dynamic AMOLED 2X" },
    reviews: [
      { id: 13, author: "Kevin D.", rating: 5, date: "2026-02-19", comment: "Galaxy AI features are game-changing!", verified: true },
      { id: 14, author: "Priya M.", rating: 4, date: "2026-02-08", comment: "Amazing camera, S Pen is super handy.", verified: true },
    ],
  },
  { id: 12, name: "Nike Air Max 270 Running Shoes", price: 89.99, originalPrice: 149.99, image: "👟", rating: 4.5, sold: 2345,
    description: "Max Air unit delivers unrivaled comfort. Mesh upper for breathability and sleek modern design for everyday wear.",
    specs: { "Upper": "Engineered mesh", "Sole": "Max Air 270 unit", "Closure": "Lace-up" },
    reviews: [
      { id: 15, author: "Jordan T.", rating: 5, date: "2026-02-21", comment: "Most comfortable shoes I own!", verified: true },
    ],
  },
  { id: 13, name: "Sony WH-1000XM5 Headphones", price: 249.99, originalPrice: 349.99, image: "🎧", rating: 4.9, sold: 567,
    description: "Industry-leading noise cancellation with 8 microphones and Auto NC Optimizer. Crystal clear hands-free calling and 30-hour battery.",
    specs: { "Driver": "30mm", "Battery": "30 hours", "ANC": "8 microphones", "Weight": "250g" },
    reviews: [
      { id: 16, author: "Nina C.", rating: 5, date: "2026-02-23", comment: "The gold standard for noise-cancelling headphones.", verified: true },
      { id: 17, author: "Sam W.", rating: 5, date: "2026-02-16", comment: "Worth every penny. Sound quality is outstanding.", verified: true },
    ],
  },
  { id: 14, name: "MacBook Air M3 13-inch", price: 1049.99, originalPrice: 1299.99, image: "💻", rating: 4.8, sold: 432,
    description: "Supercharged by M3 chip. Up to 18 hours of battery life. Stunningly thin design with Liquid Retina display.",
    specs: { "Chip": "Apple M3", "Memory": "8GB", "Storage": "256GB SSD", "Display": "13.6\" Liquid Retina" },
    reviews: [
      { id: 18, author: "Laura F.", rating: 5, date: "2026-02-17", comment: "Fanless, silent, and blazing fast.", verified: true },
    ],
  },
  { id: 15, name: "Dyson V15 Detect Vacuum", price: 499.99, originalPrice: 749.99, image: "🧹", rating: 4.6, sold: 876,
    description: "Laser reveals microscopic dust. Piezo sensor auto-adjusts suction. Up to 60 minutes of runtime.",
    specs: { "Runtime": "60 min", "Suction": "240 AW", "Bin Volume": "0.76L" },
    reviews: [
      { id: 19, author: "Helen G.", rating: 5, date: "2026-02-11", comment: "The laser feature is addictive. My floors have never been cleaner!", verified: true },
    ],
  },
  { id: 16, name: 'Samsung 65" 4K Smart TV', price: 599.99, originalPrice: 899.99, image: "📺", rating: 4.4, sold: 654,
    description: "Crystal UHD 4K processor with HDR10+. Smart TV with built-in voice assistants and AirSlim design.",
    specs: { "Resolution": "4K UHD", "HDR": "HDR10+", "Smart TV": "Tizen OS", "Size": "65 inches" },
    reviews: [],
  },
  { id: 17, name: "PS5 DualSense Controller", price: 49.99, originalPrice: 69.99, image: "🎮", rating: 4.7, sold: 3456,
    description: "Haptic feedback and adaptive triggers bring games to life. Built-in microphone and ergonomic design.",
    specs: { "Connectivity": "Bluetooth 5.1 / USB-C", "Battery": "12 hours", "Features": "Haptic feedback, Adaptive triggers" },
    reviews: [
      { id: 20, author: "Ryan P.", rating: 5, date: "2026-02-20", comment: "The adaptive triggers are mind-blowing!", verified: true },
    ],
  },
  { id: 18, name: "Instant Pot 8-Quart", price: 79.99, originalPrice: 119.99, image: "🍳", rating: 4.5, sold: 1234,
    description: "7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    specs: { "Capacity": "8 Quart", "Programs": "13 presets", "Power": "1200W" },
    reviews: [],
  },
  { id: 19, name: "Ray-Ban Aviator Sunglasses", price: 129.99, originalPrice: 179.99, image: "🕶️", rating: 4.3, sold: 890,
    description: "Iconic aviator style with polarized crystal lenses. Lightweight metal frame with adjustable nose pads.",
    specs: { "Lens": "Polarized crystal", "Frame": "Metal", "UV Protection": "100% UVA/UVB" },
    reviews: [
      { id: 21, author: "Carlos R.", rating: 4, date: "2026-02-13", comment: "Classic style, great lens quality.", verified: true },
    ],
  },
];

export const getProductById = (id: number): Product | undefined =>
  allProducts.find((p) => p.id === id);
