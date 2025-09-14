import React from "react";

interface InteractiveIconProps {
  icon: any;
  altIcon?: string;
  onClick?: () => void;
}

export default function InteractiveIcon(
  props: InteractiveIconProps
): React.ReactNode {
  const { icon, altIcon, onClick } = props;
  return (
    <img onClick={onClick} src={altIcon || icon} className="cursor-pointer" />
  );
}
