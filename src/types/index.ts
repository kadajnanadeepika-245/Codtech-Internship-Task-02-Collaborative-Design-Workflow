export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "away" | "offline";
  role: "owner" | "editor" | "viewer";
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  position: { x: number; y: number };
  resolved: boolean;
  replies: Comment[];
}

export interface Version {
  id: string;
  name: string;
  description: string;
  author: User;
  timestamp: Date;
  thumbnail: string;
  changes: string[];
}

export interface DesignElement {
  id: string;
  type: "rectangle" | "circle" | "text" | "image";
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: {
    fill?: string;
    stroke?: string;
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    borderRadius?: number;
    opacity?: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  lastModified: Date;
  owner: User;
  collaborators: User[];
  comments: Comment[];
  versions: Version[];
  elements: DesignElement[];
  status: "active" | "archived" | "shared";
}

export interface Activity {
  id: string;
  type: "comment" | "edit" | "version" | "share";
  description: string;
  user: User;
  timestamp: Date;
  projectId: string;
}
