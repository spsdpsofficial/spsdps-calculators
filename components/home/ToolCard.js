import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { toolPath } from "@/lib/tools";
import { getToolIcon } from "@/lib/tools/menu";

/** A tool as a card: coloured icon tile, name and one-line description. Used on the home and category pages. */
export default function ToolCard({ tool, prefetch = false }) {
  return (
    <Link
      href={toolPath(tool)}
      prefetch={prefetch}
      data-cat={tool.category}
      className="lift cat-border flex h-full flex-col rounded-2xl border border-line bg-card p-5"
    >
      <span className="cat-solid flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon name={getToolIcon(tool)} className="h-6 w-6" />
      </span>
      <span className="mt-4 text-[17px] font-bold leading-snug text-ink">{tool.name}</span>
      <span className="mt-1.5 text-sm leading-relaxed text-muted">{tool.description}</span>
    </Link>
  );
}
