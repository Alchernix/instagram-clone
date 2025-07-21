import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  type: string;
  error: string;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input({ label, name, type, error, ...props }: InputProps) {
  const inputClasses = "border border-(--border) rounded-md px-2 py-1";
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      {type !== "textarea" && (
        <input className={inputClasses} type={type} name={name} {...props} />
      )}
      {type === "textarea" && (
        <textarea
          className={inputClasses + " resize-none"}
          name={name}
          {...props}
          maxLength={150}
        />
      )}
      <p className="text-red-500">{error}</p>
    </div>
  );
}
