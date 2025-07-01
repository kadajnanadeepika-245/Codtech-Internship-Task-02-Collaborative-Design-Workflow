import { Project, User, Comment, Version, DesignElement } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@designflow.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    status: "online",
    role: "owner",
  },
  {
    id: "2",
    name: "Sarah Kim",
    email: "sarah@designflow.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    status: "online",
    role: "editor",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    email: "marcus@designflow.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    status: "away",
    role: "editor",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@designflow.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    status: "offline",
    role: "viewer",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "Love the color scheme here! Maybe we could make the primary CTA a bit more prominent?",
    author: mockUsers[1],
    timestamp: new Date("2024-01-15T10:30:00"),
    position: { x: 420, y: 280 },
    resolved: false,
    replies: [
      {
        id: "1-1",
        content:
          "Great suggestion! I'll increase the button size and add more contrast.",
        author: mockUsers[0],
        timestamp: new Date("2024-01-15T10:45:00"),
        position: { x: 420, y: 280 },
        resolved: false,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    content:
      "The spacing between these elements feels a bit tight. Could we add more breathing room?",
    author: mockUsers[2],
    timestamp: new Date("2024-01-15T14:20:00"),
    position: { x: 180, y: 350 },
    resolved: true,
    replies: [],
  },
  {
    id: "3",
    content:
      "Typography hierarchy looks perfect! The heading really draws attention.",
    author: mockUsers[3],
    timestamp: new Date("2024-01-15T16:10:00"),
    position: { x: 300, y: 120 },
    resolved: false,
    replies: [],
  },
];

export const mockVersions: Version[] = [
  {
    id: "1",
    name: "Initial Design",
    description: "First draft of the mobile app landing page",
    author: mockUsers[0],
    timestamp: new Date("2024-01-10T09:00:00"),
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    changes: [
      "Created initial layout",
      "Added hero section",
      "Designed navigation",
    ],
  },
  {
    id: "2",
    name: "Color Improvements",
    description: "Updated color palette based on brand guidelines",
    author: mockUsers[1],
    timestamp: new Date("2024-01-12T11:30:00"),
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    changes: [
      "Updated primary colors",
      "Improved contrast ratios",
      "Added gradient backgrounds",
    ],
  },
  {
    id: "3",
    name: "Mobile Responsive",
    description: "Made the design responsive for mobile devices",
    author: mockUsers[2],
    timestamp: new Date("2024-01-14T15:45:00"),
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    changes: [
      "Added mobile breakpoints",
      "Optimized touch targets",
      "Improved mobile navigation",
    ],
  },
  {
    id: "4",
    name: "Current Version",
    description: "Latest version with user feedback incorporated",
    author: mockUsers[0],
    timestamp: new Date("2024-01-15T17:00:00"),
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    changes: [
      "Fixed spacing issues",
      "Enhanced CTA buttons",
      "Added micro-interactions",
    ],
  },
];

export const mockDesignElements: DesignElement[] = [
  {
    id: "1",
    type: "rectangle",
    position: { x: 50, y: 50 },
    size: { width: 300, height: 60 },
    properties: {
      fill: "#8B5CF6",
      borderRadius: 12,
      text: "Welcome to DesignFlow",
      fontSize: 24,
      fontFamily: "Inter",
    },
  },
  {
    id: "2",
    type: "text",
    position: { x: 50, y: 130 },
    size: { width: 400, height: 80 },
    properties: {
      text: "Collaborate on designs in real-time with your team. Share feedback, track versions, and create amazing experiences together.",
      fontSize: 16,
      fontFamily: "Inter",
      fill: "#64748B",
    },
  },
  {
    id: "3",
    type: "rectangle",
    position: { x: 50, y: 230 },
    size: { width: 150, height: 44 },
    properties: {
      fill: "#10B981",
      borderRadius: 8,
      text: "Get Started",
      fontSize: 16,
      fontFamily: "Inter",
    },
  },
  {
    id: "4",
    type: "circle",
    position: { x: 450, y: 100 },
    size: { width: 120, height: 120 },
    properties: {
      fill: "#F1F5F9",
      stroke: "#E2E8F0",
    },
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mobile App Landing Page",
    description:
      "A modern landing page design for our new mobile application with focus on conversion optimization.",
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-15T17:00:00"),
    owner: mockUsers[0],
    collaborators: [mockUsers[1], mockUsers[2], mockUsers[3]],
    comments: mockComments,
    versions: mockVersions,
    elements: mockDesignElements,
    status: "active",
  },
  {
    id: "2",
    name: "E-commerce Dashboard",
    description:
      "Admin dashboard for e-commerce platform with analytics, inventory management, and user insights.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-14T10:30:00"),
    owner: mockUsers[1],
    collaborators: [mockUsers[0], mockUsers[2]],
    comments: [],
    versions: [],
    elements: [],
    status: "shared",
  },
  {
    id: "3",
    name: "Brand Identity System",
    description:
      "Complete brand identity including logo, color palette, typography, and design guidelines.",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-13T16:20:00"),
    owner: mockUsers[2],
    collaborators: [mockUsers[0], mockUsers[1], mockUsers[3]],
    comments: [],
    versions: [],
    elements: [],
    status: "active",
  },
  {
    id: "4",
    name: "Website Redesign",
    description:
      "Complete redesign of company website with improved user experience and modern aesthetics.",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-10T08:15:00"),
    owner: mockUsers[3],
    collaborators: [mockUsers[0]],
    comments: [],
    versions: [],
    elements: [],
    status: "archived",
  },
  {
    id: "5",
    name: "Social Media Templates",
    description:
      "Collection of social media post templates for consistent brand presence across platforms.",
    thumbnail:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-12T14:45:00"),
    owner: mockUsers[0],
    collaborators: [mockUsers[1], mockUsers[3]],
    comments: [],
    versions: [],
    elements: [],
    status: "active",
  },
  {
    id: "6",
    name: "User Onboarding Flow",
    description:
      "Step-by-step onboarding process design to improve user activation and reduce drop-off rates.",
    thumbnail:
      "https://images.unsplash.com/photo-1553028826-f4804151e2d8?w=400&h=300&fit=crop",
    lastModified: new Date("2024-01-11T19:30:00"),
    owner: mockUsers[1],
    collaborators: [mockUsers[0], mockUsers[2], mockUsers[3]],
    comments: [],
    versions: [],
    elements: [],
    status: "shared",
  },
];
