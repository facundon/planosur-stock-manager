export function formatInputDate(date: Date) {
   return date.toISOString().split("T")[0]
}
