import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

function CertImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="img-placeholder aspect-[4/3]">
        CERT IMAGE
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] overflow-hidden border border-white/5 bg-dark-700">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function CertCard({ cert }) {
  return (
    <div className="card-dark flex flex-col">
      {/* Image with fallback */}
      <div className="mb-4">
        <CertImage src={cert.image} alt={cert.title} />
      </div>

      <p className="text-white/30 text-xs tracking-wide uppercase mb-1">{cert.issuer}</p>
      <h4 className="text-white text-sm font-medium mb-1">{cert.title}</h4>
      <p className="text-white/30 text-xs font-light mb-3 flex-1">{cert.desc}</p>

      {cert.url ? (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sm self-start mt-auto"
        >
          <span><ExternalLink size={12} /></span>
          <span>View Certificate</span>
        </a>
      ) : cert.credentialId ? (
        <p className="text-white/20 text-xs mt-auto">
          Credential ID: {cert.credentialId}
        </p>
      ) : null}
    </div>
  );
}
