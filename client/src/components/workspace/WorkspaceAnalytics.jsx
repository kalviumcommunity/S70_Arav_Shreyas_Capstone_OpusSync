import { useState, useEffect } from "react";
import axios from "axios";
import useWorkspaceId from "../../hooks/useWorkspaceId";
import AnalyticsCard from "../../components/common/AnalyticsCard";

const WorkspaceAnalytics = () => {
  const workspaceId = useWorkspaceId();
  const [analytics, setAnalytics] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;

    const fetchAnalytics = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workspace/${workspaceId}/analytics`
        );
        setAnalytics(response.data.analytics);
      } catch (err) {
        console.log("Error fetching analytics:", err);
      }
      setIsPending(false);
    };

    fetchAnalytics();
  }, [workspaceId]);

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        isLoading={isPending}
        title="Total Task"
        value={analytics?.totalTasks || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Overdue Task"
        value={analytics?.overdueTasks || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Completed Task"
        value={analytics?.completedTasks || 0}
      />
    </div>
  );
};

export default WorkspaceAnalytics;