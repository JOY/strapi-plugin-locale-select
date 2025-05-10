import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { Combobox, ComboboxOption } from "@strapi/design-system";

// Định nghĩa type cho props
interface LocationValue {
  country?: string;
  state?: string;
  city?: string;
}
interface LocationSelectProps {
  name: string;
  value?: LocationValue;
  onChange: (e: { target: { name: string; value: LocationValue } }) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ name, value, onChange }) => {
  const [country, setCountry] = useState<string>(value?.country || "");
  const [state, setState] = useState<string>(value?.state || "");
  const [city, setCity] = useState<string>(value?.city || "");

  const countries = Country.getAllCountries();
  const states = country ? State.getStatesOfCountry(country) : [];
  const cities = (country && state) ? City.getCitiesOfState(country, state) : [];

  const handleCountry = (v: string) => {
    setCountry(v);
    setState("");
    setCity("");
    onChange({ target: { name, value: { country: v, state: "", city: "" } } });
  };
  const handleState = (v: string) => {
    setState(v);
    setCity("");
    onChange({ target: { name, value: { country, state: v, city: "" } } });
  };
  const handleCity = (v: string) => {
    setCity(v);
    onChange({ target: { name, value: { country, state, city: v } } });
  };

  return (
    <div>
      <Combobox
        label="Country"
        value={country}
        onChange={handleCountry}
        placeholder="Select country"
        clearLabel="Clear"
      >
        {countries.map(c => (
          <ComboboxOption key={c.isoCode} value={c.isoCode}>
            {c.name}
          </ComboboxOption>
        ))}
      </Combobox>
      {country && (
        <Combobox
          label="State/Province"
          value={state}
          onChange={handleState}
          placeholder="Select state"
          clearLabel="Clear"
          disabled={!country}
        >
          {states.map(s => (
            <ComboboxOption key={s.isoCode} value={s.isoCode}>
              {s.name}
            </ComboboxOption>
          ))}
        </Combobox>
      )}
      {country && state && (
        <Combobox
          label="City"
          value={city}
          onChange={handleCity}
          placeholder="Select city"
          clearLabel="Clear"
          disabled={!state}
        >
          {cities.map(c => (
            <ComboboxOption key={c.name} value={c.name}>
              {c.name}
            </ComboboxOption>
          ))}
        </Combobox>
      )}
    </div>
  );
};

export default LocationSelect; 