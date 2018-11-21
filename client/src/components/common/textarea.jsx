import React from "react";

const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="strongg" htmlFor={name}>
        {label}
      </label>
      <textarea {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Textarea;
