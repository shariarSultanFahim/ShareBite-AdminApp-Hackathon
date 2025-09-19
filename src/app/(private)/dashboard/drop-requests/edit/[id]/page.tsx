"use client";
import { useGetDropDetails } from "@/lib/actions/drop-requests/drop.details";
import { useParams } from "next/navigation";
import { DropEditForm } from "./_components/drop.edit.form";

export default function DropRequestsEdit() {
  const params = useParams();
  const id = params?.id;
  const { data: dropDetails } = useGetDropDetails({ id: id as string });
  const status = dropDetails?.data?.data?.results?.[0].status;

  return (
    <>
      <DropEditForm status={status} id={id} />
    </>
  );
}
