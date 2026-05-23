export default function AchievementCard({ item }) {
  return (
    <div className="card-dark">
      <p className="text-white/30 text-xs tracking-wide uppercase mb-2">{item.org}</p>
      <h4 className="text-white text-sm font-medium mb-2">{item.title}</h4>
      <p className="text-white/30 text-xs font-light leading-relaxed">{item.desc}</p>
    </div>
  );
}
