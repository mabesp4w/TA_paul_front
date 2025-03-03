/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import { FC, useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { BASE_URL } from "@/services/baseURL";

type Props = {
  control: any;
  required?: boolean;
  name: string;
  setValue: any;
  errors?: any;
  addClass?: any;
  label: string;
  initialValue?: string;
  disabled?: boolean;
  labelCss?: string;
  folder: string;
};

const RichTextEditor: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  initialValue,
  setValue,
  disabled = false,
  labelCss = "text-gray-700",
  folder,
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef<any>(null);
  const [trackedImages, setTrackedImages] = useState<Set<string>>(new Set());
  const [temporarilyRemovedImages, setTemporarilyRemovedImages] = useState<{
    [key: string]: number;
  }>({});

  // Set editor loaded state
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // Set initial value effect
  useEffect(() => {
    if (initialValue) {
      setValue(name, initialValue);

      // Extract initial images to track
      if (initialValue) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = initialValue;
        const imgElements = tempDiv.querySelectorAll("img");
        const initialImageUrls = new Set<string>();

        imgElements.forEach((img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("blob:") && !src.startsWith("data:")) {
            initialImageUrls.add(src);
          }
        });

        setTrackedImages(initialImageUrls);
      }
    }
  }, [name, initialValue, setValue]);

  // Cleanup effect - process any remaining deleted images on unmount
  useEffect(() => {
    return () => {
      // Delete any images that were temporarily removed but never restored
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(temporarilyRemovedImages).forEach(([url, timestamp]) => {
        deleteImageFromServer(url);
      });
    };
  }, [temporarilyRemovedImages]);

  // Function to get authentication token - adjust this based on your auth method
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      // Get token from localStorage - adjust based on your auth implementation
      return Cookies.get("token") || "";
    }
    return "";
  };

  // Function to delete image from backend
  const deleteImageFromServer = async (imageUrl: string) => {
    try {
      const token = getAuthToken();

      // Extract the file path from the URL
      let filePath = imageUrl;

      // If it's a full URL, extract just the path part
      if (filePath.startsWith("http")) {
        try {
          const url = new URL(filePath);
          filePath = url.pathname;
        } catch (e) {
          console.error("Failed to parse URL:", e);
        }
      }

      // Remove any leading slash and BASE_URL if present
      filePath = filePath.replace(BASE_URL, "").replace(/^\//, "");

      const response = await fetch(`${BASE_URL}/api/images/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ path: filePath }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      return true;
    } catch (error) {
      console.error("Failed to delete image:", error);
      return false;
    }
  };

  // Function to check for removed images
  const checkRemovedImages = (content: string) => {
    // Extract current images from content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const imgElements = tempDiv.querySelectorAll("img");
    const currentImageUrls = new Set<string>();

    imgElements.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("blob:") && !src.startsWith("data:")) {
        currentImageUrls.add(src);
      }
    });

    // Find images that were in trackedImages but not in currentImageUrls
    const removedImages: string[] = [];
    trackedImages.forEach((url) => {
      if (!currentImageUrls.has(url)) {
        // Image is no longer in the content
        if (!temporarilyRemovedImages[url]) {
          // First time we notice this image is missing - might be cut

          // Add to temporarily removed with timestamp
          setTemporarilyRemovedImages((prev) => ({
            ...prev,
            [url]: Date.now(),
          }));
        } else {
          // Check if it's been missing for more than 10 seconds (adjust as needed)
          const timeRemoved = temporarilyRemovedImages[url];
          const currentTime = Date.now();

          if (currentTime - timeRemoved > 10000) {
            // It's been missing for a while, consider it permanently deleted
            removedImages.push(url);

            // Remove from temporarily tracked
            setTemporarilyRemovedImages((prev) => {
              const newState = { ...prev };
              delete newState[url];
              return newState;
            });
          }
        }
      } else {
        // Image is back in the content - remove from temporarily removed if it was there
        if (temporarilyRemovedImages[url]) {
          setTemporarilyRemovedImages((prev) => {
            const newState = { ...prev };
            delete newState[url];
            return newState;
          });
        }
      }
    });

    // Update tracked images
    setTrackedImages(currentImageUrls);

    // Delete confirmed removed images from server
    removedImages.forEach((url) => {
      deleteImageFromServer(url);
    });
  };

  const editorConfig = {
    height: 500,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic underline | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "link image media table | removeformat | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    image_advtab: true,
    image_uploadtab: true,
    // Modified upload handler to properly handle the response
    images_upload_handler: function (blobInfo: any, progress: any) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("photo_path", blobInfo.blob(), blobInfo.filename());
        formData.append("folder", folder);

        // Get token for authentication
        const token = getAuthToken();

        // Send request to Laravel backend
        fetch(`${BASE_URL}/api/images`, {
          method: "POST",
          headers: {
            // No need to set Content-Type as it's automatically set with FormData
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP Error: " + response.status);
            }

            // Check the content type header to determine how to parse the response
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              return response.json().then((data) => ({ isJson: true, data }));
            } else {
              // Handle plain text response
              return response
                .text()
                .then((text) => ({ isJson: false, data: text }));
            }
          })
          .then((result) => {
            let imageUrl;

            if (result.isJson) {
              // Process JSON response
              const data = result.data;
              imageUrl = data.location || data.url || data.data?.url;
            } else {
              // The response is plain text, assume it's the image path/URL
              imageUrl = result.data;
            }

            if (!imageUrl) {
              console.error("No image URL in response:", result);
              reject("Image upload success but no URL returned");
              return;
            }

            // Ensure URL is absolute (starts with http or https)
            const finalUrl = imageUrl.startsWith("http")
              ? imageUrl
              : `${BASE_URL}/storage${
                  imageUrl.startsWith("/") ? "" : "/"
                }${imageUrl}`;

            // Add to tracked images
            setTrackedImages((prev) => {
              const newSet = new Set(prev);
              newSet.add(finalUrl);
              return newSet;
            });

            resolve(finalUrl);
          })
          .catch((error) => {
            console.error("Image upload failed:", error);
            reject("Image upload failed: " + error.message);
          });
      });
    },
    automatic_uploads: true,
    file_picker_types: "image",
    // File picker callback for selecting images from computer
    file_picker_callback: function (cb: any, value: any, meta: any) {
      if (meta.filetype === "image") {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.addEventListener("change", (e: Event) => {
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];

          if (file) {
            // Create file reader to get base64 data for preview
            const reader = new FileReader();
            reader.onload = () => {
              // Create a unique ID for the blob
              const id = "blobid" + new Date().getTime();
              const blobCache = (window as any).tinymce.activeEditor
                .editorUpload.blobCache;
              const base64 = (reader.result as string).split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              // Callback with blob uri for preview
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          }
        });

        input.click();
      }
    },
    // Setup event handlers
    setup: function (editor: any) {
      editorRef.current = editor;

      editor.on("init", function () {
        // console.log("TinyMCE initialized");
      });

      editor.on("error", function (e: any) {
        console.error("TinyMCE error:", e);
      });

      // Listen for specific keyboard events
      editor.on("keydown", function (e: any) {
        // Check if the keydown event is for Cut (Ctrl+X)
        if (e.keyCode === 88 && e.ctrlKey) {
          // 88 is the key code for 'X'
          // We'll handle the image tracking in checkRemovedImages
        }

        // Delete and Backspace keys
        if (e.keyCode === 46 || e.keyCode === 8) {
          // 46 is Delete, 8 is Backspace
          const selectedNode = editor.selection.getNode();
          if (selectedNode.tagName === "IMG") {
            const src = selectedNode.getAttribute("src");
            // Deletion will be detected by checkRemovedImages
          }
        }
      });

      // For mobile or context menu delete
      editor.on("remove", function (e: any) {
        // console.log("Element removed", e);
      });

      // Listen for paste events (may contain cut images being pasted back)
      editor.on("paste", function (e: any) {
        // Content changes will be caught by onEditorChange
      });
    },
    // Add paste options to handle clipboard images better
    paste_data_images: true,
    // Remove blob URLs from content if possible
    convert_urls: true,
    // Use relative URLs
    relative_urls: false,
    // Remove script elements on paste
    invalid_elements: "script",
  };

  return (
    <div className={`flex flex-col ${addClass}`}>
      <label className={`text-sm font-medium tracking-wide ${labelCss}`}>
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {editorLoaded ? (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <Editor
              apiKey="yocvdqrq6g2uqr5fbogpv778q8zxhbgbzb6lbhc07sdzwr6t" // Use your own API key from https://www.tiny.cloud/
              init={editorConfig}
              disabled={disabled}
              initialValue={initialValue}
              onEditorChange={(content: any, editor: any) => {
                field.onChange(content);
                // Check for removed images when content changes
                checkRemovedImages(content);
              }}
              onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.on("Change", () => {
                  field.onChange(editor.getContent());
                });
              }}
            />
          )}
        />
      ) : (
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
          <p className="text-gray-500">Loading Editor...</p>
        </div>
      )}
      {errors && errors[name] && errors[name].type === "required" && (
        <p className="text-red-500 font-inter italic text-sm mt-1">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
