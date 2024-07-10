import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// CREATE NEW SUBJECT
export const POST = async (req: NextRequest) => {
	// Store the request data from the client
	const reqBody = await req.json();
	const { title } = reqBody;

	// Prisma with sqlite
	const subject = await prisma.subject.create({
		data: {
			title: title,
		},
	});

	// console
	console.log(subject);

	// next response
	return NextResponse.json({
		message: 'New subject is created!',
		subject: subject,
		success: true,
	});
};

// GET ALL SUBJECTS
export const GET = async () => {
	// Query all subject in sqlite with prisma
	const subjects = await prisma.subject.findMany({});

	// Next response
	return NextResponse.json({
		subjects: subjects,
		success: true,
	});
};

// DELETE SINGLE SUBJECT
export const DELETE = async (req: NextRequest) => {
	const reqBody = await req.json();
	const { id } = reqBody;

	// Check the id value
	if (!id) {
		throw new Error('Select subject to be deleted!');
	}

	// Delete request
	const subject = await prisma.subject.delete({
		where: {
			id: id,
		},
	});

	// Console
	console.log(subject);

	// Next response
	return NextResponse.json({
		subject: subject,
		success: true,
	});
};
