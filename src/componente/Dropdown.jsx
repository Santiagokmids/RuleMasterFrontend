import React from "react";
import Select from "react-select";


const selectOptions = [
  { label: "Gestor de registros", value: "Gestor de registros" },
  { label: "Gestor de reglas", value: "Gestor de reglas" },
  { label: "Evaluador de reglas", value: "Evaluador de reglas" },
  { label: "Gestor de ??????(Columns) Ingles VIII", value: "Gestor de ??????(Columns) Ingles VIII" },
];



function Dropdown(props) {
  const [dropValue, setDropValue] = React.useState();
  const { w, h, t} = props;

  const handleSelect = (event) => {
    setDropValue(event.value);
    console.log("value", event.value);
    console.log("dropValue", dropValue);

  };

  const customStyles = {

    control: (provided) => ({
      ...provided,
      border: "1px solid #666",
      background: "#f2f2f2",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "10px", // Ajusta el radio de borde deseado
      width: w,
      height: h,
      fontFamily: "'Josefin Sans', sans-serif",
      textAlign: "left",
      color: "#6E6E6E",
      fontSize: "1.2em",
      fontWeight: 800,

    }),
    singleValue: (provided) => ({
      ...provided,
      color: "blue", // Cambia "blue" al color que desees
      fontSize: "16px", // Ajusta el tamaño de fuente deseado
      fontFamily: "'Josefin Sans', sans-serif",
      color: "#6E6E6E",
      fontSize: "1.2em",
      fontWeight: 800,
    }),
  };

  React.useEffect(() => { }, [dropValue]);

  return (
    <div className="DropdownContainer" style={{ width: w, height: h, marginTop: t}}>
      <Select
        defaultValue={{ label: "Rol", value: "" }}
        options={selectOptions}
        onChange={handleSelect}
        className="select-text"
        styles={customStyles}

      />
    </div>
  );
}

export default Dropdown;
