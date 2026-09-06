export const metadata = {
  title: 'Privacy Policy | NFS Academy',
  description: 'How we handle and protect student telemetry data.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full flex flex-col items-center py-24 px-8 md:px-16">
      <div className="max-w-3xl w-full flex flex-col gap-12">
        
        <div className="flex flex-col gap-4 pb-8 border-b border-[#1A1A1A]">
          <h1 className="text-4xl font-bold uppercase tracking-tighter">Privacy Protocol</h1>
          <div className="text-[#888888] font-mono text-[10px] uppercase tracking-widest">Last Updated: V.2026.09</div>
        </div>

        <div className="prose prose-invert prose-p:text-[#AAAAAA] prose-p:text-sm prose-p:leading-relaxed prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight max-w-none">
          <h2>1. Data Collection Architecture</h2>
          <p>
            NFS Academy collects telemetry data generated from your interactions within our computational physics workspaces. This includes variable manipulations, simulation runtime metrics, and problem-solving pathways. This data is strictly utilized to map your educational progress and formulate personalized challenges.
          </p>
          
          <h2>2. Non-Tracking Mandate</h2>
          <p>
            We deploy a strict zero-surveillance policy outside of the simulation environment. We do not integrate third-party advertising trackers, social media pixels, or cross-site fingerprinting scripts. Your learning data remains isolated within our infrastructure.
          </p>

          <h2>3. Data Sovereignty</h2>
          <p>
            Students retain ownership of their telemetry profiles. You can export your complete simulation history, mastery graphs, and laboratory notebooks in raw JSON or PDF formats at any time from your Account Settings.
          </p>

          <h2>4. Cryptographic Security</h2>
          <p>
            All persistent data is encrypted at rest using industry-standard AES-256 protocols. Authentication tokens and session identifiers are transmitted exclusively over secure TLS 1.3 channels.
          </p>
          
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 mt-12 font-mono text-xs text-[#888888]">
            <span className="text-[#00FFCC]">Contact:</span> privacy@nfs-academy.com
          </div>
        </div>
        
      </div>
    </div>
  );
}
