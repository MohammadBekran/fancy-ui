import React from "react";

import { cn } from "@/core/utils";

export interface ISpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner = ({ className, ...props }: ISpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        className
      )}
      {...props}
    />
  );
};

export default Spinner;
