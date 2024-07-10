// Lucide Icons
import { PlusCircle } from 'lucide-react';

export const Home = () => {
	return (
		<section className="flex-[3] bg-[#131313] ">
			{/* Header */}
			<div className="text-white mx-10 mt-10">
				<h1 className="flex text-3xl font-semibold text-[#e2e4e2]">
					Hello <span className="ml-1.5 font-bold text-[#f5c86d]">Andrew Tate!</span>
				</h1>
				<h1 className="ml-5 text-3xl font-semibold text-[#929092]">What's your plan today?</h1>
			</div>

			{/* Content */}
			<div className="text-white mx-10 mt-10 space-y-3">
				{/* create new list */}
				<div className="flex items-center w-full p-3 rounded-md bg-[#252525]">
					<PlusCircle className="w-6 h-6 text-[#b9b6b6] mr-2" />
					<h1 className="text-md text-[#626060] ">Add to do</h1>
				</div>

				{/* map all list */}
				<h1 className="text-md text-[#b9b6b6] w-full p-3 rounded-md bg-[#252525]">Data 1</h1>
				<h1 className="text-md text-[#b9b6b6] w-full p-3 rounded-md bg-[#252525]">Data 2</h1>
				<h1 className="text-md text-[#b9b6b6] w-full p-3 rounded-md bg-[#252525]">Data 3</h1>
				<h1 className="text-md text-[#b9b6b6] w-full p-3 rounded-md bg-[#252525]">Data 4</h1>
			</div>
		</section>
	);
};
