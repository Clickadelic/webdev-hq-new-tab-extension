import { BsExclamationCircle } from "react-icons/bs";
interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className="bg-destructive p-2 rounded flex items-center gap-x-2 text-sm text-white">
			<BsExclamationCircle className="size-4" />
			<p>{message}</p>
		</div>
	);
};
