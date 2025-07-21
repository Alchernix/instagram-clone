import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  type: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, name, type }: InputProps) {
  const inputClasses = "border border-(--border) rounded-md px-2 py-1";
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      {type !== "textarea" && (
        <input className={inputClasses} type={type} name={name} />
      )}
      {type === "textarea" && (
        <textarea className={inputClasses + " resize-none"} name={name} />
      )}
    </div>
  );
}
