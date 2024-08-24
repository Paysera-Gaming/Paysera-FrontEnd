import { format } from "date-fns";

export const formatDate = (date: Date | number, formatString: string) => {
  return format(date, formatString);
};
    