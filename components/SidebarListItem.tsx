type ListItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export default function ListItem({ icon, label, onClick }: ListItemProps) {
  return (
    <li
      onClick={onClick}
      className="flex gap-3 justify-center md:justify-start items-center w-full hover:bg-slate-900 cursor-pointer rounded-md p-2"
    >
      {icon}
      <p className="hidden md:block">{label}</p>
    </li>
  );
}
