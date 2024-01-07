import NavigationBar from "./components/NavigationBar";
import Topbar from "./components/TopBar";
import CategoryList from "./components/CategoryList";
import AddButton from "./components/AddButton";

export default async function App() {
  return (
    <main className="h-full w-full">
      <div className="h-full w-full flex">
        <NavigationBar></NavigationBar>
        <div className="flex flex-col h-full w-full">
          <Topbar type={"home"}></Topbar>
          <CategoryList></CategoryList>
          <AddButton type={"category"}></AddButton>
        </div>
      </div>
      <form action="/auth/sign-out" method="post">
        <button>Logout</button>
      </form>
    </main>
  );
}
