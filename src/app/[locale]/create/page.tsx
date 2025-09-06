"use client";
import Spinner from "@/components/common/Spinner";
import CreateForm from "@/components/domain/create/CreateForm";
import LoginForm from "@/components/domain/create/LoginForm";
import { useUser } from "@/context/UserContext";

export default function CreatePage() {
  const { user, isPending } = useUser();

  if (isPending) return <Spinner />;

  if (!user) return <LoginForm />;

  return <CreateForm />;
}
