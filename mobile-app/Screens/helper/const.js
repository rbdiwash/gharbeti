export function trimWithEllipsis(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

export function getInitials(name) {
  if (!name) return "";
  const nameParts = name.split(" ");
  if (nameParts.length === 1) return nameParts[0].charAt(0);
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
}

export function formatDateTime(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
