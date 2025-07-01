import Navigation from "@/components/layout/Navigation";

const Comments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">All Comments</h1>
        <p className="text-muted-foreground">
          View and manage comments across all projects.
        </p>
      </div>
    </div>
  );
};

export default Comments;
