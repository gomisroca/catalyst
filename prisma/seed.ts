import { PrismaClient, InteractionType } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      image: "https://example.com/alice.png",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      image: "https://example.com/bob.png",
    },
  });

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: "Alice's Project",
      description: "A project by Alice",
      authorId: alice.id,
    },
  });

  await prisma.projectPermissions.create({
    data: {
      projectId: project1.id,
      private: false,
      allowBranch: true,
      allowCollaborate: true,
      allowShare: true,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Bob's Project",
      description: "A project by Bob",
      authorId: bob.id,
    },
  });


  await prisma.projectPermissions.create({
    data: {
      projectId: project2.id,
      private: false,
      allowBranch: true,
      allowCollaborate: true,
      allowShare: true,
    },
  });

  // Create branches
  const branch1 = await prisma.branch.create({
    data: {
      name: "Main Branch",
      description: "Main development branch",
      authorId: alice.id,
      projectId: project1.id,
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: "Feature Branch",
      description: "Bob's feature work",
      authorId: bob.id,
      projectId: project2.id,
    },
  });

  await prisma.branchPermissions.create({
    data: {
      branchId: branch1.id,
      private: false,
      allowBranch: true,
      allowCollaborate: true,
      allowShare: true,
    },
  });

  await prisma.branchPermissions.create({
    data: {
      branchId: branch2.id,
      private: false,
      allowBranch: true,
      allowCollaborate: true,
      allowShare: true,
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: "First Post",
      content: "Welcome to my project!",
      branchId: branch1.id,
      authorId: alice.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Bob's Update",
      content: "Initial commit on feature branch",
      branchId: branch2.id,
      authorId: bob.id,
    },
  });

  // Interactions
  await prisma.postInteraction.create({
    data: {
      type: InteractionType.LIKE,
      postId: post1.id,
      userId: bob.id,
    },
  });

  await prisma.branchInteraction.create({
    data: {
      type: InteractionType.BOOKMARK,
      branchId: branch2.id,
      userId: alice.id,
    },
  });

  await prisma.projectInteraction.create({
    data: {
      type: InteractionType.SHARE,
      projectId: project1.id,
      userId: bob.id,
    },
  });

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
