"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ButtonBox from "../ButtonBox/ButtonBox";

export default function ExportInventoryButton() {
  const { data: session } = useSession();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!session?.accessToken) return;

    setIsExporting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/merch/inventory/export`,
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
      alert("Failed to download report");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ButtonBox
      option={"button"}
      type="button"
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? "Downloading..." : "📊 Export Inventory"}
    </ButtonBox>
  );
}
