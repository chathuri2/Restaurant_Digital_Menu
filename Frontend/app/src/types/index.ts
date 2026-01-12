export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  phone: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular: boolean;
  spicyLevel: number;
  preparationTime: number;
}

export interface MenuParams {
  category?: string;
  popular?: boolean;
  dietary_like?: string;
  spicyLevel?: number;
  price_gte?: number;
  price_lte?: number;
  q?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
}
