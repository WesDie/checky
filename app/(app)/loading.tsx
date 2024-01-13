export default function loading() {
  return (
    <div className="flex flex-col gap-4 w-full px-6 py-6">
      {Array.from(Array(10).keys()).map((i) => (
        <div
          key={i}
          className="inline-block h-12 animate-pulse bg-secondary-bg w-full rounded-md"
        ></div>
      ))}
    </div>
  );
}
