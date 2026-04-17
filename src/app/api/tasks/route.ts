import { NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import Task from '@/models/Task';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    await dbConnect();
    const tasks = await Task.find({ email }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, text, completed, date, id } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    await dbConnect();
    if (id) {
      // Update existing task
      const updated = await Task.findByIdAndUpdate(id, { text, completed, date }, { new: true });
      return NextResponse.json(updated);
    } else {
      // Create new task
      const newTask = await Task.create({ email, text, completed, date });
      return NextResponse.json(newTask);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await dbConnect();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
