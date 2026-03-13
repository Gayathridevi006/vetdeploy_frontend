import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    console.log("Contact form received:", body);

    // Here you could store in DB, send email, etc

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
    });

  } catch (error) {

    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );

  }
}