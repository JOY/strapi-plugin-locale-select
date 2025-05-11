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
    // Add debug logging
    console.log('Fetching settings from API...');
    
    // Use the correct endpoint path for the admin API (no plugin prefix needed for server routes)
    const response = await fetch(`/settings`);
    console.log('Response received:', response);
    
    if (!response.ok) {
      throw new Error(`Error fetching settings: ${response.statusText}`);
    }
    
    // Check the content type to handle response correctly
    const contentType = response.headers.get('content-type');
    console.log('Content type:', contentType);
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      console.log('Response text:', text);
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonError: any) {
        console.error('JSON parse error:', jsonError);
        throw new Error(`Failed to parse JSON: ${jsonError?.message || 'Unknown error'}`);
      }
    } else {
      // Try to parse as text
      const text = await response.text();
      console.log('Response as text:', text);
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonError) {
        console.warn('Could not parse as JSON, using text response');
        data = { responseText: text };
      }
    }
    
    console.log('Parsed data:', data);
    return data;
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    // Return a default empty object with debug info
    return { error: error?.message || 'Unknown error', googleMapsApiKey: null };
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