import { DateValue } from "@internationalized/date";

// Helper function to convert DateValue to JS Date (start of day in UTC)
export const dateValueToDate = (dateVal: DateValue | undefined | null): Date | null => {
  if (!dateVal) return null;
  try {
    // Using UTC to avoid local time zone issues during comparison
    return dateVal.toDate('UTC');
  } catch (e) {
    console.error("Error converting DateValue to Date:", e);
    return null;
  }
};
