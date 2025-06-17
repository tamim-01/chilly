interface PageProps {
  params: Promise<{ id: number }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  return <div>{id}</div>;
}
