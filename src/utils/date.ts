import { compareAsc, compareDesc, getUnixTime } from "date-fns";

export function sortDates(dates: Date[], orderType: "acs" | "desc") {
	const list = [...dates];

	if (orderType === "acs") {
		return list.sort(compareAsc);
	}

	if (orderType === "desc") {
		return list.sort(compareDesc);
	}
}

export function getUTCTimestamp() {
	return getUnixTime(new Date());
}
