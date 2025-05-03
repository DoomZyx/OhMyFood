import Select from "react-select";

const options = [
  { value: "EI", label: "Auto-entrepreneur" },
  { value: "SARL", label: "SARL" },
  { value: "SAS", label: "SAS" },
  { value: "other", label: "Autre" },
];

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
   color: "#f4f4f4f"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#a56eff" : "white",
    color: state.isSelected ? "white" : "#333",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#f0e6ff",
      color: "#a56eff",
    },
  }),
};

export function LegalStatus() {
  const handleChange = (selectedOption) => {
    console.log(selectedOption); // console.log a remplacer
  };
  return (
    <div className="legalStatusSelect" style={{ width: 300}}>
      <Select options={options} onChange={handleChange} styles={customStyles} isSearchable={false} placeholder="Votre statut juridique" />
    </div>
  );
}

export default LegalStatus;
