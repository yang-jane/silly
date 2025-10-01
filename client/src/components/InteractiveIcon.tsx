import React from "react";

interface InteractiveIconProps {
  icon: any;
  label: string;
  altIcon?: string;
}

export default function InteractiveIcon(
  props: InteractiveIconProps
): React.ReactNode {
  const { icon, label, altIcon } = props;
  return (
    <div className="w-100 flex flex-col justify-center items-center hover:bg-gray-100 rounded-4xl hover:font-bold ">
      <img src={altIcon || icon} className="cursor-pointer " />
      <p className="py-4">{label}</p>
    </div>
  );
}
