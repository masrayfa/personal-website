import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterPillProps = {
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const FilterPill = ({
  label,
  value,
  isActive,
  onClick,
  disabled = false,
}: FilterPillProps) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-none transition-all duration-200 cursor-pointer",
        isActive && "ring-2 ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {label}
    </Button>
  );
};
