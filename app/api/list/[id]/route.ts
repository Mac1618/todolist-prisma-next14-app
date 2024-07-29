import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET all List
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
	// Grabbing the params subjectId
	const subjectId = params.id;

	if (!subjectId) {
		throw new Error('No subject field found. Please select your subject first.');
	}

	// Query all list
	const lists = await prisma.list.findMany({
		where: {
			subjectListId: parseInt(subjectId),
		},
	});

	// Next response
	return NextResponse.json({ lists: lists, success: true });
};

// DELETE single list
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	// Grabbing the listId params
	const listId = params.id;

	if (!listId) {
		throw new Error('No selected list field found. Please try again!');
	}

	// Delete request
	const list = await prisma.list.delete({
		where: {
			id: parseInt(listId),
		},
	});

	// Next response
	return NextResponse.json({
		list: list,
		success: true,
	});
};
