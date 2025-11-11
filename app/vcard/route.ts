import { NextResponse } from "next/server";
import sharp from "sharp";
import VCard from "vcard-creator";

import { USERS } from "@/features/profile/data/user";
import { decodeEmail, decodePhoneNumber } from "@/utils/string";
import { SITE_URL } from "@/config/site/static";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await USERS();

  const card = new VCard();

  card
    .addName(user.lastName, user.firstName)
    .addPhoneNumber(decodePhoneNumber(user.phoneNumber))
    .addAddress(user.address)
    .addEmail(decodeEmail(user.email))
    .addURL(user.website);

  const photo = await getVCardPhoto(user.avatar);
  if (photo) {

    card.addPhoto(photo.image, photo.mime);
  }

  if (user.jobs.length > 0) {
    const company = user.jobs[0];
    card.addCompany(company.company).addJobtitle(company.title);
  }

  const filename = `${user.username}-vcard.vcf`;
  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${filename}`,
    },
  });
}

async function getVCardPhoto(url?: string | null) {
  try {
    if (!url || url.trim().length === 0) return null;

    const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

    const res = await fetch(absoluteUrl, { cache: "no-store" });
    if (!res.ok) return null;

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length === 0) return null;

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.startsWith("image/")) return null;

    const jpegBuffer = await convertImageToJpeg(buffer);
    const image = jpegBuffer.toString("base64");

    return {
      image,
      mime: "image/jpeg",
    };
  } catch {
    return null;
  }
}

async function convertImageToJpeg(imageBuffer: Buffer): Promise<Buffer> {
  const jpegBuffer = await sharp(imageBuffer)
    .jpeg({
      quality: 90,
      progressive: true,
      mozjpeg: true,
    })
    .toBuffer();

  return jpegBuffer;
}
