import React from "react";

interface ILogoProps {
  color?: string;
}

export const Logo: React.FC<ILogoProps> = ({ color = "white" }) => (
  <h2 className="logo" style={{ color, padding: 20 }}>
    HotZ🎯ne
  </h2>
);
