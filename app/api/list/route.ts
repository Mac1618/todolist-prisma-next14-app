import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// CREATE new List
export const POST = async (req: NextRequest) => {
	const reqBody = await req.json();
	const { id, title, date } = reqBody;

	// title and id value
	if (!title || !id) {
		throw new Error('Title field is request');
	}

	// Create new list
	const list = await prisma.list.create({
		data: {
			title: title,
			date: date,

			// Created List and Associate with SubjectId
			subjectList: {
				connect: {
					id: id,
				},
			},
		},
	});

	// Next response
	return NextResponse.json({
		list: list,
		success: true,
	});
};
