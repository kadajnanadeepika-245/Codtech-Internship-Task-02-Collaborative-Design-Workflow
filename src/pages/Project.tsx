import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import DesignCanvas from "@/components/design/DesignCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Clock,
  Users,
  Share,
  Download,
  Settings,
  ArrowLeft,
  Plus,
  Check,
  X,
} from "lucide-react";
import { mockProjects } from "@/data/mockData";
import { Project as ProjectType, Comment, DesignElement } from "@/types";
import { cn } from "@/lib/utils";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(
    null,
  );
  const [tool, setTool] = useState<
    "select" | "move" | "rectangle" | "circle" | "text" | "image" | "comment"
  >("select");
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  useEffect(() => {
    const foundProject = mockProjects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  const handleCommentAdd = (position: { x: number; y: number }) => {
    if (newComment.trim() && project) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: project.owner, // In a real app, this would be the current user
        timestamp: new Date(),
        position,
        resolved: false,
        replies: [],
      };

      setProject({
        ...project,
        comments: [...project.comments, comment],
      });
      setNewComment("");
      setTool("select");
    }
  };

  const handleCommentResolve = (commentId: string) => {
    if (project) {
      const updatedComments = project.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, resolved: !comment.resolved }
          : comment,
      );
      setProject({ ...project, comments: updatedComments });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-lg text-muted-foreground">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navigation />

      {/* Project Header */}
      <div className="border-b bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Projects</span>
              </Button>
              <div className="w-px h-6 bg-border" />
              <div>
                <h1 className="text-xl font-bold">{project.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Last modified {formatDate(project.lastModified)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Collaborators */}
              <div className="flex -space-x-2">
                {project.collaborators.slice(0, 3).map((collaborator) => (
                  <Avatar
                    key={collaborator.id}
                    className="h-8 w-8 border-2 border-background"
                  >
                    <AvatarImage
                      src={collaborator.avatar}
                      alt={collaborator.name}
                    />
                    <AvatarFallback className="text-xs">
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.collaborators.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      +{project.collaborators.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Design Canvas */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-4 h-full">
                <DesignCanvas
                  elements={project.elements}
                  comments={showComments ? project.comments : []}
                  selectedElement={selectedElement}
                  onElementSelect={setSelectedElement}
                  onCommentAdd={handleCommentAdd}
                  tool={tool}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "select", label: "Select", icon: "↖" },
                    { id: "comment", label: "Comment", icon: "💬" },
                    { id: "rectangle", label: "Rectangle", icon: "▢" },
                    { id: "circle", label: "Circle", icon: "○" },
                    { id: "text", label: "Text", icon: "T" },
                    { id: "image", label: "Image", icon: "🖼" },
                  ].map((toolItem) => (
                    <Button
                      key={toolItem.id}
                      variant={tool === toolItem.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTool(toolItem.id as any)}
                      className="justify-start"
                    >
                      <span className="mr-2">{toolItem.icon}</span>
                      {toolItem.label}
                    </Button>
                  ))}
                </div>

                {tool === "comment" && (
                  <div className="mt-4 p-3 border rounded-lg bg-accent/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      Click on the canvas to add a comment
                    </p>
                    <Textarea
                      placeholder="Type your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                      rows={3}
                    />
                    <div className="flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTool("select")}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={!newComment.trim()}
                        className="gradient-primary"
                      >
                        Ready to Place
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Info Tabs */}
            <Card className="flex-1">
              <Tabs defaultValue="comments" className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="versions">Versions</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="flex-1 pt-0">
                  <TabsContent value="comments" className="h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Comments ({project.comments.length})
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowComments(!showComments)}
                          className={cn(
                            showComments &&
                              "bg-primary text-primary-foreground",
                          )}
                        >
                          {showComments ? "Hide" : "Show"}
                        </Button>
                      </div>

                      <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                          {project.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className={cn(
                                "p-3 border rounded-lg transition-colors cursor-pointer",
                                comment.resolved
                                  ? "bg-muted/50 border-border/50"
                                  : "bg-card border-border",
                                selectedComment?.id === comment.id &&
                                  "ring-2 ring-primary",
                              )}
                              onClick={() => setSelectedComment(comment)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={comment.author.avatar}
                                      alt={comment.author.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {comment.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">
                                    {comment.author.name}
                                  </span>
                                  {comment.resolved && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Resolved
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCommentResolve(comment.id);
                                  }}
                                  className="h-6 w-6 p-0"
                                >
                                  {comment.resolved ? (
                                    <X className="w-3 h-3" />
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {comment.content}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(comment.timestamp)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent value="versions" className="h-full">
                    <div className="space-y-3">
                      <h4 className="font-medium">
                        Version History ({project.versions.length})
                      </h4>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                          {project.versions.map((version, index) => (
                            <div
                              key={version.id}
                              className="p-3 border rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">
                                  {version.name}
                                </span>
                                {index === 0 && (
                                  <Badge className="gradient-primary">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {version.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage
                                      src={version.author.avatar}
                                      alt={version.author.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {version.author.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">
                                    {version.author.name}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(version.timestamp)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent value="team" className="h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Team Members ({project.collaborators.length + 1})
                        </h4>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-1" />
                          Invite
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {/* Owner */}
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={project.owner.avatar}
                                alt={project.owner.name}
                              />
                              <AvatarFallback>
                                {project.owner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {project.owner.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {project.owner.email}
                              </p>
                            </div>
                          </div>
                          <Badge>Owner</Badge>
                        </div>

                        {/* Collaborators */}
                        {project.collaborators.map((collaborator) => (
                          <div
                            key={collaborator.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={collaborator.avatar}
                                    alt={collaborator.name}
                                  />
                                  <AvatarFallback>
                                    {collaborator.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={cn(
                                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                                    collaborator.status === "online" &&
                                      "bg-green-500",
                                    collaborator.status === "away" &&
                                      "bg-yellow-500",
                                    collaborator.status === "offline" &&
                                      "bg-gray-500",
                                  )}
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {collaborator.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {collaborator.email}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">{collaborator.role}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
