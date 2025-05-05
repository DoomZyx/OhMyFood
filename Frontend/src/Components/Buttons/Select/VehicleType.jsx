import Select from "react-select";


const options = [
 {value: "car", label: "Voiture"},
 {value: "bike", label: "Deux-roues"},
 {value: "electric", label: "Véhicules éléctrique"},
]

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

export function VehicleType() {
  const handleChange = (selectedOption) => {
    console.log(selectedOption); // console.log a remplacer
  };
  return (
    <div className="legalStatusSelect" style={{ width: 300 }}>
      <Select
        options={options}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={false}
        placeholder="Votre type de véhicule"
      />
    </div>
  );
}

export default VehicleType;
