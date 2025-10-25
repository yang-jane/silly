export default function download(url: string, name: string): void {
  const link = document.createElement("a");
  link.download = name;
  link.href = url;
  link.click();
}
