/**
 * Helper returning label and Tailwind classes for topic mastery statuses.
 */
export const getTopicStatusBadge = (status) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Mastered',
        className:
          'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        className:
          'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
      };
    case 'revision':
      return {
        label: 'Revision Due',
        className:
          'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
      };
    default:
      return {
        label: 'Not Started',
        className:
          'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
      };
  }
};
