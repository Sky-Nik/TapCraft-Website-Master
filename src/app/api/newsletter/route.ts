import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_NEWSLETTER_KEY;
    const listId = process.env.BREVO_NEWSLETTER_LIST_ID;

    if (!apiKey || !listId) {
      console.error("Missing BREVO_API_NEWSLETTER_KEY or BREVO_NEWSLETTER_LIST_ID");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    // Step 1: Try to create the contact
    const createResponse = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [Number(listId)],
        emailBlacklisted: false,
        updateEnabled: true,
      }),
    });

    // 201 = created, 204 = updated existing contact
    if (createResponse.status === 201 || createResponse.status === 204) {
      return NextResponse.json({
        success: true,
        message: "Thanks! You're subscribed to our newsletter.",
      });
    }

    const errorData = await createResponse.json().catch(() => null);

    // Contact already exists with updateEnabled failing — update directly
    if (
      errorData?.code === "duplicate_parameter" ||
      createResponse.status === 400
    ) {
      const updateResponse = await fetch(
        `${BREVO_CONTACTS_URL}/${encodeURIComponent(normalizedEmail)}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            listIds: [Number(listId)],
            emailBlacklisted: false,
          }),
        }
      );

      if (updateResponse.status === 204) {
        return NextResponse.json({
          success: true,
          message: "You're subscribed! Stay tuned for updates.",
        });
      }

      const updateError = await updateResponse.json().catch(() => null);
      console.error("Brevo update error:", updateResponse.status, updateError);
    } else {
      console.error("Brevo create error:", createResponse.status, errorData);
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
