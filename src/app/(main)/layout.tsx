import "../globals.css";

import { UserProvider } from "@/contexts/UserContext";
import PageTemplate from "@/templates/PageTemplate";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <PageTemplate>{children}</PageTemplate>
    </UserProvider>
  );
}
