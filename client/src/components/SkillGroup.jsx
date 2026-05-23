export default function SkillGroup({ group }) {
  return (
    <div className="card-dark">
      <h3 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4">{group.label}</h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map(s => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </div>
  );
}
