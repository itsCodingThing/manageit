import { LoaderCircleIcon } from "./icons";

export function Loader() {
	return (
		<div className="w-full flex justify-center">
			<LoaderCircleIcon className="animate-spin h-10 w-10" />
		</div>
	);
}
