export default function LazyModalContent() {
  return (
    <div>
      <h2 className="text-[32px] font-bold">Code Splitting</h2>

      <h4 className="mt-3">
        The Contents of this modal are lazy loaded with a 1000ms delay
      </h4>

      <h4>As well as each individual page(no delay).</h4>
    </div>
  );
}
