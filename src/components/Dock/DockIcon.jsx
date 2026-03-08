function DockIcon({ icon, onClick }) {

  return (
    <div
      onClick={onClick}
      className="text-white hover:scale-125 transition duration-200 cursor-pointer"
    >
      {icon}
    </div>
  );
}

export default DockIcon;