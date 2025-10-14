import SideNavigation from "@/components/SideNavigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[14rem_1fr] h-full w-full">
      <SideNavigation />

      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
