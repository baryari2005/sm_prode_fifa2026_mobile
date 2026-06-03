import type { ReactNode } from "react";

type CreateUserStepSectionHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function CreateUserStepSectionHeader({
  title,
  description,
  icon,
}: CreateUserStepSectionHeaderProps) {
  return (
    <div className="space-y-1 pb-1">
      <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#8FCBEB]">
        {icon ? <span className="text-[#8FCBEB]">{icon}</span> : null}
        <span>{title}</span>
      </h3>
      {description ? (
        <p className="text-xs leading-5 text-white/60">{description}</p>
      ) : null}
    </div>
  );
}
