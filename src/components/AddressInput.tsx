
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
  isLoading?: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressSubmit, isLoading = false }) => {
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onAddressSubmit(address);
    } else {
      toast({
        title: "Indirizzo richiesto",
        description: "Per favore inserisci un indirizzo valido",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Inserisci un indirizzo (es. 123 Ocean Drive, Miami Beach, FL)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="pr-10"
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            <span>Cerco...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-1" />
            <span>Cerca</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default AddressInput;
