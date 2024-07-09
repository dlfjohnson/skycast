import { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface UseSearchLocationReturn {
  locations: Location[];
  isLoading: boolean;
  error: string | null;
}

const useSearchLocation = (searchTerm: string): UseSearchLocationReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2) {
      setLocations([]);
      return;
    }

    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
          params: {
            name: searchTerm,
            count: 10,
            format: 'json',
            language: 'en'
          }
        });

        setLocations(response.data.results);
      } catch (err) {
        setError('Error fetching locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [searchTerm]);

  return { locations, isLoading, error };
};

export default useSearchLocation;
