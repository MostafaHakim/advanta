import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/serviceModel";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  await dbConnect();
  const service = await Service.findOne({ slug: params.slug });
  return NextResponse.json(service);
}
