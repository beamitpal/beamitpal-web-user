import prisma from '@/lib/prisma';
import type { Certification } from "../types/certifications";

export const CERTIFICATIONS: Certification[] = (
  await prisma.certification.findMany({
    select: {
      title: true,
      issuer: true,
      issuerIconName: true,
      issuerLogoURL: true,
      issueDate: true,
      credentialID: true,
      credentialURL: true,
    },
    orderBy: {
      issueDate: 'desc',
    },
  })
).map((cert) => {
  const issuerLogoURL = cert.issuerLogoURL ?? undefined; 
  const issuerIconName = cert.issuerIconName?.trim() || undefined;

  const hasLogo = !!issuerLogoURL;

  return {
    title: cert.title,
    issuer: cert.issuer,
    issuerLogoURL: hasLogo ? issuerLogoURL : undefined,
    issuerIconName: hasLogo ? undefined : issuerIconName,
    issueDate: cert.issueDate,
    credentialID: cert.credentialID ?? '',
    credentialURL: cert.credentialURL ?? '',
  };
});