import { useState } from "react";
import WorkspaceAnalytics from "../../components/workspace/WorkspaceAnalytics";
import RecentProjects from "../../components/workspace/project/RecentProjects";
import RecentTasks from "../../components/workspace/task/RecentTasks";
import RecentMembers from "../../components/workspace/member/RecentMembers";
import useCreateProjectDialog from "../../hooks/useCreateProjectDialog";
import axios from "axios";
import useWorkspaceId from "../../hooks/useWorkspaceId";
import { Permissions } from "../../constant";
import { X, Plus } from "lucide-react";
import Button from "../../components/ui/Button";

const WorkspaceDashboard = () => {
  const { open, onOpen, onClose } = useCreateProjectDialog();
  const workspaceId = useWorkspaceId();
  const [activeTab, setActiveTab] = useState("projects");
  const [projectName, setProjectName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);

  // Mock user permissions (replace with real logic later)
  const userPermissions = [Permissions.CREATE_PROJECT];
  const canCreateProject = userPermissions.includes(Permissions.CREATE_PROJECT);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (isSubmitting || !projectName || !canCreateProject) return;

    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:8000/api/workspace/${workspaceId}/projects`, {
        name: projectName,
      });
      setProjectName("");
      setProjectCreated(true);
      onClose();
    } catch (err) {
      console.log("Error creating project:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Workspace Overview</h2>
          <p className="text-gray-500">Here's an overview for this workspace!</p>
        </div>
        {canCreateProject && (
          <Button
            onClick={onOpen}
            className="bg-black text-white hover:bg-black/90 px-4 py-2 rounded flex items-center"
          >
            <Plus className="mr-2" /> New Project
          </Button>
        )}
      </div>
      <WorkspaceAnalytics />
      <div className="mt-6 border rounded-lg p-2 bg-white shadow-md">
        <div className="flex justify-start space-x-2 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "projects" ? "bg-gray-100" : ""
            } rounded`}
            onClick={() => setActiveTab("projects")}
          >
            Recent Projects
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "tasks" ? "bg-gray-100" : ""
            } rounded`}
            onClick={() => setActiveTab("tasks")}
          >
            Recent Tasks
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "members" ? "bg-gray-100" : ""
            } rounded`}
            onClick={() => setActiveTab("members")}
          >
            Recent Members
          </button>
        </div>
        <div className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTab === "projects" && <RecentProjects onProjectCreated={projectCreated} />}
            {activeTab === "tasks" && <RecentTasks />}
            {activeTab === "members" && <RecentMembers />}
          </div>
        </div>
      </div>

      {open && canCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Create New Project</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full border rounded-md p-2 mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !projectName}
                  className="w-full bg-black text-white hover:bg-black/90 py-2 rounded"
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDashboard;