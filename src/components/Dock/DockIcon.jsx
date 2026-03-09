import React from "react";
import { useState } from "react";

function DockIcon({ icon, label, onClick, onContextMenu, hideLabel }) {
  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer"
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {icon}
      {!hideLabel && (
        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 px-2 py-1 rounded">
          {label}
        </div>
      )}
    </div>
  );
}

export default DockIcon;
