import { FiCheckCircle } from "react-icons/fi";

interface FormSuccessProps {
	message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className="bg-emerald-300 p-2 rounded flex items-center gap-x-2 text-sm text-white">
			<FiCheckCircle className="size-4" />
			<p>{message}</p>
		</div>
	);
};
