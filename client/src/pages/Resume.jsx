import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react';
import PageTransition   from '../components/PageTransition';
import AnimatedSection  from '../components/AnimatedSection';
import ClipReveal       from '../components/ClipReveal';
import ShootingStars    from '../components/ShootingStars';
import api              from '../utils/api';

const FALLBACK_PDF_PATH = '/resume.pdf'; 
const FALLBACK_EMBED_URL = 'https://docs.google.com/document/d/1HOB1VbGSJGVlLzKPWxktkgDpJUAQtZ-G/preview';

function extractDriveId(url) {
  if (!url) return null;
  const match = url.match(/(?:file\/d\/|open\?id=)([-\w]{25,})/);
  return match ? match[1] : null;
}

export default function Resume() {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'gdocs'
  const [pdfError, setPdfError] = useState(false);
  
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [driveUrl, setDriveUrl] = useState('');
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.resumeDriveLink) {
          setDriveUrl(res.data.resumeDriveLink);
        }
      } catch (err) {
        console.error('Failed to load resume settings:', err);
      } finally {
        setSettingsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const driveId = extractDriveId(driveUrl);
  
  const downloadUrl = driveId 
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : FALLBACK_PDF_PATH;
    
  const previewUrl = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : FALLBACK_EMBED_URL;

  const isUsingDrive = !!driveId;

  return (
    <PageTransition>
      <ShootingStars />
      <main className="pt-24 min-h-screen">
        <div className="section">
        <div className="section">
          <AnimatedSection className="mb-10">
            <p className="section-label">Credentials</p>
            <ClipReveal>
              <h1 className="section-heading">Resume</h1>
            </ClipReveal>
            <p className="section-sub">
              Getting serious now...
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={downloadUrl}
                download="Ekagra_Gupta_Resume.pdf"
                className="btn"
                target={isUsingDrive ? "_blank" : "_self"}
                rel={isUsingDrive ? "noopener noreferrer" : ""}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={14} /> Download PDF
                </span>
              </a>

              <a
                href={driveUrl || FALLBACK_EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink size={12} /> Open in {isUsingDrive ? 'Google Drive' : 'Google Docs'}
                </span>
              </a>

              {!isUsingDrive && (
                <button
                  onClick={() => setViewMode(v => v === 'pdf' ? 'gdocs' : 'pdf')}
                  className="btn-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText size={12} />
                    {viewMode === 'pdf' ? 'Switch to Google Docs viewer' : 'Switch to PDF viewer'}
                  </span>
                </button>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="border border-white/8 overflow-hidden relative flex items-center justify-center bg-white/[0.02]"
                 style={{ height: '85vh' }}>
                 
              {settingsLoading ? (
                <Loader2 size={32} className="animate-spin text-white/20" />
              ) : isUsingDrive ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0 bg-white"
                  title="Ekagra Gupta Resume — Google Drive"
                  loading="lazy"
                  allow="autoplay"
                />
              ) : viewMode === 'pdf' && !pdfError ? (
                <object
                  data={FALLBACK_PDF_PATH}
                  type="application/pdf"
                  className="w-full h-full"
                  onError={() => setPdfError(true)}
                >
                  <iframe
                    src={`${FALLBACK_PDF_PATH}#toolbar=0`}
                    className="w-full h-full border-0"
                    title="Ekagra Gupta Resume"
                    onError={() => setPdfError(true)}
                  />
                </object>
              ) : (
                <iframe
                  src={FALLBACK_EMBED_URL}
                  className="w-full h-full border-0 bg-white"
                  title="Ekagra Gupta Resume — Google Docs"
                  loading="lazy"
                  allow="autoplay"
                />
              )}

              <div
                className="absolute bottom-4 right-4 text-white/10 text-xs
                           tracking-widest uppercase pointer-events-none select-none"
              >
                ekagrazi.com
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-4 border-t border-white/5 pt-6">
              <p className="text-white/30 text-xs leading-relaxed max-w-md">
                Last updated May 2025. For the most current version, download the PDF above
                or connect on{' '}
                <a
                  href="https://linkedin.com/in/ekagrazi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors underline underline-offset-2"
                >
                  LinkedIn
                </a>.
              </p>
              <a
                href={downloadUrl}
                download="Ekagra_Gupta_Resume.pdf"
                className="btn flex-shrink-0"
                target={isUsingDrive ? "_blank" : "_self"}
                rel={isUsingDrive ? "noopener noreferrer" : ""}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={14} /> Download Resume
                </span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </PageTransition>
  );
}
