
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchPlacesData } from '@/services/apiService';
import { BusinessType } from '@/components/BusinessTypeSelector';

export interface PlaceData {
  name: string;
  vicinity: string;
  rating: number;
}

export const getBusinessTypeQuery = (type: BusinessType) => {
  switch (type) {
    case 'restaurant':
      return 'restaurants';
    case 'coffee_shop':
      return 'coffee shops';
    case 'retail':
      return 'retail shops';
    case 'tech':
      return 'tech companies';
    case 'fitness':
      return 'fitness centers';
    default:
      return 'businesses';
  }
};

export const usePlacesData = (businessType: BusinessType, apiKey: string, cuisineType?: string) => {
  const [placesData, setPlacesData] = useState<PlaceData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadPlacesData = async (location: string) => {
    try {
      setIsLoading(true);
      
      // Add cuisine type to search query if it's a restaurant and cuisineType is provided
      let searchQuery = `${getBusinessTypeQuery(businessType)} near ${location} within 2 miles`;
      if (businessType === 'restaurant' && cuisineType) {
        searchQuery = `${cuisineType} ${searchQuery}`;
      }
      
      console.log(`Loading places data with query: ${searchQuery}`);
      
      const data = await fetchPlacesData(searchQuery, apiKey, location);
      
      if (data && data.results) {
        // Map the API response to our PlaceData interface
        const mappedData = data.results.map((place: any) => ({
          name: place.name,
          vicinity: place.vicinity || place.formatted_address || `${location}`,
          rating: place.rating || 0,
        }));
        
        setPlacesData(mappedData);
        
        toast({
          title: "Dati del luogo caricati",
          description: `Mostrando dati di ${getBusinessTypeQuery(businessType)}${cuisineType ? ` (${cuisineType})` : ''} per ${location}`,
        });
      } else {
        // Fall back to mock data if the API doesn't return results
        const mockData: PlaceData[] = [
          { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 1 in ${location}`, vicinity: `${location} Ave 123`, rating: 4.5 },
          { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 2 in ${location}`, vicinity: `${location} St 456`, rating: 4.2 },
          { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 3 in ${location}`, vicinity: `${location} Blvd 789`, rating: 4.7 },
        ];
        
        setPlacesData(mockData);
        
        toast({
          title: "Dati simulati caricati",
          description: `L'API non ha restituito risultati, mostrando dati simulati per ${location}`,
        });
      }
    } catch (error) {
      console.error('Error fetching places data:', error);
      
      // Fall back to mock data on error
      const mockData: PlaceData[] = [
        { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 1 in ${location}`, vicinity: `${location} Ave 123`, rating: 4.5 },
        { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 2 in ${location}`, vicinity: `${location} St 456`, rating: 4.2 },
        { name: `${getBusinessTypeQuery(businessType)}${cuisineType ? ` ${cuisineType}` : ''} 3 in ${location}`, vicinity: `${location} Blvd 789`, rating: 4.7 },
      ];
      
      setPlacesData(mockData);
      
      toast({
        title: "Errore nel caricamento dei dati",
        description: "Controlla la tua API key di Google Places. Mostrando dati simulati.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset data when business type or cuisine type changes
  useEffect(() => {
    setPlacesData(null);
  }, [businessType, cuisineType]);

  return {
    placesData,
    isLoading,
    loadPlacesData,
  };
};
