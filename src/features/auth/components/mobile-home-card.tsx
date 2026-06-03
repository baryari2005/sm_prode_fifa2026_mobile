import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MobileHomeCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function MobileHomeCard({
  href,
  title,
  description,
  icon: Icon,
}: MobileHomeCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white py-0 shadow-[0_18px_50px_rgba(15,23,42,0.10)] transition-transform duration-200 active:scale-[0.99]">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#052b1c] text-[#D7FF87] ring-1 ring-[#39A935]/18">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              {description}
            </p>
          </div>
          <ChevronRight className="size-5 text-[#008C93]" />
        </CardContent>
      </Card>
    </Link>
  );
}
