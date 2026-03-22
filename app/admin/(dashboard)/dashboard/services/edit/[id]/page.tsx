import { Metadata } from "next";
import EditServiceForm from "./EditServiceForm";

export const metadata: Metadata = {
  title: "Edit Service | Admin Dashboard",
  description: "Edit your service details",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditServicePage({ params }: PageProps) {
  return <EditServiceForm serviceId={params.id} />;
}
