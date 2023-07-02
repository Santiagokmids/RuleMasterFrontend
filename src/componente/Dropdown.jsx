import React from "react";
import Select from "react-select";
import "./css/DropDown.css";


function Dropdown(props) {
  const [dropValue, setDropValue] = React.useState();
  const { w, h, t, selectOptions, optionD, fontsize, onChange} = props;

  const handleSelect = (event) => {
    const selectedValue = event.value;
    setDropValue(selectedValue);
    onChange(selectedValue);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "#f2f2f2",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      width: "100%",
      height: "100%",
      fontFamily: "'Josefin Sans', sans-serif",
      textAlign: "left",
      color: "#6E6E6E",
      fontSize: fontsize,
      
      fontWeight: 800,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "#4786ffd1" : "white",
      color: "black",
      fontSize: fontsize
    }),
  };

  React.useEffect(() => {}, [dropValue]);

  return (
    <div
      className="DropdownContainer"
      style={{ width: w, height: h, marginTop: t }}
    >
      <Select classNames={`select-text, css-1dimb5e-singleValue ${fontsize}`}
        defaultValue={{ label: optionD, value: "" }}
        options={selectOptions}
        onChange={handleSelect}
        styles={customStyles}
      />
    </div>
  );
}

export default Dropdown;

