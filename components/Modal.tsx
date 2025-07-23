"use client";
// 옵션 버튼 등을 클릭했을 때 뜨는 모달
import { ButtonHTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  hasCloseBtn = false,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }

    function handleClickOutside(e: MouseEvent) {
      if (e.target === dialog.current) {
        onClose();
      }
    }

    dialog.current?.addEventListener("click", handleClickOutside);
    return () => {
      dialog.current?.removeEventListener("click", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <dialog
      className="min-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-700 text-(--foreground) focus:outline-hidden"
      ref={dialog}
    >
      <div className="w-full h-full">{children}</div>
    </dialog>
  );
}

type ListItemProps = {
  children: React.ReactNode;
  classes?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ListItem({ children, classes = "", ...props }: ListItemProps) {
  return (
    <li className="py-2 cursor-pointer focus:outline-none text-base text-center hover:bg-slate-800">
      <button
        className={`w-full h-full focus:outline-none ${classes}`}
        {...props}
        autoFocus={false}
      >
        {children}
      </button>
    </li>
  );
}
