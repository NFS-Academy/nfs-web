import { LabScene } from "@/components/LabScene";
import { ExperimentUI } from "@/components/ExperimentUI";

export default function Home() {
  return (
    <div className="w-full h-[100dvh] bg-slate-950 text-slate-100 flex flex-col p-4 overflow-hidden">
      <ExperimentUI>
        <LabScene />
      </ExperimentUI>
    </div>
  );
}
