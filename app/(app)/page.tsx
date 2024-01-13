import CategoryList from "../components/CategoryList";
import AddButton from "../components/AddButton";

export default async function App() {
  return (
    <>
      <CategoryList></CategoryList>
      <AddButton type={"category"}></AddButton>
    </>
  );
}
