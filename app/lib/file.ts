export async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function formatBytes(size: number, decimals = 1) {
  if (!Number.isFinite(size) || size <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1,
  );
  const value = size / 1024 ** index;
  return `${value.toFixed(index === 0 ? 0 : decimals)} ${units[index]}`;
}

export function getFileExtensionLabel(filename?: string | null) {
  if (!filename) return "FILE";
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1 || lastDot === filename.length - 1) {
    return "FILE";
  }
  const ext = filename.slice(lastDot + 1).toUpperCase();
  return ext.length <= 8 ? ext : ext.slice(0, 8);
}

export function shortenFileName(filename: string, maxLength = 48) {
  if (!filename) return "";
  if (filename.length <= maxLength) {
    return filename;
  }

  const ellipsis = "...";
  const extensionIndex = filename.lastIndexOf(".");
  const hasExtension = extensionIndex > 0 && extensionIndex < filename.length - 1;

  const extension = hasExtension ? filename.slice(extensionIndex) : "";
  const baseName = hasExtension ? filename.slice(0, extensionIndex) : filename;

  const available = maxLength - extension.length - ellipsis.length;
  if (available <= 0) {
    return `${filename.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
  }

  const leading = Math.ceil(available / 2);
  const trailing = Math.floor(available / 2);

  const start = baseName.slice(0, leading);
  const end = baseName.slice(Math.max(baseName.length - trailing, 0));

  return `${start}${ellipsis}${end}${extension}`;
}
