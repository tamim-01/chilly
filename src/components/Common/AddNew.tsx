import Button from "../UI/Button";

export default function AddNew() {
  return (
    <section className="md:p-8 mt-12">
      <Button
        variant="secondary"
        size="lg"
        className="md:px-10 px-4 py-0 rounded-[16px]"
      >
        + Add New
      </Button>
    </section>
  );
}
