import AddButton from "../../../components/AddButton";

export default async function App({
  params,
}: {
  params: { folderName: string };
}) {
  return (
    <>
      <AddButton type={"category"}></AddButton>
    </>
  );
}
