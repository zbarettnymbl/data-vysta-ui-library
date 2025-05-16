import DemoWrapper from "@/components/DemoWrapper";
import { LazyLoadList } from "@datavysta/vysta-react";
import { useMemo, useState } from "react";

// Import from our mock service architecture
import { MockServiceFactory, User } from "@/lib/vysta-mocks";

export function LazyLoadListDemo() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Get a UserService instance from the factory
  const userService = useMemo(() => {
    const factory = MockServiceFactory.getInstance({
      networkConfig: {
        defaultDelay: 300, // 300ms delay to simulate network latency
        simulateJitter: true,
      },
    });
    return factory.getUserService();
  }, []);

  // Handle user selection changes
  const handleUserChange = async (userId: string | null) => {
    setSelectedUserId(userId);

    // If a user is selected, fetch the details
    if (userId) {
      const result = await userService.getById(userId);
      setSelectedUser(result.data);
    } else {
      setSelectedUser(null);
    }
  };

  // Custom inline styles using CSS variables
  const customStyles = {
    container: {
      backgroundColor: "var(--vysta-lazyloadlist-bg)",
      border: "1px solid var(--vysta-lazyloadlist-border)",
      color: "var(--vysta-lazyloadlist-text)",
      height: "100%",
    },
  };

  return (
    <DemoWrapper
      title="LazyLoadList"
      description="Efficient loading of large lists"
    >
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">User Directory</h3>
          <p className="text-muted-foreground mt-2">
            Browse through users with virtual scrolling for optimal performance.
          </p>
        </div>

        <div
          className="border rounded-md h-96 overflow-hidden"
          style={customStyles.container}
        >
          <LazyLoadList<User>
            repository={userService}
            displayColumn="name"
            value={selectedUserId}
            onChange={handleUserChange}
            label="Select User"
            clearable
          />
        </div>
      </div>
    </DemoWrapper>
  );
}
