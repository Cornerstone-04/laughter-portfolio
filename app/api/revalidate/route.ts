import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  _type?: string;
  secret?: string;
  paths?: string[];
};

const pathsByType: Record<string, string[]> = {
  aboutPage: ["/"],
  homePage: ["/"],
  siteSettings: ["/"],
  testimonial: ["/"],
  work: ["/", "/works"],
};

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const providedSecret =
    request.headers.get("x-revalidate-secret") ||
    request.headers.get("x-sanity-secret") ||
    request.nextUrl.searchParams.get("secret") ||
    body.secret;

  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const paths = Array.from(
    new Set(
      body.paths?.length
        ? body.paths
        : (pathsByType[body._type ?? ""] ?? ["/", "/works"]),
    ),
  );

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: paths });
}
