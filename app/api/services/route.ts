import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/serviceModel";

export async function GET() {
  await dbConnect();
  const services = await Service.find().sort({ order: 1 });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const service = await Service.create(body);
  return NextResponse.json(service, { status: 201 });
}
