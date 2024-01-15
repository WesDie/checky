import AddButton from "../../../../../components/AddButton";

export default async function App({
  params,
}: {
  params: { listName: string };
}) {
  return (
    <>
      <p className="m-auto opacity-50">Folder: {params.listName}</p>
      <AddButton type={"list"}></AddButton>
    </>
  );
}
