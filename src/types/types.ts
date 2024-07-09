export interface FeatureCollection {
  features: Feature[];
}
  
export interface Feature {
  properties: {
    formatted: string;
    place_id: string;
    address_line1: string;
  }
}

export interface LocationCollection {
  features: Location[];
}

export interface Location {
  admin1: string;
  admin1_id: number;
  admin2: string;
  admin2_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  postcodes: any[];
  timezone: string;
}