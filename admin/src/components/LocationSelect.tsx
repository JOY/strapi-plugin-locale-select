import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { Combobox, ComboboxOption } from "@strapi/design-system";

// Props: config = { enableState: boolean, enableCity: boolean }
const LocationSelect = ({ name, value, onChange, config }) => {
  const [country, setCountry] = useState(value?.country || "");
  const [state, setState] = useState(value?.state || "");
  const [city, setCity] = useState(value?.city || "");

  const countries = Country.getAllCountries();
  const states = country ? State.getStatesOfCountry(country) : [];
  const cities = (country && state) ? City.getCitiesOfState(country, state) : [];

  const handleCountry = (v) => {
    setCountry(v);
    setState("");
    setCity("");
    onChange({ target: { name, value: { country: v, state: "", city: "" } } });
  };
  const handleState = (v) => {
    setState(v);
    setCity("");
    onChange({ target: { name, value: { country, state: v, city: "" } } });
  };
  const handleCity = (v) => {
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
      {config?.enableState && (
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
      {config?.enableCity && (
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