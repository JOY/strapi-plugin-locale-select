import React, { useRef, useState, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@strapi/design-system";
import { PLUGIN_ID } from '../pluginId';

interface AddressAutocompleteProps {
  name: string;
  value?: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

// Helper function to fetch settings
const fetchSettings = async () => {
  try {
    // Use the correct endpoint path for the admin API
    const response = await fetch(`/locale-select/settings`);
    if (!response.ok) {
      throw new Error(`Error fetching settings: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

const AddressAutocomplete = ({ name, value, onChange }: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value || "");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      const settings = await fetchSettings();
      if (settings && settings.googleMapsApiKey) {
        setGoogleMapsApiKey(settings.googleMapsApiKey);
      }
    };
    fetchApiKey();
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.formatted_address) return;
      setInputValue(place.formatted_address);
      onChange({ target: { name, value: place.formatted_address } });
    }
  };

  // Don't render until we have the API key
  if (!googleMapsApiKey) {
    return (
      <TextInput
        label="Address"
        name={name}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder="Loading Google Maps..."
        disabled
      />
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <Autocomplete
        onLoad={(ref: google.maps.places.Autocomplete) => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <TextInput
          label="Address"
          name={name}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Nhập địa chỉ..."
          autoComplete="off"
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete; 