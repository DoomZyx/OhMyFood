import Select from "react-select";
import { useState } from "react";


const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: 8,
    padding: 2,
    borderColor: "#a56eff",
    boxShadow: "none",
    "&:hover": { borderColor: "#7d50cc" },
    backgroundImage: `linear-gradient(
    193.33deg,
    #9356dc -11.44%,
    #ff79da 123.93%
    )`,
    color: "#ffffff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#f4f4f4f",
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
    ? "linear-gradient(193.33deg,#9356dc -11.44%,#ff79da 123.93%)"
      : state.isFocused
      ? "#F0F0F0"
      : "white",
      color: state.isSelected ? "white" : "#333",
      borderRadius: 8,
      "&:hover": {
      backgroundColor: "#f0e6ff",
      color: "#a56eff",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
    fontWeight: "600",
  }),
};

export function DeliveryRadius({ value, onChange }) {
  const options = [
   {value: "5", label: "5 km"},
   {value: "10", label: "10 km"},
   {value: "15", label: "15 km"},
   {value: "20", label: "20 km"},
  ]
  
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === value) || null
  );

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="DeliveryZoneSelect" style={{ width: 300 }}>
      <Select
        value={selectedOption}
        options={options}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={false}
        placeholder="Zone de livraison"
      />
    </div>
  );
}

export default DeliveryRadius;
