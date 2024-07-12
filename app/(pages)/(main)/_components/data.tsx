'use client';
import { useState } from 'react';

import { CalendarIcon, PlusCircle } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

export const Data = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<section className="flex-[1.5] bg-[#252525]">
			{/* Display */}
			<div className="w-full h-[50%] flex justify-center items-center">
				<Image src="notes-dark.svg" width={300} height={300} className="w" alt="notes-img" />
			</div>

			{/* Dates */}
			<div className="px-4 h-[15%] text-white">
				{/* header */}
				<p className="text-[#f5c86d] text-md font-semibold">Select date</p>
				<div className="w-full h-[80%] flex items-center ">
					<Popover>
						<PopoverTrigger className="w-full">
							<div className="p-2 rounded-md flex items-center justify-between w-full hover:bg-muted-foreground bg-[#131313]">
								<p>Date</p>
								<CalendarIcon className="w-4 h-4" />
							</div>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								className="bg-[#09090b] h-full rounded-md border"
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* Sort methods */}
			<div className="mt-[5%] px-4 h-[30%] text-white">
				<div className="flex items-center justify-between mb-4">
					<p className="text-[#f5c86d] text-md font-semibold">Sort Method</p>
					<Button size="sm" variant="ghost" className="flex items-center text-[#b9b6b6]">
						<PlusCircle className="w-4 h-4 mr-1" />
						<p className="text-sm">Add method</p>
					</Button>
				</div>
				{/* content */}
				<ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					<li className="w-full text-center">
						<Button size="sm" className="w-full bg-gray-500">
							None
						</Button>
					</li>
					<li className="w-full text-center">
						<Button size="sm" className="w-full bg-blue-500">
							Priority
						</Button>
					</li>
					<li className="w-full text-center">
						<Button size="sm" className="w-full bg-orange-500">
							Name
						</Button>
					</li>
					<li className="w-full text-center">
						<Button size="sm" className="w-full bg-green-500">
							Date
						</Button>
					</li>
				</ul>
			</div>
		</section>
	);
};
