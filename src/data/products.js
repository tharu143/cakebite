export const cakeCategories = [
  "Birthday Cakes",
  "Anniversary Cakes",
  "Wedding Cakes",
  "Custom Cakes",
  "Photo Cakes"
];

export const brownieCategories = [
  "Brownie Boxes",
  "Nutella Brownies",
  "Chocolate Brownies",
  "Party Brownies",
  "Special Desserts"
];

export const products = [
  // Cakes
  {
    id: "cake-1",
    name: "Classic Chocolate Truffle",
    category: "Birthday Cakes",
    description: "Rich, dense chocolate sponge layered with premium dark chocolate ganache and finished with chocolate curls.",
    price: 999, // in INR
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["0.5 KG", "1 KG", "1.5 KG", "2 KG"],
    flavorOptions: ["Classic Dark Chocolate", "Milk Chocolate", "Mint Chocolate"],
    rating: 4.9,
    reviews: 124
  },
  {
    id: "cake-2",
    name: "Signature Red Velvet",
    category: "Anniversary Cakes",
    description: "Beautiful crimson cake layers with a hint of cocoa, filled and frosted with our signature smooth cream cheese frosting.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["1 KG", "1.5 KG", "2 KG"],
    flavorOptions: ["Classic Cream Cheese", "Red Velvet White Chocolate"],
    rating: 4.8,
    reviews: 98
  },
  {
    id: "cake-3",
    name: "Three-Tier Floral Wedding Cake",
    category: "Wedding Cakes",
    description: "An elegant, bespoke three-tier wedding cake decorated with fresh, organic edible flowers and delicate gold leaf details.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["3 KG", "5 KG", "7 KG"],
    flavorOptions: ["Vanilla Bean & Raspberry", "Chocolate & Salted Caramel", "Lemon Elderflower"],
    rating: 5.0,
    reviews: 36
  },
  {
    id: "cake-4",
    name: "Princess Castle Theme Cake",
    category: "Custom Cakes",
    description: "A whimsical, hand-sculpted fondant castle cake perfect for your little princess's birthday celebration.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["1.5 KG", "2 KG", "3 KG"],
    flavorOptions: ["Chocolate Fudge", "Strawberry Cream", "Funfetti Vanilla"],
    rating: 4.9,
    reviews: 45
  },
  {
    id: "cake-5",
    name: "Custom Photo Print Cake",
    category: "Photo Cakes",
    description: "Your favorite memories printed in high-definition edible ink on a delicious cake of your choice.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["1 KG", "1.5 KG", "2 KG"],
    flavorOptions: ["Black Forest", "White Forest", "Butterscotch"],
    rating: 4.7,
    reviews: 76
  },
  
  // Brownies
  {
    id: "brownie-1",
    name: "Classic Fudgy Brownie Box",
    category: "Brownie Boxes",
    description: "Box of 6 or 12 signature fudgy brownies, with a perfectly crinkly top and rich, chewy center.",
    price: 399,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["Box of 6", "Box of 12"],
    flavorOptions: ["Classic Fudgy", "Walnut Fudge", "Triple Chocolate"],
    rating: 4.9,
    reviews: 142
  },
  {
    id: "brownie-2",
    name: "Nutella Overload Brownies",
    category: "Nutella Brownies",
    description: "Fudgy brownies swirled with generous amounts of warm, creamy Nutella and finished with toasted hazelnuts.",
    price: 499,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["Box of 6", "Box of 12"],
    flavorOptions: ["Nutella Swirl", "Nutella Double Fudge"],
    rating: 4.8,
    reviews: 110
  },
  {
    id: "brownie-3",
    name: "Triple Chocolate Chunk Brownies",
    category: "Chocolate Brownies",
    description: "Loaded with white, milk, and dark chocolate chunks for the ultimate chocolate lovers' experience.",
    price: 449,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["Box of 6", "Box of 12"],
    flavorOptions: ["Triple Chocolate"],
    rating: 4.9,
    reviews: 87
  },
  {
    id: "brownie-4",
    name: "Mega Party Brownie Platter",
    category: "Party Brownies",
    description: "A large 9x9 inch unsliced brownie platter decorated with custom messages, perfect for celebrations.",
    price: 899,
    image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["9x9 Inch Platter"],
    flavorOptions: ["Classic Fudge", "Assorted Toppings (Nutella, Oreo, Walnut)"],
    rating: 5.0,
    reviews: 29
  },
  {
    id: "brownie-5",
    name: "Lotus Biscoff Speculoos Brownies",
    category: "Special Desserts",
    description: "Decadent brownies marbled with smooth Lotus Biscoff cookie butter spread and topped with crunchy Biscoff cookies.",
    price: 529,
    image: "https://images.unsplash.com/photo-1548907040-4d42b52125ca?auto=format&fit=crop&q=80&w=600",
    weightOptions: ["Box of 6", "Box of 12"],
    flavorOptions: ["Lotus Biscoff Swirl"],
    rating: 4.9,
    reviews: 63
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priyanka Raghavan",
    location: "Chennai",
    rating: 5,
    text: "Ordered a Princess Castle theme cake for my daughter's 5th birthday. The design was absolutely magical, exactly like the reference image I sent. And it tasted heavenly! Highly recommend!",
    date: "May 15, 2026"
  },
  {
    id: 2,
    name: "Karthik Subramanian",
    location: "Coimbatore",
    rating: 5,
    text: "The Nutella Overload Brownies are out of this world! They were delivered fresh and fudgy. The online order form was super simple to use, and I immediately got the WhatsApp message with order details.",
    date: "May 28, 2026"
  },
  {
    id: 3,
    name: "Deepa Selvam",
    location: "Madurai",
    rating: 5,
    text: "Best red velvet cake I have ever had. Extremely moist layers and the cream cheese frosting was perfectly balanced. Thank you The Cake Bites for making our anniversary so special!",
    date: "June 02, 2026"
  }
];
