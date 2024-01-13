import NavigationBar from "../components/NavigationBar";
import Topbar from "../components/TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <div className="h-full w-full flex">
        <NavigationBar></NavigationBar>
        <div className="flex flex-col h-full w-full">
          <Topbar></Topbar>
          {children}
        </div>
      </div>
    </main>
  );
}
