//surveField contains logic and texture to generate simple label and input field

import React from "react";

export default ({ input, label, meta }) => {
  return (
    <div>
      <label style={{ fontSize: 15, fontWeight: "bold"}}>
        {label}
      </label>
      {label !== "Email Body" ? (
        <input {...input} style={{ marginBottom: "5px" }} />
      ) : (
        <textarea {...input} style={{ marginBottom: "5px" }} />
      )}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};
