
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CodeToggle from "@/components/CodeToggle";

const ToastDemo = () => {
  const codeExample = `import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

// Default toast
<Button
  onClick={() => {
    toast({
      title: "Default Toast",
      description: "This is a default toast message",
    })
  }}
>
  Show Toast
</Button>

// Destructive toast
<Button
  variant="destructive"
  onClick={() => {
    toast({
      variant: "destructive",
      title: "Error Toast",
      description: "Something went wrong!",
    })
  }}
>
  Show Error Toast
</Button>`;

  return (
    <div className="space-y-8">
      <div className="rounded-md border p-6">
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => {
              toast({
                title: "Default Toast",
                description: "This is a default toast message",
              });
            }}
          >
            Show Toast
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Error Toast",
                description: "Something went wrong!",
              });
            }}
          >
            Show Error Toast
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Toast with Action",
                description: "This toast has an action button",
                action: (
                  <Button variant="outline" size="sm">
                    Undo
                  </Button>
                ),
              });
            }}
          >
            Toast with Action
          </Button>
        </div>
      </div>
      
      <CodeToggle code={codeExample} language="tsx" />
    </div>
  );
};

export default ToastDemo;
