import Navigation from "@/components/layout/Navigation";

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Team Management</h1>
        <p className="text-muted-foreground">
          Manage your team members and permissions.
        </p>
      </div>
    </div>
  );
};

export default Team;
