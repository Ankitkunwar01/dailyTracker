import { NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    await dbConnect();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, completedIds, notes, streak } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { completedIds, notes, streak } },
      { new: true, upsert: true }
    );
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
