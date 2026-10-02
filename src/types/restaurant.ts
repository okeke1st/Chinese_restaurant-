export type CategoryType = 
  | 'all'
  | 'appetizers'
  | 'noodles_rice'
  | 'chefs_specials'
  | 'seafood'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  chineseName?: string;
  category: CategoryType;
  price?: number; // Optional: only if officially listed on business map
  priceDisplay?: string; // e.g. 'Daily Market Price' or 'Inquire on WhatsApp'
  description: string;
  detailedDescription?: string;
  ingredients?: string[];
  allergens?: string[];
  servingSuggestion?: string;
  portion: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  isVegetarian?: boolean;
  isChefsSpecial?: boolean;
  isPopular?: boolean;
  image?: string;
  tags?: string[];
}

export interface LoyaltyReward {
  id: string;
  title: string;
  stampsRequired: number;
  description: string;
  rewardType: 'complimentary_dish' | 'discount';
  rewardValue: string;
}

export interface CustomerLoyaltyCard {
  customerPhone: string;
  customerName: string;
  currentStamps: number;
  totalStampsEarned: number;
  stampsGoal: number;
  unlockedRewards: string[];
  receiptHistory: {
    receiptCode: string;
    orderAmount: number;
    stampsAdded: number;
    date: string;
  }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  relativeTime: string;
  text: string;
  verified: boolean;
  avatarBg: string;
  helpfulCount?: number;
  dishMentions?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main_hall' | 'quiet_booth' | 'vip_banquet';
  specialRequests?: string;
  createdAt: string;
}
