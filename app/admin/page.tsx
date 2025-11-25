import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, GraduationCap, FolderGit2, Code, Award, Trophy } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  // Fetch real counts from database
  const [
    blogsCount,
    experienceCount,
    educationCount,
    projectsCount,
    techStackCount,
    certificationsCount,
    awardsCount,
    recentBlogs,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.workExperience.count(),
    prisma.education.count(),
    prisma.project.count(),
    prisma.techStack.count(),
    prisma.certification.count(),
    prisma.award.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    { title: "Total Blogs", value: blogsCount.toString(), icon: FileText, color: "text-blue-500" },
    { title: "Work Experience", value: experienceCount.toString(), icon: Briefcase, color: "text-green-500" },
    { title: "Education", value: educationCount.toString(), icon: GraduationCap, color: "text-purple-500" },
    { title: "Projects", value: projectsCount.toString(), icon: FolderGit2, color: "text-orange-500" },
    { title: "Tech Stack", value: techStackCount.toString(), icon: Code, color: "text-cyan-500" },
    { title: "Certifications", value: certificationsCount.toString(), icon: Award, color: "text-yellow-500" },
    { title: "Awards", value: awardsCount.toString(), icon: Trophy, color: "text-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your portfolio admin panel</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  Total items in database
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No blog posts yet</p>
            ) : (
              <div className="space-y-2">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{blog.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <a 
                      href={`/admin/blogs/${blog.id}`}
                      className="text-xs text-primary hover:underline ml-2"
                    >
                      Edit
                    </a>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <a href="/admin/blogs/new" className="text-sm text-primary hover:underline">
              → Create New Blog Post
            </a>
            <a href="/admin/projects/new" className="text-sm text-primary hover:underline">
              → Add New Project
            </a>
            <a href="/admin/experience" className="text-sm text-primary hover:underline">
              → Manage Experience
            </a>
            <a href="/admin/education" className="text-sm text-primary hover:underline">
              → Manage Education
            </a>
            <a href="/admin/tech-stack" className="text-sm text-primary hover:underline">
              → Update Tech Stack
            </a>
            <a href="/admin/profile" className="text-sm text-primary hover:underline">
              → Edit Profile
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

