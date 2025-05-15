
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CodeToggle from "@/components/CodeToggle";

const AvatarDemo = () => {
  const codeExample = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Avatar with image
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// Avatar with fallback
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`;

  return (
    <div className="space-y-8">
      <div className="rounded-md border p-6">
        <div className="flex flex-wrap gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <Avatar className="bg-primary">
            <AvatarFallback className="text-primary-foreground">AB</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <CodeToggle code={codeExample} language="tsx" />
    </div>
  );
};

export default AvatarDemo;
