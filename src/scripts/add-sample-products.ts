import axios from 'axios';

const API_URL = 'https://backend-8rnq.onrender.com/api/product/add';

// Update CATEGORY_IDS with real ObjectIds and info
const CATEGORY_IDS = {
  'chopping-boards': {
    id: '682b394832ee5957a4e14324',
    name: 'Chopping Boards',
    slug: 'chopping-boards',
    type: 'main'
  },
  'platters': {
    id: '682b394832ee5957a4e14325',
    name: 'Platters',
    slug: 'platters',
    type: 'main'
  },
  'trays': {
    id: '682b394832ee5957a4e14326',
    name: 'Trays',
    slug: 'trays',
    type: 'main'
  },
  'planters': {
    id: '682b394832ee5957a4e14327',
    name: 'Planters',
    slug: 'planters',
    type: 'main'
  },
  'bowls': {
    id: '682b394832ee5957a4e14328',
    name: 'Bowls',
    slug: 'bowls',
    type: 'main'
  },
  'cake-stands': {
    id: '682b394832ee5957a4e14329',
    name: 'Cake Stands',
    slug: 'cake-stands',
    type: 'main'
  },
  'wedding-gifting': {
    id: '682b394832ee5957a4e1432a',
    name: 'Wedding Gifting',
    slug: 'wedding-gifting',
    type: 'gifting'
  },
  'corporate-gifting': {
    id: '682b394832ee5957a4e1432b',
    name: 'Corporate Gifting',
    slug: 'corporate-gifting',
    type: 'gifting'
  },
  'festive-gifting': {
    id: '682b394832ee5957a4e1432c',
    name: 'Festive Gifting',
    slug: 'festive-gifting',
    type: 'gifting'
  },
  'housewarming-gifting': {
    id: '682b394832ee5957a4e1432d',
    name: 'Housewarming Gifting',
    slug: 'housewarming-gifting',
    type: 'gifting'
  },
  'anniversary-gifting': {
    id: '682b394832ee5957a4e1432e',
    name: 'Anniversary Gifting',
    slug: 'anniversary-gifting',
    type: 'gifting'
  }
};

