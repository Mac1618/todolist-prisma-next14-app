import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// DELETE SINGLE SUBJECT
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	// Grabbing the params id
	const subjectId = params.id;

	// Check the id value
	if (!subjectId) {
		throw new Error('Select subject to be deleted!');
	}

	// Delete request
	const subject = await prisma.subject.delete({
		where: {
			id: parseInt(subjectId),
		},
	});

	// Next response
	return NextResponse.json({
		subject: subject,
		success: true,
	});
};
