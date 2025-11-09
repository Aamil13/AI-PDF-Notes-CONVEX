import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeHtmlBackticks(str: string) {
  return (
    str
      // Remove ```html and ``` at start/end
      .replace(/^```html\s*|\s*```$/g, '')
      // Remove any max-w-* classes from class or className attributes
      .replace(/\b(max-w-[^\s'"]+)\b/g, '')
  );
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
  } else {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }
}
