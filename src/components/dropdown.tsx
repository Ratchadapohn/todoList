import React, { useState } from "react";
import { Option } from "../interface";
import { CiMenuKebab } from "react-icons/ci";

interface dropdownItemProps {
  icon?: string;
  options: Option[];
}

export const Dropdown: React.FC<dropdownItemProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        <CiMenuKebab />
      </div>
      {isOpen && (
        <div>
          {options.map((option: Option) => {
            return <button>{option.value}</button>;
          })}
        </div>
      )}
    </div>
  );
};
