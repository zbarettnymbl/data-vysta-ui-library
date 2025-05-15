import { useTheme } from "@/hooks/use-theme";

export default function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={
          theme === "dark"
            ? "/images/ce0a3825-0fb0-4837-b52a-c4cc37361cb7.png"
            : "/images/ba375976-144f-42f5-bd4f-73e04b2f6bdd.png"
        }
        alt="DataVysta Logo"
        className="h-8"
      />
    </div>
  );
}
