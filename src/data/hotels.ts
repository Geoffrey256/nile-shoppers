export type RoomTier = "platinum" | "premium" | "gold" | "silver" | "bronze";

export interface Room {
  tier: RoomTier;
  name: string;
  price: number;
  description: string;
  amenities: string[];
  image: string;
  maxGuests: number;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  city: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  rooms: Room[];
}

const roomTemplates: Record<RoomTier, Omit<Room, "image" | "price">> = {
  platinum: {
    tier: "platinum",
    name: "Platinum Suite",
    description: "Luxurious top-floor suite with panoramic views, king bed, private lounge, and premium minibar.",
    amenities: ["King bed", "Private lounge", "Panoramic view", "Jacuzzi", "Smart TV", "Room service 24/7", "Free Wi-Fi", "Airport shuttle"],
    maxGuests: 4,
  },
  premium: {
    tier: "premium",
    name: "Premium Room",
    description: "Spacious room with modern décor, queen bed, work desk, and complimentary breakfast.",
    amenities: ["Queen bed", "Work desk", "Breakfast included", "Smart TV", "Free Wi-Fi", "Minibar", "Air conditioning"],
    maxGuests: 3,
  },
  gold: {
    tier: "gold",
    name: "Gold Room",
    description: "Comfortable room with a double bed, en-suite bathroom, and city views.",
    amenities: ["Double bed", "City view", "En-suite bathroom", "Free Wi-Fi", "Air conditioning", "Smart TV"],
    maxGuests: 2,
  },
  silver: {
    tier: "silver",
    name: "Silver Room",
    description: "Clean and cosy room with essential amenities, perfect for short stays.",
    amenities: ["Double bed", "En-suite bathroom", "Free Wi-Fi", "Fan / AC", "TV"],
    maxGuests: 2,
  },
  bronze: {
    tier: "bronze",
    name: "Bronze Room",
    description: "Budget-friendly room with a single bed and shared facilities. Great for solo travellers.",
    amenities: ["Single bed", "Shared bathroom", "Free Wi-Fi", "Fan"],
    maxGuests: 1,
  },
};

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Nile View Guest House",
    location: "Main Street, Paidha",
    city: "Paidha, Zombo",
    description: "A serene guest house in the heart of Paidha with stunning views of the West Nile landscape. Enjoy home-cooked meals and warm hospitality.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format",
    rating: 4.3,
    reviews: 87,
    lat: 2.8155,
    lng: 30.9864,
    rooms: [
      { ...roomTemplates.platinum, price: 350000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.premium, price: 220000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 150000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 80000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 40000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
  {
    id: 2,
    name: "Zombo Highlands Lodge",
    location: "Hilltop Road, Zombo Town",
    city: "Zombo",
    description: "Perched on the hills of Zombo, this lodge offers cool breezes, lush greenery, and a tranquil retreat from the bustle.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop&auto=format",
    rating: 4.5,
    reviews: 64,
    lat: 2.5144,
    lng: 30.9083,
    rooms: [
      { ...roomTemplates.platinum, price: 400000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.premium, price: 250000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 170000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 90000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 45000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
  {
    id: 3,
    name: "Pearl of Kampala Hotel",
    location: "Nakasero Hill, Kampala",
    city: "Kampala",
    description: "Modern hotel in the heart of Kampala, minutes from major business centres, shopping malls, and nightlife.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&auto=format",
    rating: 4.7,
    reviews: 234,
    lat: 0.3136,
    lng: 32.5811,
    rooms: [
      { ...roomTemplates.platinum, price: 550000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.premium, price: 350000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 220000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 130000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 70000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
  {
    id: 4,
    name: "Kololo Suites",
    location: "Kololo, Kampala",
    city: "Kampala",
    description: "Elegant serviced apartments in the upscale Kololo neighbourhood. Ideal for extended stays and business travellers.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop&auto=format",
    rating: 4.6,
    reviews: 178,
    lat: 0.3296,
    lng: 32.5918,
    rooms: [
      { ...roomTemplates.platinum, price: 600000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.premium, price: 380000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 250000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 150000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 80000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
  {
    id: 5,
    name: "West Nile Inn",
    location: "Market Road, Arua",
    city: "Arua",
    description: "Affordable and comfortable stay near Arua's vibrant market. A favourite among travellers heading to the West Nile region.",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop&auto=format",
    rating: 4.1,
    reviews: 56,
    lat: 3.0206,
    lng: 30.9107,
    rooms: [
      { ...roomTemplates.premium, price: 200000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 130000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 70000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 35000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
  {
    id: 6,
    name: "Munyonyo Lakeside Resort",
    location: "Munyonyo, Kampala",
    city: "Kampala",
    description: "Lakeside resort on the shores of Lake Victoria. Perfect for conferences, weddings, and weekend getaways.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&auto=format",
    rating: 4.8,
    reviews: 312,
    lat: 0.2569,
    lng: 32.6126,
    rooms: [
      { ...roomTemplates.platinum, price: 700000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.premium, price: 450000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.gold, price: 300000, image: "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.silver, price: 180000, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=300&fit=crop&auto=format" },
      { ...roomTemplates.bronze, price: 100000, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop&auto=format" },
    ],
  },
];

export const getHotelById = (id: number): Hotel | undefined =>
  hotels.find((h) => h.id === id);

export const tierColors: Record<RoomTier, string> = {
  platinum: "bg-gradient-to-r from-slate-300 to-slate-500 text-slate-900",
  premium: "bg-gradient-to-r from-purple-400 to-purple-600 text-white",
  gold: "bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900",
  silver: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800",
  bronze: "bg-gradient-to-r from-orange-300 to-orange-500 text-orange-900",
};

export const tierOrder: RoomTier[] = ["platinum", "premium", "gold", "silver", "bronze"];
