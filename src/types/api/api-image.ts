export interface ApiImage {
  height: number;
  id: string;
  url: string;
  width: number;
  breed_ids?: null;
  created_at?: Date;
  original_filename?: string;
  sub_id?: null | string;
  breeds: {
    adaptability: number;
    affection_level: number;
    alt_names: string;
    child_friendly: number;
    country_code: string;
    country_codes: string;
    description: string;
    dog_friendly: number;
    energy_level: number;
    experimental: number;
    grooming: number;
    hairless: number;
    health_issues: number;
    hypoallergenic: number;
    id: string;
    indoor: number;
    intelligence: number;
    lap: number;
    life_span: string;
    name: string;
    natural: number;
    origin: string;
    rare: number;
    reference_image_id: string;
    rex: number;
    shedding_level: number;
    short_legs: number;
    social_needs: number;
    stranger_friendly: number;
    suppressed_tail: number;
    temperament: string;
    vetstreet_url: string;
    vocalisation: number;
    weight: {
      imperial: string;
      metric: string;
    };
    wikipedia_url: string;
    cfa_url?: string;
    vcahospitals_url?: string;
  }[];
  categories?: {
    id: number;
    name: string;
  }[];
}
