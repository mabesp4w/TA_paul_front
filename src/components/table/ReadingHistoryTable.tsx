/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  history: any[];
};

const ReadingHistoryTable = ({ history }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Buku</th>
            <th>Kemajuan</th>
            <th className="hidden md:table-cell">Format</th>
            <th className="hidden md:table-cell">Terakhir Dibaca</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-14 shrink-0">
                    <Image
                      src={item.cover || `/api/placeholder/40/60`}
                      alt={`Cover buku ${item.title}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-xs opacity-70">{item.author}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="w-32">
                  <div className="mb-1 text-xs">{item.progress}%</div>
                  <progress
                    className="progress progress-primary h-1.5"
                    value={item.progress}
                    max="100"
                  ></progress>
                </div>
              </td>
              <td className="hidden md:table-cell">{item.format}</td>
              <td className="hidden md:table-cell">{item.lastRead}</td>
              <td>
                <div
                  className={`badge ${
                    item.status === "Aktif"
                      ? "badge-primary badge-outline"
                      : "badge-secondary badge-outline"
                  }`}
                >
                  {item.status}
                </div>
              </td>
              <td>
                <Link
                  href={`/baca/${item.id}`}
                  className="btn btn-ghost btn-xs"
                >
                  {item.status === "Aktif" ? "Lanjutkan" : "Lihat"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadingHistoryTable;
