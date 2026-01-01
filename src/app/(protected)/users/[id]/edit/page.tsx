import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/guard";
import { getUser } from "@/lib/api";
import { Container } from "@/components/layout";
import { EditUserForm } from "./edit-form";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditUserPageProps) {
  const { id } = await params;
  const user = await getUser(id);
  return {
    title: user ? `Edit ${user.name}` : "User Not Found",
  };
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  await requireAuth();
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="py-12">
      <Container size="lg">
        <EditUserForm user={user} />
      </Container>
    </div>
  );
}

