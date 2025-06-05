import React from "react";

import { cn } from "@/core/utils";

export type TSpinnerProps = React.HTMLAttributes<HTMLDivElement>;

const Spinner = ({ className, ...props }: TSpinnerProps) => {
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
