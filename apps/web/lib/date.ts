import { format } from "date-fns";

export function formatDate(date: string | Date | number) {
	return format(date, "dd/MM/yyyy");
}
