import Experiment from "@/components/SuperAdminComponents/ExperimentSuperAdmin/Experiment";

export default function SuperAdminExperimentDashboard() {
  return (
    <div className="w-full h-[150vh] border-border border-solid border p-6 rounded-lg">
      <h2 className="text-3xl font-semibold mb-5">Employee List</h2>
      <Experiment />
    </div>
  );
}
