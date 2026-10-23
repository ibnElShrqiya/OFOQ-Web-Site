
import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Github,
  LoaderCircle,
  FolderOpen,
  AlertCircle,
} from 'lucide-react';

import { Language, PageId, ProjectItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { projectsData } from '../data/projectsData.ts';

interface ProjectsPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
}

interface PublishedProject {
  id: string;
  content_type: 'project';
  title: string;
  slug: string;
  summary: string;
  body?: string | null;
  cover_image_url?: string | null;
  source_url?: string | null;
  github_url?: string | null;
  download_url?: string | null;
  license?: string | null;
  language?: string | null;
  requirements?: string | null;
  tags?: string[];
  is_published?: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onNavigate,
  onSelectProject,
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [filter, setFilter] = useState<string>('all');
  const [publishedProjects, setPublishedProjects] = useState<PublishedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setLoadError(false);

      try {
        const response = await fetch('/api/content?type=project', {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Projects API returned ${response.status}`);
        }

        const data: { items?: PublishedProject[] } = await response.json();

        const items = Array.isArray(data.items) ? data.items : [];

        const validProjects = items.filter(
          (item) =>
            item &&
            item.content_type === 'project' &&
            item.is_published !== false &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.slug === 'string'
        );

        if (!controller.signal.aborted) {
          setPublishedProjects(validProjects);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Failed to load published projects:', error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProjects();

    return () => controller.abort();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((project) => {
        if (filter === 'all') return true;
        if (filter === 'fintech') {
          return (
            project.id.includes('bank') ||
            project.id.includes('fintech')
          );
        }
        if (filter === 'healthcare') {
          return project.id.includes('health');
        }
        if (filter === 'utilities') {
          return (
            project.id.includes('grid') ||
            project.id.includes('city')
          );
        }
        return true;
      }),
    [filter]
  );

  // Avoid displaying a database project twice if a matching static
  // project already exists in projectsData.ts.
  const uniquePublishedProjects = useMemo(() => {
    const staticIds = new Set(
      projectsData.map((project) => project.id.toLowerCase())
    );

    const staticTitles = new Set(
      projectsData.map((project) =>
        project.title.en.trim().toLowerCase()
      )
    );

    return publishedProjects.filter((project) => {
      const slug = project.slug.trim().toLowerCase();
      const title = project.title.trim().toLowerCase();

      return !staticIds.has(slug) && !staticTitles.has(title);
    });
  }, [publishedProjects]);

  const showDatabaseProjects = filter === 'all';

  return (
    <div
      className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Page header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
          {t.projects.kicker}
        </span>

        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          {t.projects.title}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {t.projects.subtitle}
        </p>
      </div>

      {/* Existing static project filters */}
      {projectsData.length > 0 && (
        <div className="flex w-fit flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 p-1.5">
          {[
            { id: 'all', label: t.projects.filterAll },
            { id: 'fintech', label: t.projects.filterFintech },
            { id: 'healthcare', label: t.projects.filterHealthcare },
            { id: 'utilities', label: t.projects.filterUtilities },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                filter === item.id
                  ? 'border-cyan-500/40 bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Existing projects from projectsData.ts */}
      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-800 bg-[#091122] p-8 transition-all duration-300 hover:border-cyan-500/40"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400">
                    {project.clientSector[lang]}
                  </span>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span>{project.region[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white">
                  {project.title[lang]}
                </h2>

                <p className="text-sm leading-relaxed text-slate-300">
                  {project.summary[lang]}
                </p>

                <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{t.projects.quantifiableResults}</span>
                  </h3>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.outcomes[lang]
                      .slice(0, 2)
                      .map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>{t.projects.viewCase}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>

                <span className="font-mono text-[11px] text-slate-500">
                  Project overview
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Loading state for database projects */}
      {showDatabaseProjects && loading && (
        <div
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-[#091122] p-8 text-slate-400"
          role="status"
        >
          <LoaderCircle className="h-5 w-5 animate-spin text-cyan-400" />
          <span>
            {isAr
              ? 'جارٍ تحميل المشاريع المنشورة...'
              : 'Loading published projects...'}
          </span>
        </div>
      )}

      {/* Database API error; existing projects remain visible */}
      {showDatabaseProjects && !loading && loadError && (
        <div
          className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
          role="status"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <h2 className="font-semibold text-amber-200">
                {isAr
                  ? 'تعذر تحميل المشاريع من قاعدة البيانات'
                  : 'Could not load database projects'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isAr
                  ? 'المشاريع الحالية ما زالت متاحة. تحقق من اتصال الخادم بقاعدة البيانات ثم حدّث الصفحة.'
                  : 'Existing projects remain available. Check the database connection and refresh the page.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Published projects from Supabase */}
      {showDatabaseProjects && uniquePublishedProjects.length > 0 && (
        <section aria-labelledby="published-projects-heading">
          <div className="mb-6 flex items-center gap-3">
            <FolderOpen className="h-5 w-5 text-cyan-400" />
            <h2
              id="published-projects-heading"
              className="text-2xl font-bold text-white"
            >
              {isAr ? 'مشاريعنا المنشورة' : 'Published Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {uniquePublishedProjects.map((project) => {
              const projectLink = project.source_url || null;
              const githubLink = project.github_url || null;
              const externalLink = projectLink || githubLink;

              return (
                <article
                  key={project.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-[#091122] transition-all duration-300 hover:border-cyan-500/40"
                >
                  {project.cover_image_url && (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      loading="lazy"
                      className="h-52 w-full object-cover"
                    />
                  )}

                  <div className="flex flex-1 flex-col space-y-5 p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                        <FolderOpen className="h-5 w-5" />
                      </div>

                      {project.license && (
                        <span className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-400">
                          {project.license}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {project.title}
                      </h3>

                      {project.summary && (
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                          {project.summary}
                        </p>
                      )}
                    </div>

                    {(project.language ||
                      (project.tags && project.tags.length > 0)) && (
                      <div className="flex flex-wrap gap-2">
                        {project.language && (
                          <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-cyan-200">
                            {project.language}
                          </span>
                        )}

                        {(project.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-800/70 px-2.5 py-1 text-xs text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.requirements && (
                      <p className="text-xs leading-6 text-slate-500">
                        <strong>
                          {isAr ? 'المتطلبات: ' : 'Requirements: '}
                        </strong>
                        {project.requirements}
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap gap-3 border-t border-slate-800 pt-5">
                      {externalLink && (
                        <a
                          href={externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
                        >
                          {externalLink === githubLink ? (
                            <Github className="h-4 w-4" />
                          ) : (
                            <ExternalLink className="h-4 w-4" />
                          )}
                          {isAr ? 'عرض المشروع' : 'View Project'}
                        </a>
                      )}

                      {project.download_url && (
                        <a
                          href={project.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {isAr ? 'تنزيل' : 'Download'}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading &&
        !loadError &&
        filteredProjects.length === 0 &&
        (!showDatabaseProjects || uniquePublishedProjects.length === 0) && (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-[#091122] p-8 text-center sm:p-10">
            <h2 className="text-xl font-bold text-white">
              {isAr ? 'أعمالنا قيد الإضافة' : 'Portfolio coming soon'}
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-400">
              {isAr
                ? 'نعرض هنا المشاريع التي يمكننا مشاركتها بإذن أصحابها. تواصل معنا لمناقشة احتياجات مشروعك.'
                : 'We will publish client work here when it is approved for public display. Contact us to discuss your project requirements.'}
            </p>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            >
              {isAr ? 'تواصل معنا' : 'Contact OFOQ'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        )}
    </div>
  );
};
