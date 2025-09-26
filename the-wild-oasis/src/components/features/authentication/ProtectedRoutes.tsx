import { DataTableSkeleton } from "@/components/my-ui/DataTableSkelton";
import { getCurrentUser } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }: { children: React.JSX.Element }) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  if (isLoading) return <DataTableSkeleton />;

  if (!isLoading && user) return children;

  if (!isLoading && !user) {
    navigate("/login");
  }

  return null;
}

export default ProtectedRoutes;
