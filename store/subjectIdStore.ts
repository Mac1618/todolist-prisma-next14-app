// Zustand Library
import { create } from 'zustand';

// types
interface StudentIdStoreProps {
	id: string;
	updateSubjectId: (updatedForm: Partial<StudentIdStoreProps['id']>) => void;
	resetSubjectId: () => void;
}

const useSubjectIdStore = create<StudentIdStoreProps>((set) => ({
	// Default subjectId value
	id: '0',

	// Update SubjectId
	updateSubjectId: (updateId: string) =>
		set(() => ({
			id: updateId,
		})),

	// Reset SubjectId value
	resetSubjectId: () =>
		set({
			id: '0',
		}),
}));

export default useSubjectIdStore;
