import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Upsert User
  const user = await prisma.user.upsert({
    where: { username: 'beamitpal' },
    update: {},
    create: {
      firstName: "Amit",
      lastName: "Pal",
      displayName: "Amit Pal",
      username: "beamitpal",
      gender: "male",
      pronouns: "he/him",
      bio: "Senior Web Developer. Building seamless digital experiences.",
      flipSentences: [
        "Senior Web Developer",
        "Android Developer",
        "Crafting Code for Web & Mobile",
        "Open Source Enthusiast",
      ],
      address: "Delhi, India",
      phoneNumber: "KzkxNzc1NTAwOTMyNA==", // Base64 encoded
      email: "bWVAYmVhbWl0cGFsLmNvbQ==", // Base64 encoded
      website: "https://beamitpal.com",
      jobTitle: "Full Stack Web & Android Developer",
      jobs: [
        {
          title: "Senior Full Stack Engineer",
          company: "Shailesh And Amit Pal Pvt. Ltd.",
          website: "https://beamitpal.com",
        },
        {
          title: "Founder & Lead Developer",
          company: "Shailesh And Amit Pal Pvt. Ltd.",
          website: "https://beamitpal.com",
        },
      ],
      about: "Hello! I'm Amit Pal, a passionate Full Stack Developer with expertise in crafting high-performance, user-centric applications for both web and mobile platforms.",
      avatar: "/images/amit-pal-avatar.webp",
      ogImage: "/og-beamitpal.png",
      namePronunciationUrl: "/audio/amit-pal.mp3",
      keywords: [
        "full stack developer",
        "web developer",
        "android developer",
        "react",
        "nextjs",
        "typescript",
        "mobile development",
        "javascript",
      ],
      dateCreated: new Date("2024-01-15"),
    },
  });
  console.log(`Created user with id: ${user.id}`);

  // 2. Upsert Work Experience (Sample Data)
  const experience1 = await prisma.workExperience.upsert({
    where: { id: 'exp-1' },
    update: {},
    create: {
      id: 'exp-1',
      companyName: 'Tech Innovators Inc.',
      isCurrentEmployer: true,
      positions: {
        create: [
          {
            id: 'pos-1',
            title: 'Senior Frontend Engineer',
            employmentPeriod: '2022 - Present',
            employmentType: 'Full-time',
            description: 'Leading the frontend team in building scalable web applications using Next.js and React.',
            skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
            isExpanded: true,
            icon: 'code',
          },
        ],
      },
    },
  });
  console.log(`Created experience: ${experience1.companyName}`);

  // 3. Upsert Projects (Sample Data)
  const project1 = await prisma.project.upsert({
    where: { id: 'proj-1' },
    update: {},
    create: {
      id: 'proj-1',
      title: 'E-commerce Platform',
      periodStart: '2023',
      periodEnd: '2024',
      link: 'https://example.com',
      skills: ['Next.js', 'Stripe', 'Prisma'],
      description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
      logo: '/images/projects/ecommerce.png',
      isExpanded: false,
    },
  });
  console.log(`Created project: ${project1.title}`);

  // 4. Upsert Tech Stack (Sample Data)
  const techStack1 = await prisma.techStack.upsert({
    where: { key: 'nextjs' },
    update: {},
    create: {
      key: 'nextjs',
      title: 'Next.js',
      href: 'https://nextjs.org',
      categories: ['Framework', 'Frontend'],
      theme: true,
    },
  });
  console.log(`Created tech stack: ${techStack1.title}`);

  // 5. Upsert Social Links (Sample Data)
  const socialLink1 = await prisma.socialLink.upsert({
    where: { title: 'GitHub' },
    update: {},
    create: {
      icon: 'github',
      title: 'GitHub',
      href: 'https://github.com/beamitpal',
      description: 'Check out my open source projects',
    },
  });
  console.log(`Created social link: ${socialLink1.title}`);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
