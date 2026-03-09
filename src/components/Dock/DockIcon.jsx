function DockIcon({ icon, label, onClick }) {
  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer"
      onClick={onClick}
    >
      {icon}

      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50">
        {label}
      </div>
    </div>
  );
}

export default DockIcon;