export default function ExperienceCard({ item }) {
  return (
    <div className="card-dark">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white text-sm font-medium">{item.role}</h4>
          <p className="text-white/40 text-xs">{item.company} · {item.location}</p>
        </div>
        <span className="text-white/20 text-xs flex-shrink-0">{item.period}</span>
      </div>
      <ul className="space-y-2">
        {item.points.map((point, i) => (
          <li key={i} className="text-white/30 text-xs font-light leading-relaxed pl-3 relative
                                before:absolute before:left-0 before:top-2 before:w-1 before:h-1
                                before:bg-white/15 before:rounded-full">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
