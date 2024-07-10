// Shadcn UI components
import { Button } from '@/components/ui/button';

// Lucide Icons

// main components
import { Data } from './_components/data';
import { Home } from './_components/home';
import { Sidebar } from './_components/sidebar';

export default function Main() {
	return (
		<div className="h-screen flex justify-between ">
			<Sidebar />
			<Home />
			<Data />
		</div>
	);
}
