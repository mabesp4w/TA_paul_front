/** @format */

// components/Reader/HighlightMenu.jsx
import { useState } from "react";
import { Edit, X } from "lucide-react";

export default function HighlightMenu() {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");

  // This component would be positioned near selected text
  // Here we're just showing a mockup of the component

  return (
    <div className="relative my-10 mx-auto w-fit">
      {/* This div would actually be positioned absolutely near the selected text */}
      <div className="flex bg-base-100 rounded-lg shadow-lg border p-1 items-center">
        <div className="flex">
          <button
            className="btn btn-sm btn-square btn-ghost tooltip"
            data-tip="Highlight Kuning"
          >
            <div className="w-5 h-5 bg-amber-200 rounded"></div>
          </button>
          <button
            className="btn btn-sm btn-square btn-ghost tooltip"
            data-tip="Highlight Hijau"
          >
            <div className="w-5 h-5 bg-green-200 rounded"></div>
          </button>
          <button
            className="btn btn-sm btn-square btn-ghost tooltip"
            data-tip="Highlight Biru"
          >
            <div className="w-5 h-5 bg-blue-200 rounded"></div>
          </button>
          <button
            className="btn btn-sm btn-square btn-ghost tooltip"
            data-tip="Tambah Catatan"
            onClick={() => setShowNoteInput(!showNoteInput)}
          >
            <Edit size={16} />
          </button>
        </div>

        <div className="divider divider-horizontal h-6 mx-1"></div>

        <button
          className="btn btn-sm btn-square btn-ghost tooltip"
          data-tip="Tutup"
        >
          <X size={16} />
        </button>
      </div>

      {/* Note input (would appear after clicking the note button) */}
      {showNoteInput && (
        <div className="mt-2 p-2 bg-base-100 rounded-lg shadow-lg border">
          <textarea
            className="textarea textarea-bordered w-full text-sm"
            placeholder="Ketik catatan Anda..."
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowNoteInput(false)}
            >
              Batal
            </button>
            <button className="btn btn-sm btn-primary">Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
}
