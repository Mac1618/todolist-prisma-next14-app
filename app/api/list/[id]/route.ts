import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET all List
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
	// Grabbing the params id
	const subjectId = params.id;

	// Query all list
	const lists = await prisma.list.findMany({
		where: {
			subjectListId: parseInt(subjectId),
		},
	});

	return NextResponse.json({ lists: lists, success: true });
};
