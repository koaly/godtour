import React from "react";

const Input = ({ name, label, placeholder, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="strongg" htmlFor={name}>
        {label}
      </label>
      <input {...rest} name={name} id={name} placeholder={placeholder} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
