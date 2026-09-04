"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ButtonBox from "../ButtonBox/ButtonBox";
import toast from "react-hot-toast";

export default function ExportPopsButton() {
  const { data: session } = useSession();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!session?.accessToken) return;

    setIsExporting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/pops/export`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!res.ok) throw new Error("Ошибка при формировании отчета");

      // Получаем файл как Blob
      const blob = await res.blob();

      // Создаем виртуальную ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pop_audit_report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();

      // Очищаем ссылку
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to download");
    } finally {
      setIsExporting(false);
      toast.success("Report downloaded");
    }
  };

  return (
    <ButtonBox
      option={"button"}
      type="button"
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? "Downloading..." : "📊 Export POP data"}
    </ButtonBox>
  );
}
