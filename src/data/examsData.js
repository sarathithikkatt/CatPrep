// Multi-exam data architecture: Starting with CAT, architected for XAT, GMAT, etc.

export const EXAMS_CONFIG = [
  {
    id: 'cat',
    name: 'CAT (Common Admission Test)',
    year: '2025/2026',
    tagline: 'Gateway to IIMs and Top Tier-1 B-Schools',
    durationMinutes: 120,
    totalQuestions: 66,
    targetScore99ile: 88,
    sections: [
      {
        id: 'qa',
        name: 'Quantitative Aptitude',
        shortName: 'QA',
        questionsCount: 22,
        durationMinutes: 40,
        color: '#3B82F6', // Blue
        bgColor: 'bg-blue-50 dark:bg-blue-950/40',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-600 dark:text-blue-400',
        description: 'Arithmetic, Algebra, Geometry, Numbers & Modern Math',
        modules: [
          {
            id: 'qa-arithmetic',
            title: 'Arithmetic (High ROI ~40%)',
            estimatedHours: 45,
            topics: [
              {
                id: 'qa-percentages',
                title: 'Percentages, Profit, Loss & Discount',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'Multiplier approach (1.15 for 15% increase), successive percentage changes, markup & margin relation, false weights.',
                subtopics: ['Fraction to % conversions', 'Successive % changes', 'Cost Price vs Selling Price', 'Marked Price & Discount', 'Dishonest Merchant'],
                lectures: [
                  { title: 'Percentages Foundation to Advanced', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=hGOn9659ujo', duration: 'Full Series' },
                  { title: 'Profit, Loss & False Weights Mastery', educator: 'Raman Tiwari', url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs', duration: 'Crash Course' },
                  { title: 'Arithmetic Practice Part 1', educator: 'Anastasis Shankar', url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru', duration: 'Solved Problems' }
                ]
              },
              {
                id: 'qa-sici',
                title: 'Simple & Compound Interest',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 5,
                keyConcepts: 'Difference between CI and SI for 2 and 3 years, CI compounding frequency, Loan equal installments formula.',
                subtopics: ['SI formula & rate comparison', 'CI compounding periods', 'Installments in SI & CI', 'Growth factor equations'],
                lectures: [
                  { title: 'SI & CI Complete Concepts & Installments', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk', duration: '3 Videos' },
                  { title: 'Installments & Compound Formulas', educator: 'Raman Tiwari', url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs', duration: 'Formula Book' }
                ]
              },
              {
                id: 'qa-ratios',
                title: 'Ratio, Proportion & Variation',
                weightage: 'High (2 Qs)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 6,
                keyConcepts: 'Direct and inverse variation proportionality constants, compounding ratios, coins and currency distributions.',
                subtopics: ['Ratios & scaling constants', 'Direct & Inverse variation', 'Joint variation problems', 'Partnership & profit sharing'],
                lectures: [
                  { title: 'Ratio & Proportion Foundation', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=hGOn9659ujo', duration: 'Day 02, 04' },
                  { title: 'Variation & Partnership Applications', educator: 'Raman Tiwari', url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs', duration: 'Concept Class' }
                ]
              },
              {
                id: 'qa-averages',
                title: 'Averages, Mixtures & Alligations',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'Deviation method for quick average, Alligation cross-rule, replacement formula: Final = Initial * (1 - x/V)^n.',
                subtopics: ['Deviation method for averages', 'Weighted averages', 'Rule of Alligation', 'Successive dilution / replacement'],
                lectures: [
                  { title: 'Rule of Alligation & Replacement', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=hGOn9659ujo', duration: 'Full Module' },
                  { title: 'Mixtures & Alligation Practice', educator: 'Anastasis Shankar', url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru', duration: 'Practice Sets' }
                ]
              },
              {
                id: 'qa-timework',
                title: 'Time & Work, Pipes & Cisterns',
                weightage: 'High (2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'LCM method for total work units, negative work by leak pipes, efficiency ratios, alternate day work cycles.',
                subtopics: ['LCM unit work model', 'Men, Women, Boys efficiency', 'Pipes, leaks & filling rates', 'Alternate day cycles & wages'],
                lectures: [
                  { title: 'Time & Work LCM Unit Method', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=hGOn9659ujo', duration: 'Core Lectures' },
                  { title: 'Pipes & Cisterns Alternate Cycles', educator: 'Raman Tiwari', url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs', duration: 'Concept Video' }
                ]
              },
              {
                id: 'qa-tsd',
                title: 'Time, Speed & Distance',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts: 'Relative speed in opposite/same direction, average speed harmonic mean, circular tracks meeting points, escalator steps.',
                subtopics: ['Relative Speed & Trains', 'Boats & Streams', 'Circular Tracks (First meeting & start point)', 'Races & Head starts', 'Escalators'],
                lectures: [
                  { title: 'TSD Masterclass: Races & Circular Tracks', educator: 'Ravi Prakash (Rodha)', url: 'https://www.youtube.com/watch?v=hGOn9659ujo', duration: '12 Lectures' },
                  { title: 'Escalators & Relative Speed Shortcuts', educator: 'Raman Tiwari', url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs', duration: 'Advanced' }
                ]
              }
            ]
          },
          {
            id: 'qa-algebra',
            title: 'Algebra (Key Differentiator ~30%)',
            estimatedHours: 40,
            topics: [
              {
                id: 'qa-linear-equations',
                title: 'Linear Equations & Integral Solutions',
                weightage: 'Medium-High (1-2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts: 'Linear Diophantine equations ax + by = c, number of non-negative integral solutions.',
                subtopics: ['System of linear equations', 'Diophantine equations', 'Non-negative integer solutions']
              },
              {
                id: 'qa-quadratics',
                title: 'Quadratic & Polynomial Equations',
                weightage: 'High (2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 8,
                keyConcepts: 'Sum/product of roots, nature of discriminant (D), Descarte rule of signs, Vieta formulas for cubic/quartic polynomials.',
                subtopics: ['Roots and coefficients relations', 'Location of roots', 'Common roots condition', 'Higher degree polynomials']
              },
              {
                id: 'qa-inequalities',
                title: 'Inequalities & Modulus Functions',
                weightage: 'High (2 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 8,
                keyConcepts: 'Wavy curve method, triangle inequality for modulus |a| + |b| >= |a+b|, geometric interpretation of |x - a| as distance.',
                subtopics: ['Polynomial inequalities (Wavy curve)', 'Modulus equations & inequalities', 'AM-GM inequality for optimization']
              },
              {
                id: 'qa-logs',
                title: 'Logarithms, Surds & Indices',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 5,
                keyConcepts: 'Change of base rule, logarithmic inequalities with base < 1, domain restrictions.',
                subtopics: ['Properties of Logarithms', 'Base change formula', 'Logarithmic equations & bounds', 'Indices simplification']
              },
              {
                id: 'qa-series',
                title: 'Progressions & Series (AP, GP, HP, AGP)',
                weightage: 'Medium-High (1-2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts: 'Arithmetic-Geometric Progression (AGP), telescoping sums, sum of first n squares and cubes.',
                subtopics: ['Arithmetic Progression nth term & sum', 'Geometric Progression & infinite sum', 'Harmonic Progression & AM-GM-HM', 'Telescoping series']
              },
              {
                id: 'qa-functions',
                title: 'Functions, Graphs & Maxima/Minima',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 6,
                keyConcepts: 'Domain, range, odd/even functions, composite functions f(g(x)), graph shifts f(x-a) + b.',
                subtopics: ['Domain & Range finding', 'Composite and Inverse functions', 'Periodic & Symmetric functions', 'Optimization without calculus']
              }
            ]
          },
          {
            id: 'qa-geometry',
            title: 'Geometry & Mensuration (~15-20%)',
            estimatedHours: 25,
            topics: [
              {
                id: 'qa-triangles',
                title: 'Triangles: Similarity, Circles & Centers',
                weightage: 'High (2 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 8,
                keyConcepts: 'Similarity criteria, Centroid, Incenter, Circumcenter, Orthocenter properties, Apollonius theorem, Stewart theorem.',
                subtopics: ['Angle bisector theorem', 'Similar & Congruent triangles', 'Euler line & Triangle centers', 'Area formulas (Heron, Inradius)']
              },
              {
                id: 'qa-circles',
                title: 'Circles, Chords & Tangents',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 6,
                keyConcepts: 'Alternate segment theorem, intersecting chords theorem (PA * PB = PC * PD), tangent-secant theorem (PT^2 = PA * PB).',
                subtopics: ['Chords and equidistant properties', 'Tangent-Secant theorems', 'Common internal/external tangents', 'Cyclic quadrilaterals']
              },
              {
                id: 'qa-coordinate',
                title: 'Coordinate Geometry',
                weightage: 'Low-Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 5,
                keyConcepts: 'Distance formula, section formula, slope of perpendicular lines (m1*m2 = -1), area of polygon, distance from line.',
                subtopics: ['Lines, slopes & intercepts', 'Area of polygon by shoelace', 'Perpendicular distance & reflection', 'Circles in coordinate plane']
              },
              {
                id: 'qa-mensuration',
                title: 'Mensuration 2D & 3D Solids',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts: 'Volume, Curved Surface Area, Total Surface Area of cylinder, cone, frustum, sphere, prism, pyramid.',
                subtopics: ['Polygons and regular hexagons', '3D Solids (Cylinder, Cone, Sphere)', 'Frustum and Prisms', 'Cutting & melting of solids']
              }
            ]
          },
          {
            id: 'qa-numbers',
            title: 'Number Systems (~8%)',
            estimatedHours: 20,
            topics: [
              {
                id: 'qa-divisibility',
                title: 'Divisibility, Units Digit & Remainders',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts: 'Cyclicity of units digits, Euler totient theorem, Wilson theorem, negative remainders.',
                subtopics: ['Divisibility rules & cyclicity', 'Euler Totient Theorem', 'Chinese Remainder Theorem', 'Wilson Theorem & Binomial remainders']
              },
              {
                id: 'qa-factors',
                title: 'Factors, Multiples & Factorials',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 7,
                keyConcepts: 'Total number of factors = (p+1)(q+1)..., sum of factors, product of factors, power of primes in n! (Legendre formula).',
                subtopics: ['Prime factorization properties', 'Sum and product of factors', 'Even, odd and co-prime factors', 'Highest power of prime in n!']
              },
              {
                id: 'qa-hcf-lcm',
                title: 'HCF, LCM & Base Systems',
                weightage: 'Low (0-1 Q)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 7,
                keyConcepts: 'Product of two numbers = HCF * LCM, Base conversion and arithmetic in base n.',
                subtopics: ['HCF & LCM word problems', 'Rings and interval bells', 'Base n conversions', 'Decimal to binary/octal conversions']
              }
            ]
          },
          {
            id: 'qa-modern',
            title: 'Modern Math & Combinatorics (~7%)',
            estimatedHours: 15,
            topics: [
              {
                id: 'qa-pnc',
                title: 'Permutations & Combinations',
                weightage: 'Medium (1 Q)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts: 'Distribution of identical objects into distinct boxes (n+r-1 C r-1), derangements D_n, circular permutations (n-1)!/2.',
                subtopics: ['Fundamental counting principle', 'Arrangements & Selections', 'Identical object distribution', 'Derangements & grid paths']
              },
              {
                id: 'qa-probability',
                title: 'Probability & Set Theory',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 7,
                keyConcepts: 'Conditional probability P(A|B), Bayes Theorem, complementary probability 1 - P(none), Venn diagrams 2 & 3 sets.',
                subtopics: ['Classical probability', 'Independent & Dependent events', 'Bayes Theorem', 'Set theory intersections']
              }
            ]
          }
        ]
      },
      {
        id: 'dilr',
        name: 'Data Interpretation & Logical Reasoning',
        shortName: 'DILR',
        questionsCount: 20,
        durationMinutes: 40,
        color: '#10B981', // Emerald
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        description: 'Puzzles, Seating Arrangements, Tournaments, Tables, Graphs & Venn Diagrams',
        modules: [
          {
            id: 'dilr-lr',
            title: 'Logical Reasoning Puzzles',
            estimatedHours: 40,
            topics: [
              {
                id: 'dilr-arrangements',
                title: 'Linear & Circular Seating Arrangements',
                weightage: 'Very High (1 full set ~5 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 10,
                keyConcepts: 'Bidirectional seating, facing center vs facing outward, relative positioning anchors, circular symmetry.',
                subtopics: ['Linear arrangement with attributes', 'Circular facing center / outside', 'Dual row parallel seating', 'Complex multi-variable arrangements'],
                lectures: [
                  { title: 'Conundrum Carousel: 400+ DILR Sets', educator: 'Anastasis Shankar', url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru', duration: 'Daily Sets' },
                  { title: 'Linear & Circular Seating Mastery', educator: 'Elites Grid (Hunny Sharma)', url: 'https://www.youtube.com/watch?v=sN4GIKb409A', duration: 'Marathon' }
                ]
              },
              {
                id: 'dilr-matrix',
                title: 'Matrix & Multi-Attribute Matching',
                weightage: 'High (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'Grid matrix notation (tick/cross method), elimination of invalid states, conditional linkages (If A is X, B is not Y).',
                subtopics: ['3-Variable matching grids', 'Order sequencing with constraints', 'Blood relations hybrid matrix', 'Scheduling timelines'],
                lectures: [
                  { title: 'Matrix Puzzles & Elimination Logic', educator: 'Anastasis Shankar', url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru', duration: 'Practice Sets' },
                  { title: 'Multi-Attribute Matching Strategy', educator: 'Elites Grid', url: 'https://www.youtube.com/watch?v=sN4GIKb409A', duration: 'Exam Level' }
                ]
              },
              {
                id: 'dilr-tournaments',
                title: 'Games & Tournaments',
                weightage: 'High (Frequent CAT Set)',
                difficulty: 'Hard',
                hoursNeeded: 12,
                keyConcepts: 'Round-robin points tables (win=2, draw=1, loss=0), knockout tournament seeding brackets (Seed 1 vs Seed n), upsets calculation.',
                subtopics: ['Round-robin points analysis', 'Knockout tournament & Seeding', 'Match margins & bonus points', 'Minimum wins required to qualify'],
                lectures: [
                  { title: 'Complete Games & Tournaments Series', educator: 'Elites Grid (Hunny Sharma)', url: 'https://www.youtube.com/watch?v=sN4GIKb409A', duration: 'Marathon' },
                  { title: 'Knockout Seeding & Round Robin Sets', educator: 'Anastasis Shankar', url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru', duration: 'Advanced' }
                ]
              },
              {
                id: 'dilr-binary-logic',
                title: 'Truth, Liar & Alternator Logic',
                weightage: 'Medium (Occasional Set)',
                difficulty: 'Hard',
                hoursNeeded: 10,
                keyConcepts: 'Case bifurcation on single speaker statement, contradictory statements rule (one must be truth, one liar).',
                subtopics: ['Truth-teller, Liar, Alternator', 'Hypothesis testing on statements', 'Guilty person detective puzzles']
              }
            ]
          },
          {
            id: 'dilr-di',
            title: 'Data Interpretation & Graphs',
            estimatedHours: 35,
            topics: [
              {
                id: 'dilr-tables',
                title: 'Missing Value Tables & Constraints',
                weightage: 'High (1 full set)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 10,
                keyConcepts: 'Row and column sum consistency, boundary inequality bounding, deductive deduction before calculations.',
                subtopics: ['Incomplete financial tables', 'Survey results with missing rows', 'Balance sheet verification', 'Percentage share tables']
              },
              {
                id: 'dilr-charts',
                title: 'Bar, Line, Stacked & Area Charts',
                weightage: 'Medium-High (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'Rapid percentage growth approximation, visual slope reading on line graphs, base effect in stacked column charts.',
                subtopics: ['Cumulative frequency line graphs', 'Multi-bar comparison', 'Stacked percentage bars', 'CAGR & annual growth']
              },
              {
                id: 'dilr-pie-scatter',
                title: 'Pie Charts, Radar & Scatter Plots',
                weightage: 'Medium (1 set)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 8,
                keyConcepts: 'Degree to percentage conversion (3.6 deg = 1%), bubble chart 3-dimensional data reading, radar axis comparisons.',
                subtopics: ['Multi-layer doughnut charts', 'Degree vs value mapping', 'Scatter plots & clustering', 'Radar performance charts']
              },
              {
                id: 'dilr-caselets',
                title: 'Unstructured Data Caselets',
                weightage: 'Medium (1 set)',
                difficulty: 'Hard',
                hoursNeeded: 9,
                keyConcepts: 'Transforming paragraph narrative into structured mathematical tables, variable identification.',
                subtopics: ['Production and sales narrative', 'Company quarterly breakdown', 'Resource allocation caselets']
              }
            ]
          },
          {
            id: 'dilr-quant-reasoning',
            title: 'Quant-Based Reasoning & Optimization',
            estimatedHours: 25,
            topics: [
              {
                id: 'dilr-venn',
                title: 'Venn Diagrams (3 & 4 Sets Maxima-Minima)',
                weightage: 'Very High (1 set ~5 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 10,
                keyConcepts: 'Set theory algebraic variables, Maxima-Minima bounding: maximizing intersection minimizes exactly two categories.',
                subtopics: ['3-Set Venn formula & regions', '4-Set Venn diagram grids', 'Maxima and Minima optimization', 'Survey discrepancy detection']
              },
              {
                id: 'dilr-routes',
                title: 'Routes, Networks & Critical Paths',
                weightage: 'Medium (1 set)',
                difficulty: 'Hard',
                hoursNeeded: 8,
                keyConcepts: 'One-way routes, toll gate fee minimization, maximum flow bottlenecks (Ford-Fulkerson logic).',
                subtopics: ['Shortest travel distance', 'Network traffic capacity', 'Deadlock detection', 'Pipeline flow optimization']
              },
              {
                id: 'dilr-cubes',
                title: 'Cubes, Dices & Geometric Cuts',
                weightage: 'Low-Medium (Occasional)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts: 'Painted cube cuts formula: 0 faces = (n-2)^3, 1 face = 6(n-2)^2, 2 faces = 12(n-2), 3 faces = 8.',
                subtopics: ['Colored faces after n cuts', 'Minimum cuts to produce N pieces', 'Dice opposite face rules']
              }
            ]
          }
        ]
      },
      {
        id: 'varc',
        name: 'Verbal Ability & Reading Comprehension',
        shortName: 'VARC',
        questionsCount: 24,
        durationMinutes: 40,
        color: '#8B5CF6', // Purple
        bgColor: 'bg-purple-50 dark:bg-purple-950/40',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-600 dark:text-purple-400',
        description: 'Reading Comprehension Passages, Para Jumbles, Summary & Completion',
        modules: [
          {
            id: 'varc-rc',
            title: 'Reading Comprehension (16 Questions ~67%)',
            estimatedHours: 50,
            topics: [
              {
                id: 'varc-philosophy',
                title: 'Philosophy, Psychology & Abstract RC',
                weightage: 'High (1 full passage ~4 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 12,
                keyConcepts: 'Deconstructing ontological/epistemological arguments, mapping premises to conclusion, identifying tone.',
                subtopics: ['Existentialism & ethics passages', 'Cognitive psychology & consciousness', 'Author stance vs cited critics', 'Inference vs stated fact'],
                lectures: [
                  { title: 'Option Traps in Reading Comprehension', educator: 'Gejo Speaks', url: 'https://www.youtube.com/results?search_query=gejospeaks+option+traps', duration: 'Masterclass' },
                  { title: 'How to Read Aeon Essays for CAT RC', educator: 'Bodhee Prep', url: 'https://www.youtube.com/results?search_query=bodhee+prep+aeon+essays', duration: 'RC Technique' }
                ]
              },
              {
                id: 'varc-science',
                title: 'Science, Technology, Ecology & Evolution',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 12,
                keyConcepts: 'Causal relationships, empirical evidence evaluation, technical analogies, distinguishing hypotheses from validated findings.',
                subtopics: ['Evolutionary biology passages', 'Artificial intelligence & ethics', 'Climate science & ecological systems', 'Mechanism explanations']
              },
              {
                id: 'varc-sociology',
                title: 'Sociology, Anthropology & History',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 14,
                keyConcepts: 'Cultural frameworks, historical causality, systemic biases, contrasting sociological schools of thought.',
                subtopics: ['Colonialism and modernity', 'Linguistic anthropology', 'Urban sociology & labor trends', 'Historical revisions']
              },
              {
                id: 'varc-economics',
                title: 'Economics, Business & Public Policy',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 12,
                keyConcepts: 'Market incentives, policy trade-offs, unintended consequences, behavioral economics heuristics.',
                subtopics: ['Monopoly & digital platforms', 'Macroeconomic debt cycles', 'Public choice theory', 'Behavioral nudges']
              }
            ]
          },
          {
            id: 'varc-va',
            title: 'Verbal Ability (8 Questions ~33%)',
            estimatedHours: 30,
            topics: [
              {
                id: 'varc-parajumbles',
                title: 'Para Jumbles (TITA & MCQ)',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts: 'Mandatory pairs identification, noun-pronoun references, chronological markers, transition words (however, thus).',
                subtopics: ['Pronoun antecedent tracking', 'Transition connectors (contrast/cause)', 'Opening & closing sentence identification', 'TITA numerical ordering strategies'],
                lectures: [
                  { title: 'Mandatory Pairs & VA Strategies', educator: 'Gejo Speaks', url: 'https://www.youtube.com/results?search_query=gejospeaks+parajumbles', duration: 'Full Series' },
                  { title: 'Para Jumbles TITA Elimination Rules', educator: 'Krishna Sripada', url: 'https://www.youtube.com/results?search_query=krishna+sripada+parajumbles', duration: 'Technique' }
                ]
              },
              {
                id: 'varc-summary',
                title: 'Paragraph Summary',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts: 'Identifying core thesis sentence, eliminating options with broad/narrow distortion, eliminating extreme words (always, never).',
                subtopics: ['Main idea extraction', 'Eliminating over-generalizations', 'Spotting out-of-scope additions', 'Tone preservation'],
                lectures: [
                  { title: 'Paragraph Summary Elimination Traps', educator: 'Gejo Speaks', url: 'https://www.youtube.com/results?search_query=gejospeaks+para+summary', duration: 'Mastery' }
                ]
              },
              {
                id: 'varc-completion',
                title: 'Para Completion (Last Sentence)',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts: 'Logical culmination of argument, avoiding sudden topic leaps, maintaining consistent tone and scope.',
                subtopics: ['Concluding argument coherence', 'Tone matching', 'Premise fulfillment']
              },
              {
                id: 'varc-odd-one',
                title: 'Odd Sentence Out',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 6,
                keyConcepts: 'Find the 4 coherent sentences that form a unified story; the outlier sentence may discuss the same theme but from an alien perspective.',
                subtopics: ['Subject matter cohesion', 'Shift in focal scope', 'Style and register mismatch']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'xat',
    name: 'XAT (Xavier Aptitude Test)',
    year: '2026',
    tagline: 'Gateway to XLRI Jamshedpur & Top Private B-Schools',
    durationMinutes: 210,
    totalQuestions: 95,
    targetScore99ile: 45,
    sections: [
      {
        id: 'xat-dm',
        name: 'Decision Making',
        shortName: 'DM',
        questionsCount: 22,
        durationMinutes: 50,
        color: '#F59E0B',
        bgColor: 'bg-amber-50 dark:bg-amber-950/40',
        borderColor: 'border-amber-200 dark:border-amber-800',
        textColor: 'text-amber-600 dark:text-amber-400',
        description: 'Ethical Dilemmas, Business Cases, HR conflicts, Stakeholder Analysis',
        modules: [
          {
            id: 'dm-ethics',
            title: 'Ethical & Stakeholder Decision Making',
            estimatedHours: 20,
            topics: [
              {
                id: 'dm-corporate-governance',
                title: 'Corporate Ethics & Whistleblowing',
                weightage: 'High (2-3 sets)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts: 'Balancing profit with ethics, legal compliance vs moral responsibility, long-term brand equity.',
                subtopics: ['Employee grievances', 'Supply chain violations', 'Shareholder vs stakeholder primacy']
              }
            ]
          }
        ]
      },
      {
        id: 'xat-val',
        name: 'Verbal and Logical Ability',
        shortName: 'VAL',
        questionsCount: 26,
        durationMinutes: 55,
        color: '#8B5CF6',
        bgColor: 'bg-purple-50 dark:bg-purple-950/40',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-600 dark:text-purple-400',
        description: 'Reading Comprehension, Poem Comprehension, Critical Reasoning, Vocabulary',
        modules: []
      },
      {
        id: 'xat-qadi',
        name: 'Quantitative Ability & Data Interpretation',
        shortName: 'QADI',
        questionsCount: 28,
        durationMinutes: 60,
        color: '#3B82F6',
        bgColor: 'bg-blue-50 dark:bg-blue-950/40',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-600 dark:text-blue-400',
        description: 'Advanced Geometry, Algebra, Functions, Number Systems, Data Sets',
        modules: []
      }
    ]
  },
  {
    id: 'gmat',
    name: 'GMAT (Focus Edition)',
    year: '2025/2026',
    tagline: 'Standardized Exam for Global MBA (Harvard, Stanford, INSEAD, ISB)',
    durationMinutes: 135,
    totalQuestions: 64,
    targetScore99ile: 705,
    sections: [
      {
        id: 'gmat-qr',
        name: 'Quantitative Reasoning',
        shortName: 'QR',
        questionsCount: 21,
        durationMinutes: 45,
        color: '#3B82F6',
        bgColor: 'bg-blue-50 dark:bg-blue-950/40',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-600 dark:text-blue-400',
        description: 'Problem Solving (Algebra, Arithmetic - No Geometry)',
        modules: []
      },
      {
        id: 'gmat-vr',
        name: 'Verbal Reasoning',
        shortName: 'VR',
        questionsCount: 23,
        durationMinutes: 45,
        color: '#8B5CF6',
        bgColor: 'bg-purple-50 dark:bg-purple-950/40',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-600 dark:text-purple-400',
        description: 'Critical Reasoning & Reading Comprehension (No Sentence Correction)',
        modules: []
      },
      {
        id: 'gmat-di',
        name: 'Data Insights',
        shortName: 'DI',
        questionsCount: 20,
        durationMinutes: 45,
        color: '#10B981',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        description: 'Data Sufficiency, Multi-Source Reasoning, Two-Part Analysis, Tables & Graphs',
        modules: []
      }
    ]
  }
];
