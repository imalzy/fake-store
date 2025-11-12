import React from "react";
import { Form } from "react-bootstrap";

type InputProps = {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  errormsg?: string;
  required?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
};

const Input = React.memo((props: InputProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{props?.label}</Form.Label>
      <div className="input-group">
        {props?.icon && (
          <span className="input-group-text bg-white border-end-0">
            {props?.icon}
          </span>
        )}
        <Form.Control {...props} />
        {props?.errormsg && (
          <Form.Control.Feedback type="invalid">
            {props?.errormsg}
          </Form.Control.Feedback>
        )}
      </div>
    </Form.Group>
  );
});

Input.displayName = "Input";

export default Input;
