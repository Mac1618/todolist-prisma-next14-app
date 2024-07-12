'use client';
import { useEffect, useState } from 'react';

// Shadcn UI component
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Lucide Icons
import { PlusCircle, X } from 'lucide-react';
import { toast } from 'sonner';

// Zustand hooks
import useSubjectIdStore from '@/store/subjectIdStore';
import axios from 'axios';

export const Home = () => {
	// Destructuring subject hooks
	const { id, updateSubjectId, resetSubjectId } = useSubjectIdStore((state) => ({
		id: state.id,
		updateSubjectId: state.updateSubjectId,
		resetSubjectId: state.resetSubjectId,
	}));

	// Creating a new subject
	const [list, setList] = useState('');
	const handleCreateSubject = async () => {
		try {
			// Check selected subjectId
			if (id === '0') {
				return toast.error('Select your subject folder first to proceed!');
			}

			// Check list value
			if (list === '') {
				return toast.error('List title is required to proceed!');
			}

			// data field
			const data = {
				id: id,
				title: list,
			};

			// POST query
			const response = await axios.post('/api/list', data);

			// success message
			console.log(response);
			handleGetList();

			return toast.success('New list is successfully created');

			// error message
		} catch (error) {
			console.log(error);
			return toast.error('Something went wrong. Please try again!');

			// happens every request
		} finally {
			setList('');
		}
	};

	// GET all Lists
	const [allLists, setAllLists] = useState([]);
	const handleGetList = async () => {
		try {
			// Check selected subjectId
			if (id === '0') {
				return toast.error('Select your subject folder first to proceed!');
			}

			// GET all List by subjectId
			const response = await axios.get(`/api/list/${id}`);
			setAllLists(response.data.lists);

			// success message
			console.log('LIST DATA: ', response.data.lists);
			return toast.success('New lists are being shown');

			// error message
		} catch (error) {
			console.log(error);
			return toast.error('Something went wrong. Please try again!');
		}
	};

	// DELETE single List
	const handleDelete = async (listId: string) => {
		try {
			// Prompt the user for confirmation
			const confirmDelete = window.confirm('Are you sure you want to delete this list?');

			// If user confirms deletion
			if (confirmDelete) {
				// Check listId value
				if (listId === '') {
					return toast.error('Select a list to delete. Please try again!');
				}

				// Delete request
				const reponse = await axios.delete(`/api/list/${listId}`);

				// success message
				console.log('Delete list: ', reponse);
				handleGetList();
				return toast.success('Deleted successfully');
			}
			// error message
		} catch (error) {
			return toast.error('Failed to delete the list. Please try again!');
		}
	};

	useEffect(() => {
		if (id !== '0') {
			handleGetList();
		}
	}, [id]);

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
				{/* <Popover>
					<PopoverTrigger className="w-full">
						<div className="flex items-center w-full p-3 rounded-md bg-[#252525]">
							<PlusCircle className="w-6 h-6 text-[#b9b6b6] mr-2" />
							<h1 className="text-md text-[#626060] ">Add to do</h1>
						</div>
					</PopoverTrigger>
					<PopoverContent side="bottom" className="w-full bg-[#626060]">
						<div className="space-y-4">
							<label className="mx-auto w-full text-white">Create new list for subjectName!</label>

							<div className="relative">
								<Input type="email" placeholder="data..." className="h-8 w-[300px] " />
								<PlusCircle className="w-6 h-6 absolute right-1 top-1 cursor-pointer" />
							</div>
						</div>
					</PopoverContent>
				</Popover> */}

				<Dialog>
					<DialogTrigger asChild>
						<div className="flex items-center w-full p-3 rounded-md bg-[#252525] cursor-pointer">
							<PlusCircle className="w-6 h-6 text-[#b9b6b6] mr-2" />
							<h1 className="text-md text-[#626060] ">Add to do</h1>
						</div>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] text-white bg-[#252525]">
						<DialogHeader className="">
							<DialogTitle className="mb-2">
								Create new list <span className="text-[#f5c86d]">forsubjectName</span>
							</DialogTitle>
						</DialogHeader>
						<div className="w-full flex justify-between items-center">
							<Input
								type="email"
								placeholder="data..."
								onChange={(e) => setList(e.target.value)}
								value={list}
								className="h-8 w-[85%] text-black"
							/>
							<DialogTrigger asChild>
								<PlusCircle
									className="w-7 h-7 cursor-pointer hover:text-[#f5c86d]"
									onClick={handleCreateSubject}
								/>
							</DialogTrigger>
						</div>
					</DialogContent>
				</Dialog>

				{/* map all list */}
				{allLists &&
					allLists.map((li: any) => (
						<h1
							key={li.id}
							className="flex justify-between items-center text-md text-[#b9b6b6] w-full p-3 rounded-md bg-[#252525]"
						>
							<p>{li.title}</p>
							<X onClick={() => handleDelete(li.id)} className="h-4 w-4 hover:text-white" />
						</h1>
					))}
			</div>
		</section>
	);
};
