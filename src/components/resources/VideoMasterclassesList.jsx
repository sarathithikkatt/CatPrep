import React from 'react';
import { Video } from 'lucide-react';

/**
 * High-yield free video channel recommendations by CAT 99+ percentilers.
 */
export const VideoMasterclassesList = () => {
  const mentors = [
    {
      name: 'Elites Grid (Hunny Sharma)',
      specialty: 'Best for DILR Puzzles',
      specialtyClass: 'text-emerald-600',
      description:
        'Famous for their "100 DILR Sets" marathon covering Games & Tournaments, Matrix matchings, and Venn Maxima-Minima.'
    },
    {
      name: 'Rodha (Ravi Prakash)',
      specialty: 'Best for QA Foundations',
      specialtyClass: 'text-blue-600',
      description:
        'In-depth mathematical concepts for Arithmetic, Algebra, and Geometry from scratch to advanced level.'
    },
    {
      name: 'Bodhee Prep & Gejo Speaks',
      specialty: 'Best for VARC RC & Tone',
      specialtyClass: 'text-purple-600',
      description:
        'Teaches how to deconstruct Aeon essays, identify author assumptions, and eliminate trap choices in Reading Comprehension.'
    },
    {
      name: 'Aeon Essays (aeon.co)',
      specialty: 'Must-Read for RC Mastery',
      specialtyClass: 'text-amber-600',
      description:
        'Read 1 essay every single day on philosophy, anthropology, psychology, and science to build mental stamina.'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Video className="w-5 h-5 text-red-600" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recommended Free Video Playlists
        </h3>
      </div>
      <p className="text-xs text-slate-400">
        Top mentors praised by CAT 99+ percentilers for deep conceptual rigor.
      </p>

      <div className="space-y-3">
        {mentors.map((mentor, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                {mentor.name}
              </span>
              <span className={`text-[10px] font-bold ${mentor.specialtyClass}`}>
                {mentor.specialty}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{mentor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
