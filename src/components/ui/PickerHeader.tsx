
import React from "react";
import { X, Image } from "lucide-react";
import { Button } from "./button";

type PickerHeaderProps = {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
};

export const PickerHeader: React.FC<PickerHeaderProps> = ({
  title,
  icon,
  onClose,
}) => (
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium text-gray-800 flex gap-2 items-center">
      {icon ?? <Image className="w-4 h-4 text-sky-600" />}
      <span>{title}</span>
    </h3>
    <Button
      variant="ghost"
      size="icon"
      onClick={onClose}
      className="h-8 w-8 rounded-full"
    >
      <X className="w-4 h-4" />
    </Button>
  </div>
);
