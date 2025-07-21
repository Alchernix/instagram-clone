import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  classes: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, classes, ...props }: ButtonProps) {
  return (
    <button
      className={"font-bold rounded-md py-1 px-2 cursor-pointer " + classes}
      {...props}
    >
      {children}
    </button>
  );
}

type InfoItemProps = {
  label: string;
  count: number;
};

export function InfoItem({ label, count }: InfoItemProps) {
  return (
    <li className="flex gap-1">
      <span className="text-(--light-text)">{label}</span>
      <span className="font-bold">{count}</span>
    </li>
  );
}

export function TapItem({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 flex justify-center py-3">{children}</div>;
}
