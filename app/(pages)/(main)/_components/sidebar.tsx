'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Lucide Icons
import { Lightbulb, PlusCircle, Trash, X } from 'lucide-react';

// Shacn UI component
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Sonner Library
import { toast } from 'sonner';

// Zustand hooks
import useSubjectIdStore from '@/store/subjectIdStore';

export const Sidebar = () => {
	// Desctructuromg zustand hooks
	const { id, updateSubjectId } = useSubjectIdStore((state) => ({
		id: state.id,
		updateSubjectId: state.updateSubjectId,
	}));

	// handles the active button and updating the subjectId
	const [activeBtn, setActiveBtn] = useState('0');
	const handleActiveBtn = (id: string) => {
		updateSubjectId(id);
		setActiveBtn(id);
	};

	const [progress, setProgress] = useState(13);
	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(66), 500;
			return () => {
				clearTimeout(timer);
			};
		});
	}, []);

	// GET all subjects
	const [subjects, setSubject] = useState([]);
	const getAllSubject = async () => {
		const response = await axios.get('/api/subject');

		// Check if there are any subjects
		if (!response || !response.data.subjects) {
			return toast.error('No subject found!');
		}

		console.log(response.data.subjects);
		return setSubject(response.data.subjects);
	};

	// Query all subject once
	useEffect(() => {
		getAllSubject();
	}, []);

	// POST new subject
	const [title, setTitle] = useState('');
	const createSubject = async () => {
		if (!title) {
			return toast.error('Subject title is required!');
		}

		// Data to update
		const dataaa: any = {
			title: title,
		};

		// Put request
		const response = await axios.post('/api/subject', dataaa);

		// reset
		setTitle('');
		console.log(response);
		getAllSubject();
		return toast.success('Successfully created new subject');
	};

	// DELETE single subject
	const handleDeleteSubject = async (subjectId: string) => {
		try {
			// Prompt the user for confirmation
			const confirmDelete = window.confirm('Are you sure you want to delete this subject?');

			// If user confirms deletion
			if (confirmDelete) {
				// Delete Request
				const response = await axios.delete(`/api/subject/${subjectId}`);

				// Refetch all users
				console.log('delete: ', response);
				getAllSubject();
				return toast.success('User is deleted successfully');
			}
		} catch (error: any) {
			return toast.error('Something went wrong');
		}
	};
	return (
		<section className="relative flex-1 bg-[#252525] text-white py-4  space-y-10">
			{/* header */}
			<div className="flex items-center mx-4">
				<Lightbulb className="w-[30] h-[30] mr-2" />
				<h4 className="text-2xl font-bold text-[#f5c86d]">MERALCO</h4>
			</div>

			{/* Subject List */}
			<div className="mx-4 text-md">
				<h4 className="font-semibold mb-2">My Lists {id}</h4>
				<ul className="space-y-3">
					<li className="py-2 rounded-md text-[#b9b6b6] flex items-center justify-between">
						<input
							type="text"
							placeholder="Add new subject"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							value={title}
							className="text-sm text-black h-7 px-2 py-1 rounded-md w-[80%]"
						/>
						<PlusCircle className=" h-6 w-6 cursor-pointer" onClick={createSubject} />
					</li>
					{subjects &&
						subjects.map((item: any) => (
							<li
								key={item.id}
								onClick={() => handleActiveBtn(item.id)}
								className={cn(
									'p-2 rounded-md  flex items-center justify-between cursor-pointer',
									activeBtn === item.id && 'bg-[#f5c86d] text-black'
								)}
							>
								<p>{item.title}</p>
								<X
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteSubject(item.id);
									}}
									className="w-4 h-4"
								/>
							</li>
						))}
				</ul>
			</div>

			<div className="absolute bottom-10 w-[80%] mx-[10%]">
				<Progress value={progress} className="h-4 w-full" />
				<p className="text-sm text-center">80%</p>
			</div>
		</section>
	);
};
