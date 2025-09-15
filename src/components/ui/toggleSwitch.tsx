import * as React from "react";

const ToggleSwitch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
  }
>(({ checked = false, onCheckedChange, label, className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleClick = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onCheckedChange?.(newState);
  };

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {label && <span className="text-sm text-slate-900">{label}</span>}
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleClick}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200
          ${isChecked ? "bg-slate-500" : "bg-slate-300"}
          focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
        {...props}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200
            ${isChecked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
});

ToggleSwitch.displayName = "ToggleSwitch";

export { ToggleSwitch };