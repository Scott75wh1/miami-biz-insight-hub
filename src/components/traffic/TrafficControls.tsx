
import React from 'react';
import { Check, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MIAMI_DISTRICTS } from '@/components/competitor/constants';

interface TrafficControlsProps {
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
}

export const TrafficControls: React.FC<TrafficControlsProps> = ({ selectedDistrict, onDistrictChange }) => {
  const { toast } = useToast();
  
  const handleDistrictChange = (district: string) => {
    onDistrictChange(district);
    toast({
      title: "Quartiere aggiornato",
      description: `Visualizzazione del traffico in ${district}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">
          Seleziona quartiere
        </label>
        <div className="relative">
          <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Seleziona quartiere" />
            </SelectTrigger>
            <SelectContent>
              {MIAMI_DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};
