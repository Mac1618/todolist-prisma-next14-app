// Shadcn UI components
import { Button } from '@/components/ui/button';

// Lucide Icons

// main components
import { Sidebar } from './_components/sidebar';
import { Data } from './_components/data';
import { Home } from './_components/home';

export default function Main() {
	return (
		<div className="h-screen flex justify-between ">
			<Sidebar />
			<Home />
			<Data />
		</div>
	);
}
