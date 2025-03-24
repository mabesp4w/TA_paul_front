/** @format */

// src/components/reader/ReaderSettings.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Type, PanelLeft } from "lucide-react";
import { useSettingContext } from "@/context/SettingContext";

interface ReaderSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    fontSize: number;
    fontFamily: string;
    theme: string;
    lineSpacing: number;
  };
  onSettingsChange: (settings: any) => void;
}

const ReaderSettings = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: ReaderSettingsProps) => {
  // context
  const { changeSetting, setChangeSetting } = useSettingContext();
  const [localSettings, setLocalSettings] = useState(settings);

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Apply changes and close
  const handleApply = () => {
    onSettingsChange(localSettings);
    setChangeSetting(!changeSetting);
    onClose();
  };

  // Handle setting changes
  const handleChange = (key: string, value: any) => {
    setLocalSettings({
      ...localSettings,
      [key]: value,
    });
  };

  // Font size options
  const fontSizeOptions = [
    { value: 14, label: "Kecil" },
    { value: 16, label: "Normal" },
    { value: 18, label: "Sedang" },
    { value: 20, label: "Besar" },
    { value: 22, label: "Sangat Besar" },
  ];

  // Font family options
  const fontFamilyOptions = [
    { value: "serif", label: "Serif" },
    { value: "sans-serif", label: "Sans-serif" },
    { value: "monospace", label: "Monospace" },
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "Georgia, serif", label: "Georgia" },
  ];

  // Theme options
  // const themeOptions = [
  //   { value: "light", label: "Terang", icon: <Sun size={16} /> },
  //   { value: "dark", label: "Dark", icon: <Moon size={16} /> },
  // ];

  // Line spacing options
  const lineSpacingOptions = [
    { value: 1.2, label: "Sempit" },
    { value: 1.5, label: "Normal" },
    { value: 1.8, label: "Lebar" },
    { value: 2.0, label: "Sangat Lebar" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Pengaturan Tampilan</h2>
          <button className="btn btn-ghost btn-circle" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Font Size */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-2">
                  <Type size={16} /> Ukuran Font
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm">A</span>
                  <input
                    type="range"
                    min="14"
                    max="22"
                    step="2"
                    value={localSettings.fontSize}
                    onChange={(e) =>
                      handleChange("fontSize", parseInt(e.target.value))
                    }
                    className="range range-sm range-primary mx-2"
                  />
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  {fontSizeOptions.map((option) => (
                    <span
                      key={option.value}
                      className={
                        localSettings.fontSize === option.value
                          ? "font-bold text-primary"
                          : ""
                      }
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          </div>

          {/* Font Family */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-2">
                  <Type size={16} /> Jenis Font
                </span>
              </div>
              <select
                className="select select-bordered w-full"
                value={localSettings.fontFamily}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
              >
                {fontFamilyOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    style={{ fontFamily: option.value }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Theme Selection */}
          {/* <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-2">
                  <Palette size={16} /> Tema
                </span>
              </div>
              <select
                className="select select-bordered w-full"
                value={localSettings.theme}
                onChange={(e) => handleChange("theme", e.target.value)}
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-3">
                {themeOptions.slice(0, 9).map((option) => (
                  <button
                    key={option.value}
                    className={`w-8 h-8 rounded-full border ${
                      localSettings.theme === option.value
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    style={{
                      backgroundColor: getThemeColor(option.value),
                    }}
                    onClick={() => handleChange("theme", option.value)}
                    title={option.label}
                  ></button>
                ))}
              </div>
            </label>
          </div> */}

          {/* Line Spacing */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-2">
                  <PanelLeft size={16} /> Jarak Baris
                </span>
              </div>
              <div className="flex gap-2">
                {lineSpacingOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`btn btn-sm flex-1 ${
                      localSettings.lineSpacing === option.value
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                    onClick={() => handleChange("lineSpacing", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={handleApply}>
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to get a representative color for theme previews
// function getThemeColor(theme: string): string {
//   const themeColors: { [key: string]: string } = {
//     light: "#ffffff",
//     cupcake: "#faf7f5",
//     bumblebee: "#fffbeb",
//     emerald: "#f0fdf4",
//     corporate: "#f8fafc",
//     synthwave: "#2d1b69",
//     retro: "#e4d8b4",
//     cyberpunk: "#ffee00",
//     valentine: "#fecdd3",
//     lofi: "#e5e5e5",
//     pastel: "#d1c1d7",
//     fantasy: "#ffe799",
//     wireframe: "#ebebeb",
//     black: "#000000",
//     luxury: "#170b00",
//     dracula: "#282a36",
//     night: "#0f1729",
//     dark: "#1d232a",
//     coffee: "#20161f",
//   };

//   return themeColors[theme] || "#ffffff";
// }

export default ReaderSettings;
