"use client";
import { Button } from "antd";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button
      type="link"
      icon={<ArrowBigLeft />}
      onClick={() => router.back()}
      className="font-semibold text-primary-400"
    >
      {children || <>Back to Previous Page</>}
    </Button>
  );
}
