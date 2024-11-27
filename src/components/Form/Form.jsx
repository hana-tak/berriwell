import React from "react";

const Form = ({ title, fields, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea id={field.name} name={field.name} required={field.required} />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;