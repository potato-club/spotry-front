
export interface Sport {
  id: number;
  name: string;
}


export interface SportsResponse {
  data: Sport[];
  total: number;
}

export interface SportDetail extends Sport {
  description?: string;
  category?: string;
  popularity?: number;
}

export interface HotSport {
  id: number;
  name: string;
  imageUrl?: string;
  isPopular?: boolean;
}
