export const metadata = {
  title: 'Terms of Service | NFS Academy',
  description: 'Terms of service and educational licensing guidelines.',
};

export default function TermsPage() {
  return (
    <div className="w-full flex flex-col items-center py-24 px-8 md:px-16">
      <div className="max-w-3xl w-full flex flex-col gap-12">
        
        <div className="flex flex-col gap-4 pb-8 border-b border-[#1A1A1A]">
          <h1 className="text-4xl font-bold uppercase tracking-tighter">Terms of Service</h1>
          <div className="text-[#888888] font-mono text-[10px] uppercase tracking-widest">Last Updated: V.2026.09</div>
        </div>

        <div className="prose prose-invert prose-p:text-[#AAAAAA] prose-p:text-sm prose-p:leading-relaxed prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight max-w-none">
          <h2>1. Access and Licensing</h2>
          <p>
            By initializing an account with NFS Academy, you are granted a non-exclusive, non-transferable license to access our interactive simulation environments and curriculum for personal educational purposes. Commercial redistribution of our computational models is strictly prohibited without explicit authorization.
          </p>
          
          <h2>2. System Integrity</h2>
          <p>
            Users must not attempt to reverse-engineer, decompile, or aggressively scrape the physics engine or simulation registries. Automated interaction with the simulation environment via scripts or bots is forbidden unless explicitly permitted within a designated programming curriculum.
          </p>

          <h2>3. Service Availability</h2>
          <p>
            While we architect our systems for high availability, NFS Academy is provided &quot;as is&quot; and &quot;as available.&quot; We reserve the right to modify, suspend, or discontinue any aspect of the service, including specific computational models or curriculum modules, at any time.
          </p>

          <h2>4. Educational Accuracy</h2>
          <p>
            Our simulations model physical phenomena based on established mathematical principles. However, computational models inherently involve approximations (e.g., floating-point limitations, idealized boundary conditions). NFS Academy is not liable for outcomes derived from applying these educational models to real-world engineering or safety-critical systems.
          </p>
        </div>
        
      </div>
    </div>
  );
}
