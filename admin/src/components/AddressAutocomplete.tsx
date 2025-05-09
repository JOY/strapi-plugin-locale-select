import React, { useRef, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@strapi/design-system";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const AddressAutocomplete = ({ name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const autocompleteRef = useRef(null);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.formatted_address) return;
    setInputValue(place.formatted_address);
    onChange({ target: { name, value: place.formatted_address } });
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <Autocomplete
        onLoad={ref => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <TextInput
          label="Address"
          name={name}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Nhập địa chỉ..."
          autoComplete="off"
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete; 