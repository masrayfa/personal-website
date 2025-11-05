import { ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  disabled?: boolean;
};

export const FilterSection = ({
  title,
  children,
  disabled = false,
}: FilterSectionProps) => {
  return (
    <div className={`space-y-3 ${disabled ? "opacity-50" : ""}`}>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};
