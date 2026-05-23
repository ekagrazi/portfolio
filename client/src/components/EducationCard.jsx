export default function EducationCard({ item }) {
  return (
    <div className="card-dark">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-white text-sm font-medium">{item.school}</h4>
          <p className="text-white/30 text-xs">{item.location}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white/20 text-xs">{item.period}</span>
          {item.current && (
            <span className="text-xs border border-white/15 text-white/40 px-2 py-0.5 tracking-wide">
              Current
            </span>
          )}
        </div>
      </div>
      <p className="text-white/50 text-sm mb-1">{item.degree}</p>
      <p className="text-white/30 text-xs font-light">{item.score}</p>
    </div>
  );
}