const sampleProducts = [
  // Kitchenware Products
  {
    sku: "OWC-CB001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Acacia Wood Chopping Board",
    slug: "acacia-wood-chopping-board",
    unit: "piece",
    imageURLs: [{
      color: { name: "Natural Acacia", clrCode: "#8B4513" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Small", "Medium", "Large"]
    }],
    parent: "kitchenware",
    children: "chopping-boards",
    price: 49.99,
    priceINR: 3999,
    discount: 0,
    quantity: 10,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['chopping-boards'].name, 
      id: CATEGORY_IDS['chopping-boards'].id,
      type: CATEGORY_IDS['chopping-boards'].type,
      slug: CATEGORY_IDS['chopping-boards'].slug
    },
    status: "in-stock",
    productType: "kitchenware",
    description: "Handcrafted acacia wood chopping board. Perfect for daily kitchen use.",
    additionalInformation: [
      { key: "Material", value: "Solid Acacia Wood" },
      { key: "Dimensions", value: "30cm x 20cm x 2cm" },
      { key: "Care", value: "Hand wash with mild soap" }
    ],
    tags: ["chopping-board", "kitchen", "acacia", "wooden"]
  },
  {
    sku: "OWC-PL001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Walnut Wood Serving Platter",
    slug: "walnut-wood-serving-platter",
    unit: "piece",
    priceINR: 5999,
    imageURLs: [{
      color: { name: "Dark Walnut", clrCode: "#5C4033" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Medium", "Large"]
    }],
    parent: "kitchenware",
    children: "platters",
    price: 79.99,
    discount: 10,
    quantity: 12,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['platters'].name, 
      id: CATEGORY_IDS['platters'].id,
      type: CATEGORY_IDS['platters'].type,
      slug: CATEGORY_IDS['platters'].slug
    },
    status: "in-stock",
    productType: "kitchenware",
    description: "Elegant walnut wood serving platter with handles. Perfect for cheese boards, charcuterie, and appetizers.",
    additionalInformation: [
      { key: "Material", value: "Solid Walnut" },
      { key: "Dimensions", value: "60cm x 30cm x 2cm" },
      { key: "Care", value: "Hand wash, dry immediately" }
    ],
    tags: ["platter", "serving", "walnut", "entertaining"]
  },
  {
    sku: "OWC-TR001",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
    title: "Teak Wood Serving Tray",
    slug: "teak-wood-serving-tray",
    unit: "piece",
    priceINR: 5299,
    imageURLs: [{
      color: { name: "Teak", clrCode: "#B8860B" },
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard"]
    }],
    parent: "kitchenware",
    children: "trays",
    price: 69.99,
    discount: 0,
    quantity: 10,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['trays'].name, 
      id: CATEGORY_IDS['trays'].id,
      type: CATEGORY_IDS['trays'].type,
      slug: CATEGORY_IDS['trays'].slug
    },
    status: "in-stock",
    productType: "kitchenware",
    description: "Beautiful teak wood serving tray with handles. Ideal for breakfast in bed or serving drinks.",
    additionalInformation: [
      { key: "Material", value: "Solid Teak" },
      { key: "Dimensions", value: "50cm x 35cm x 3cm" },
      { key: "Care", value: "Wipe clean with damp cloth" }
    ],
    tags: ["tray", "serving", "teak", "breakfast"]
  },
  {
    sku: "OWC-PT001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Cedar Wood Planter Box",
    slug: "cedar-wood-planter-box",
    unit: "piece",
    imageURLs: [{
      color: { name: "Natural Cedar", clrCode: "#8B4513" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Small", "Medium", "Large"]
    }],
    parent: "home-decor",
    children: "planters",
    price: 89.99,
    priceINR: 7199,
    discount: 0,
    quantity: 8,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['planters'].name, 
      id: CATEGORY_IDS['planters'].id,
      type: CATEGORY_IDS['planters'].type,
      slug: CATEGORY_IDS['planters'].slug
    },
    status: "in-stock",
    productType: "home-decor",
    description: "Weather-resistant cedar wood planter box. Perfect for herbs, flowers, and small plants.",
    additionalInformation: [
      { key: "Material", value: "Solid Cedar" },
      { key: "Dimensions", value: "40cm x 20cm x 25cm" },
      { key: "Features", value: "Drainage holes included" }
    ],
    tags: ["planter", "garden", "cedar", "outdoor"]
  },
  {
    sku: "OWC-BW001",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
    title: "Olive Wood Salad Bowl",
    slug: "olive-wood-salad-bowl",
    unit: "piece",
    priceINR: 4499,
    imageURLs: [{
      color: { name: "Olive Wood", clrCode: "#808000" },
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
      sizes: ["Medium", "Large"]
    }],
    parent: "kitchenware",
    children: "bowls",
    price: 59.99,
    discount: 0,
    quantity: 15,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['bowls'].name, 
      id: CATEGORY_IDS['bowls'].id,
      type: CATEGORY_IDS['bowls'].type,
      slug: CATEGORY_IDS['bowls'].slug
    },
    status: "in-stock",
    productType: "kitchenware",
    description: "Hand-carved olive wood salad bowl. Each piece has unique grain patterns.",
    additionalInformation: [
      { key: "Material", value: "Solid Olive Wood" },
      { key: "Dimensions", value: "30cm diameter x 10cm height" },
      { key: "Care", value: "Hand wash, oil occasionally" }
    ],
    tags: ["bowl", "salad", "olive-wood", "kitchen"]
  },
  {
    sku: "OWC-CS001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Cherry Wood Cake Stand",
    slug: "cherry-wood-cake-stand",
    unit: "piece",
    imageURLs: [{
      color: { name: "Cherry", clrCode: "#D2691E" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard"]
    }],
    parent: "kitchenware",
    children: "cake-stands",
    price: 99.99,
    priceINR: 7999,
    discount: 15,
    quantity: 6,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['cake-stands'].name, 
      id: CATEGORY_IDS['cake-stands'].id,
      type: CATEGORY_IDS['cake-stands'].type,
      slug: CATEGORY_IDS['cake-stands'].slug
    },
    status: "in-stock",
    productType: "kitchenware",
    description: "Elegant cherry wood cake stand with decorative base. Perfect for special occasions.",
    additionalInformation: [
      { key: "Material", value: "Solid Cherry Wood" },
      { key: "Dimensions", value: "35cm diameter x 25cm height" },
      { key: "Care", value: "Wipe clean with damp cloth" }
    ],
    tags: ["cake-stand", "cherry", "serving", "special-occasion"]
  },
  // Gifting Products
  {
    sku: "OWC-WG001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Wedding Gift Box Set",
    slug: "wedding-gift-box-set",
    unit: "set",
    imageURLs: [{
      color: { name: "Natural Wood", clrCode: "#8B4513" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60"
    }],
    parent: "gifting",
    children: "wedding-gifting",
    price: 299.99,
    priceINR: 23999,
    discount: 10,
    quantity: 5,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['wedding-gifting'].name, 
      id: CATEGORY_IDS['wedding-gifting'].id,
      type: CATEGORY_IDS['wedding-gifting'].type,
      slug: CATEGORY_IDS['wedding-gifting'].slug
    },
    status: "in-stock",
    productType: "gifting",
    description: "Luxurious wedding gift box set featuring our finest wooden products.",
    additionalInformation: [
      { key: "Contents", value: "Chopping Board, Serving Platter, and Wine Box" },
      { key: "Packaging", value: "Premium Gift Box with Ribbon" },
      { key: "Customization", value: "Engraving available" }
    ],
    tags: ["wedding", "gift", "luxury", "wooden-set"]
  },
  {
    sku: "OWC-CG001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Corporate Gift Hamper",
    slug: "corporate-gift-hamper",
    unit: "set",
    priceINR: 11999,
    imageURLs: [{
      color: { name: "Premium Wood", clrCode: "#8B4513" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard", "Deluxe"]
    }],
    parent: "gifting",
    children: "corporate-gifting",
    price: 299.99,
    discount: 0,
    quantity: 5,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['corporate-gifting'].name, 
      id: CATEGORY_IDS['corporate-gifting'].id,
      type: CATEGORY_IDS['corporate-gifting'].type,
      slug: CATEGORY_IDS['corporate-gifting'].slug
    },
    status: "in-stock",
    productType: "gifting",
    description: "Premium corporate gift hamper featuring wooden desk accessories and custom branding options.",
    additionalInformation: [
      { key: "Contents", value: "Desk organizer, pen holder, business card holder" },
      { key: "Customization", value: "Company logo engraving available" },
      { key: "Packaging", value: "Premium gift box" }
    ],
    tags: ["corporate", "gift-hamper", "premium", "business"]
  },
  {
    sku: "OWC-FG001",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
    title: "Festive Season Gift Box",
    slug: "festive-season-gift-box",
    unit: "set",
    priceINR: 7499,
    imageURLs: [{
      color: { name: "Seasonal Wood", clrCode: "#A0522D" },
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard"]
    }],
    parent: "gifting",
    children: "festive-gifting",
    price: 149.99,
    discount: 20,
    quantity: 20,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['festive-gifting'].name, 
      id: CATEGORY_IDS['festive-gifting'].id,
      type: CATEGORY_IDS['festive-gifting'].type,
      slug: CATEGORY_IDS['festive-gifting'].slug
    },
    status: "in-stock",
    productType: "gifting",
    description: "Special festive season gift box with wooden ornaments and decorative items.",
    additionalInformation: [
      { key: "Contents", value: "Wooden ornaments, decorative items, gift card" },
      { key: "Season", value: "Holiday season" },
      { key: "Packaging", value: "Festive gift box" }
    ],
    tags: ["festive", "holiday", "seasonal", "gift-box"]
  },
  {
    sku: "OWC-HG001",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
    title: "Housewarming Gift Set",
    slug: "housewarming-gift-set",
    unit: "set",
    priceINR: 6499,
    imageURLs: [{
      color: { name: "Natural Wood", clrCode: "#DEB887" },
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard"]
    }],
    parent: "gifting",
    children: "housewarming-gifting",
    price: 129.99,
    discount: 0,
    quantity: 15,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['housewarming-gifting'].name, 
      id: CATEGORY_IDS['housewarming-gifting'].id,
      type: CATEGORY_IDS['housewarming-gifting'].type,
      slug: CATEGORY_IDS['housewarming-gifting'].slug
    },
    status: "in-stock",
    productType: "gifting",
    description: "Thoughtful housewarming gift set including wooden coasters, cutting board, and decorative items.",
    additionalInformation: [
      { key: "Contents", value: "Coasters, cutting board, decorative items" },
      { key: "Packaging", value: "Gift box with ribbon" },
      { key: "Care", value: "Hand wash items" }
    ],
    tags: ["housewarming", "gift-set", "home", "new-home"]
  },
  {
    sku: "OWC-AG001",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
    title: "Anniversary Gift Box",
    slug: "anniversary-gift-box",
    unit: "set",
    priceINR: 8499,
    imageURLs: [{
      color: { name: "Premium Wood", clrCode: "#8B4513" },
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
      sizes: ["Standard", "Deluxe"]
    }],
    parent: "gifting",
    children: "anniversary-gifting",
    price: 179.99,
    discount: 0,
    quantity: 8,
    brand: { name: "Onewoodcraft", id: "onewoodcraft" },
    category: { 
      name: CATEGORY_IDS['anniversary-gifting'].name, 
      id: CATEGORY_IDS['anniversary-gifting'].id,
      type: CATEGORY_IDS['anniversary-gifting'].type,
      slug: CATEGORY_IDS['anniversary-gifting'].slug
    },
    status: "in-stock",
    productType: "gifting",
    description: "Romantic anniversary gift box featuring wooden photo frame, wine box, and personalized items.",
    additionalInformation: [
      { key: "Contents", value: "Photo frame, wine box, personalized items" },
      { key: "Personalization", value: "Custom engraving available" },
      { key: "Packaging", value: "Premium gift box" }
    ],
    tags: ["anniversary", "romantic", "personalized", "special-occasion"]
  }
];

async function addSampleProducts() {
  try {
    for (const product of sampleProducts) {
      try {
        const response = await axios.post(API_URL, product);
        console.log(`Successfully added product: ${product.title}`, response.data);
        // Add a small delay between requests to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(`Error adding product ${product.title}:`, error.response?.data || error.message);
        } else {
          console.error(`Unexpected error adding product ${product.title}:`, error);
        }
      }
    }
    console.log('Finished adding all products');
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error in addSampleProducts:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error in addSampleProducts:', error);
    }
  }
}

// Run the script
addSampleProducts(); 