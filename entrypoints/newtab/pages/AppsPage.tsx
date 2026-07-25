import Clock from "@/components/Clock";
import SalutationBox from "@/components/SalutationBox";
import MultiSearch from "@/components/MultiSearch";
import UserApps from "@/components/UserApps";

const DashboardPage = () => {
	return (
		<div className="w-full max-w-352">
			<Clock className="items-center justify-center gap-2 font-light mb-3" digitStyle="text-3xl text-shadow-lg" />
			<SalutationBox className="text-shadow-lg text-3xl items-center justify-center mb-8 mx-auto" />
			<MultiSearch className="mb-5" />
			<UserApps />
		</div>
	);
};

export default DashboardPage;
