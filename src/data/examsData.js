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
                keyConcepts:
                  'Multiplier approach (1.15 for 15% increase), successive percentage changes, markup & margin relation, false weights.',
                subtopics: [
                  'Fraction to % conversions',
                  'Successive % changes',
                  'Cost Price vs Selling Price',
                  'Marked Price & Discount',
                  'Dishonest Merchant'
                ],
                lectures: [
                  {
                    title: 'Percentages Foundation to Advanced',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Full Series'
                  },
                  {
                    title: 'Profit, Loss & False Weights Mastery',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Crash Course'
                  },
                  {
                    title: 'Arithmetic Practice Part 1',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Solved Problems'
                  }
                ]
              },
              {
                id: 'qa-sici',
                title: 'Simple & Compound Interest',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 5,
                keyConcepts:
                  'Difference between CI and SI for 2 and 3 years, CI compounding frequency, Loan equal installments formula.',
                subtopics: [
                  'SI formula & rate comparison',
                  'CI compounding periods',
                  'Installments in SI & CI',
                  'Growth factor equations'
                ],
                lectures: [
                  {
                    title: 'SI & CI Complete Concepts & Installments',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: '3 Videos'
                  },
                  {
                    title: 'Installments & Compound Formulas',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Formula Book'
                  }
                ]
              },
              {
                id: 'qa-ratios',
                title: 'Ratio, Proportion & Variation',
                weightage: 'High (2 Qs)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Direct and inverse variation proportionality constants, compounding ratios, coins and currency distributions.',
                subtopics: [
                  'Ratios & scaling constants',
                  'Direct & Inverse variation',
                  'Joint variation problems',
                  'Partnership & profit sharing'
                ],
                lectures: [
                  {
                    title: 'Ratio & Proportion Foundation',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Day 02, 04'
                  },
                  {
                    title: 'Variation & Partnership Applications',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Concept Class'
                  }
                ]
              },
              {
                id: 'qa-averages',
                title: 'Averages, Mixtures & Alligations',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Deviation method for quick average, Alligation cross-rule, replacement formula: Final = Initial * (1 - x/V)^n.',
                subtopics: [
                  'Deviation method for averages',
                  'Weighted averages',
                  'Rule of Alligation',
                  'Successive dilution / replacement'
                ],
                lectures: [
                  {
                    title: 'Rule of Alligation & Replacement',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Full Module'
                  },
                  {
                    title: 'Mixtures & Alligation Practice',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Practice Sets'
                  }
                ]
              },
              {
                id: 'qa-timework',
                title: 'Time & Work, Pipes & Cisterns',
                weightage: 'High (2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'LCM method for total work units, negative work by leak pipes, efficiency ratios, alternate day work cycles.',
                subtopics: [
                  'LCM unit work model',
                  'Men, Women, Boys efficiency',
                  'Pipes, leaks & filling rates',
                  'Alternate day cycles & wages'
                ],
                lectures: [
                  {
                    title: 'Time & Work LCM Unit Method',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Core Lectures'
                  },
                  {
                    title: 'Pipes & Cisterns Alternate Cycles',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Concept Video'
                  }
                ]
              },
              {
                id: 'qa-tsd',
                title: 'Time, Speed & Distance',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Relative speed in opposite/same direction, average speed harmonic mean, circular tracks meeting points, escalator steps.',
                subtopics: [
                  'Relative Speed & Trains',
                  'Boats & Streams',
                  'Circular Tracks (First meeting & start point)',
                  'Races & Head starts',
                  'Escalators'
                ],
                lectures: [
                  {
                    title: 'TSD Masterclass: Races & Circular Tracks',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: '12 Lectures'
                  },
                  {
                    title: 'Escalators & Relative Speed Shortcuts',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Advanced'
                  }
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
                keyConcepts:
                  'Linear Diophantine equations ax + by = c, number of non-negative integral solutions.',
                subtopics: [
                  'System of linear equations',
                  'Diophantine equations',
                  'Non-negative integer solutions'
                ],
                lectures: [
                  {
                    title: 'Linear Equations & Integral Solutions (Diophantine Equations)',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=kYj2u5T9Jrk',
                    duration: '4 Lectures'
                  },
                  {
                    title: 'Integral Solutions & Non-Negative Variables',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Practice Series'
                  }
                ]
              },
              {
                id: 'qa-quadratics',
                title: 'Quadratic & Polynomial Equations',
                weightage: 'High (2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 8,
                keyConcepts:
                  'Sum/product of roots, nature of discriminant (D), Descarte rule of signs, Vieta formulas for cubic/quartic polynomials.',
                subtopics: [
                  'Roots and coefficients relations',
                  'Location of roots',
                  'Common roots condition',
                  'Higher degree polynomials'
                ],
                lectures: [
                  {
                    title: 'Quadratic Equations & Polynomials Complete Marathon',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=gT8Z0vV_Yx4',
                    duration: '6 Hours Marathon'
                  },
                  {
                    title: 'Roots Location & Common Roots Conditions',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: '5 Lectures'
                  }
                ]
              },
              {
                id: 'qa-inequalities',
                title: 'Inequalities & Modulus Functions',
                weightage: 'High (2 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 8,
                keyConcepts:
                  'Wavy curve method, triangle inequality for modulus |a| + |b| >= |a+b|, geometric interpretation of |x - a| as distance.',
                subtopics: [
                  'Polynomial inequalities (Wavy curve)',
                  'Modulus equations & inequalities',
                  'AM-GM inequality for optimization'
                ],
                lectures: [
                  {
                    title: 'Modulus Functions, Inequalities & Wavy Curve Method',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=wN4mK7eI67Q',
                    duration: '8 Lectures'
                  },
                  {
                    title: 'AM-GM Inequality & Algebra Maxima/Minima',
                    educator: 'Takshzila Shikshak',
                    url: 'https://www.youtube.com/results?search_query=takshzila+am+gm+inequality',
                    duration: 'Deep Dive'
                  }
                ]
              },
              {
                id: 'qa-logs',
                title: 'Logarithms, Surds & Indices',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 5,
                keyConcepts:
                  'Change of base rule, logarithmic inequalities with base < 1, domain restrictions.',
                subtopics: [
                  'Properties of Logarithms',
                  'Base change formula',
                  'Logarithmic equations & bounds',
                  'Indices simplification'
                ],
                lectures: [
                  {
                    title: 'Logarithms, Surds & Indices Complete Concept & PYQs',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=mD0D0Zq_Jt4',
                    duration: '5 Lectures'
                  },
                  {
                    title: 'Logarithmic Equations & Base Change Traps',
                    educator: '2IIM CAT Preparation',
                    url: 'https://www.youtube.com/watch?v=Z2172H_WwL0',
                    duration: 'CAT Solved'
                  }
                ]
              },
              {
                id: 'qa-series',
                title: 'Progressions & Series (AP, GP, HP, AGP)',
                weightage: 'Medium-High (1-2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts:
                  'Arithmetic-Geometric Progression (AGP), telescoping sums, sum of first n squares and cubes.',
                subtopics: [
                  'Arithmetic Progression nth term & sum',
                  'Geometric Progression & infinite sum',
                  'Harmonic Progression & AM-GM-HM',
                  'Telescoping series'
                ],
                lectures: [
                  {
                    title: 'Progressions & Series: AP, GP, HP & AGP Telescoping',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=eB8F7Vz2K4w',
                    duration: '7 Lectures'
                  },
                  {
                    title: 'Telescoping Series & Special Sigma Sums',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Crash Course'
                  }
                ]
              },
              {
                id: 'qa-functions',
                title: 'Functions, Graphs & Maxima/Minima',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Hard',
                hoursNeeded: 6,
                keyConcepts:
                  'Domain, range, odd/even functions, composite functions f(g(x)), graph shifts f(x-a) + b.',
                subtopics: [
                  'Domain & Range finding',
                  'Composite and Inverse functions',
                  'Periodic & Symmetric functions',
                  'Optimization without calculus'
                ],
                lectures: [
                  {
                    title: 'Functions & Graphs: Domain, Range, Composite & Inverse',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=vV3rX1K0s9Y',
                    duration: '6 Lectures'
                  },
                  {
                    title: 'Graph Transformations & Optimization Without Calculus',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Advanced Sets'
                  }
                ]
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
                keyConcepts:
                  'Similarity criteria, Centroid, Incenter, Circumcenter, Orthocenter properties, Apollonius theorem, Stewart theorem.',
                subtopics: [
                  'Angle bisector theorem',
                  'Similar & Congruent triangles',
                  'Euler line & Triangle centers',
                  'Area formulas (Heron, Inradius)'
                ],
                lectures: [
                  {
                    title: 'Geometry Masterclass: Triangle Centers, Similarity & Circles',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hB9vC3pZ_oQ',
                    duration: '10 Lectures'
                  },
                  {
                    title: 'Stewart Theorem, Apollonius & Angle Bisector Magic',
                    educator: 'Takshzila Shikshak',
                    url: 'https://www.youtube.com/results?search_query=takshzila+geometry+triangles',
                    duration: 'Foundation'
                  }
                ]
              },
              {
                id: 'qa-circles',
                title: 'Circles, Chords & Tangents',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 6,
                keyConcepts:
                  'Alternate segment theorem, intersecting chords theorem (PA * PB = PC * PD), tangent-secant theorem (PT^2 = PA * PB).',
                subtopics: [
                  'Chords and equidistant properties',
                  'Tangent-Secant theorems',
                  'Common internal/external tangents',
                  'Cyclic quadrilaterals'
                ],
                lectures: [
                  {
                    title: 'Circles, Chords, Tangents & Secant Theorems',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=nQ8tY0v4u9Y',
                    duration: '8 Lectures'
                  },
                  {
                    title: 'Cyclic Quadrilaterals & Tangent Theorems in CAT',
                    educator: '2IIM CAT Preparation',
                    url: 'https://www.youtube.com/watch?v=C2w0X6t7Y1g',
                    duration: 'Concepts & PYQs'
                  }
                ]
              },
              {
                id: 'qa-coordinate',
                title: 'Coordinate Geometry',
                weightage: 'Low-Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 5,
                keyConcepts:
                  'Distance formula, section formula, slope of perpendicular lines (m1*m2 = -1), area of polygon, distance from line.',
                subtopics: [
                  'Lines, slopes & intercepts',
                  'Area of polygon by shoelace',
                  'Perpendicular distance & reflection',
                  'Circles in coordinate plane'
                ],
                lectures: [
                  {
                    title: 'Coordinate Geometry: Lines, Slopes, Intercepts & Circles',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=wX0uN9v6K3g',
                    duration: '4 Lectures'
                  },
                  {
                    title: 'Area by Shoelace & Reflection Across Lines',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'PYQ Session'
                  }
                ]
              },
              {
                id: 'qa-mensuration',
                title: 'Mensuration 2D & 3D Solids',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Volume, Curved Surface Area, Total Surface Area of cylinder, cone, frustum, sphere, prism, pyramid.',
                subtopics: [
                  'Polygons and regular hexagons',
                  '3D Solids (Cylinder, Cone, Sphere)',
                  'Frustum and Prisms',
                  'Cutting & melting of solids'
                ],
                lectures: [
                  {
                    title: 'Mensuration 2D & 3D: Solids, Frustums, Prisms & Pyramids',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=zT3uW1V6M8k',
                    duration: '5 Lectures'
                  },
                  {
                    title: 'Cutting & Melting of Solids: Volume Invariance',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Formula Drill'
                  }
                ]
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
                keyConcepts:
                  'Cyclicity of units digits, Euler totient theorem, Wilson theorem, negative remainders.',
                subtopics: [
                  'Divisibility rules & cyclicity',
                  'Euler Totient Theorem',
                  'Chinese Remainder Theorem',
                  'Wilson Theorem & Binomial remainders'
                ],
                lectures: [
                  {
                    title: 'Number System: Remainders, Cyclicity, Euler Totient & Wilson',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=aQ8uW9v0P6k',
                    duration: '12 Lectures'
                  },
                  {
                    title: 'Chinese Remainder Theorem & Binomial Theorem for Remainders',
                    educator: 'Takshzila Shikshak',
                    url: 'https://www.youtube.com/results?search_query=takshzila+remainders',
                    duration: 'Core Concepts'
                  }
                ]
              },
              {
                id: 'qa-factors',
                title: 'Factors, Multiples & Factorials',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 7,
                keyConcepts:
                  'Total number of factors = (p+1)(q+1)..., sum of factors, product of factors, power of primes in n! (Legendre formula).',
                subtopics: [
                  'Prime factorization properties',
                  'Sum and product of factors',
                  'Even, odd and co-prime factors',
                  'Highest power of prime in n!'
                ],
                lectures: [
                  {
                    title: 'Factors, Multiples, Number of Divisors & Legendre Formula',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=tY8vW2N4K0g',
                    duration: '6 Lectures'
                  },
                  {
                    title: 'Highest Power of Prime in n! & Trailing Zeroes',
                    educator: '2IIM CAT Preparation',
                    url: 'https://www.youtube.com/watch?v=D4u1P0v7K2c',
                    duration: 'Advanced Concept'
                  }
                ]
              },
              {
                id: 'qa-hcf-lcm',
                title: 'HCF, LCM & Base Systems',
                weightage: 'Low (0-1 Q)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 7,
                keyConcepts:
                  'Product of two numbers = HCF * LCM, Base conversion and arithmetic in base n.',
                subtopics: [
                  'HCF & LCM word problems',
                  'Rings and interval bells',
                  'Base n conversions',
                  'Decimal to binary/octal conversions'
                ],
                lectures: [
                  {
                    title: 'HCF & LCM Word Problems, Intervals & Base Systems',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=bV4mQ9w7K1g',
                    duration: '5 Lectures'
                  },
                  {
                    title: 'Base System Conversions & Non-Decimal Arithmetic',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Concept Class'
                  }
                ]
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
                keyConcepts:
                  'Distribution of identical objects into distinct boxes (n+r-1 C r-1), derangements D_n, circular permutations (n-1)!/2.',
                subtopics: [
                  'Fundamental counting principle',
                  'Arrangements & Selections',
                  'Identical object distribution',
                  'Derangements & grid paths'
                ],
                lectures: [
                  {
                    title: 'Permutations & Combinations (P&C) Comprehensive Masterclass',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=cV9nL0u8P1w',
                    duration: '14 Lectures'
                  },
                  {
                    title: 'Distribution of Identical Objects & Derangements Formula',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'CAT Level P&C'
                  }
                ]
              },
              {
                id: 'qa-probability',
                title: 'Probability & Set Theory',
                weightage: 'Medium (1 Q)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 7,
                keyConcepts:
                  'Conditional probability P(A|B), Bayes Theorem, complementary probability 1 - P(none), Venn diagrams 2 & 3 sets.',
                subtopics: [
                  'Classical probability',
                  'Independent & Dependent events',
                  'Bayes Theorem',
                  'Set theory intersections'
                ],
                lectures: [
                  {
                    title: 'Probability: Conditional, Bayes Theorem & Complementary Counting',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=xT6uW3v8M1k',
                    duration: '6 Lectures'
                  },
                  {
                    title: 'Probability Puzzles & Dice/Coin Biased Scenarios',
                    educator: '2IIM CAT Preparation',
                    url: 'https://www.youtube.com/watch?v=P2w9V7c1N4k',
                    duration: 'PYQ Deep-Dive'
                  }
                ]
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
                keyConcepts:
                  'Bidirectional seating, facing center vs facing outward, relative positioning anchors, circular symmetry.',
                subtopics: [
                  'Linear arrangement with attributes',
                  'Circular facing center / outside',
                  'Dual row parallel seating',
                  'Complex multi-variable arrangements'
                ],
                lectures: [
                  {
                    title: 'Conundrum Carousel: 400+ DILR Sets',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Daily Sets'
                  },
                  {
                    title: 'Linear & Circular Seating Mastery',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Marathon'
                  }
                ]
              },
              {
                id: 'dilr-matrix',
                title: 'Matrix & Multi-Attribute Matching',
                weightage: 'High (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Grid matrix notation (tick/cross method), elimination of invalid states, conditional linkages (If A is X, B is not Y).',
                subtopics: [
                  '3-Variable matching grids',
                  'Order sequencing with constraints',
                  'Blood relations hybrid matrix',
                  'Scheduling timelines'
                ],
                lectures: [
                  {
                    title: 'Matrix Puzzles & Elimination Logic',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Practice Sets'
                  },
                  {
                    title: 'Multi-Attribute Matching Strategy',
                    educator: 'Elites Grid',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Exam Level'
                  }
                ]
              },
              {
                id: 'dilr-tournaments',
                title: 'Games & Tournaments',
                weightage: 'High (Frequent CAT Set)',
                difficulty: 'Hard',
                hoursNeeded: 12,
                keyConcepts:
                  'Round-robin points tables (win=2, draw=1, loss=0), knockout tournament seeding brackets (Seed 1 vs Seed n), upsets calculation.',
                subtopics: [
                  'Round-robin points analysis',
                  'Knockout tournament & Seeding',
                  'Match margins & bonus points',
                  'Minimum wins required to qualify'
                ],
                lectures: [
                  {
                    title: 'Complete Games & Tournaments Series',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Marathon'
                  },
                  {
                    title: 'Knockout Seeding & Round Robin Sets',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Advanced'
                  }
                ]
              },
              {
                id: 'dilr-binary-logic',
                title: 'Truth, Liar & Alternator Logic',
                weightage: 'Medium (Occasional Set)',
                difficulty: 'Hard',
                hoursNeeded: 10,
                keyConcepts:
                  'Case bifurcation on single speaker statement, contradictory statements rule (one must be truth, one liar).',
                subtopics: [
                  'Truth-teller, Liar, Alternator',
                  'Hypothesis testing on statements',
                  'Guilty person detective puzzles'
                ],
                lectures: [
                  {
                    title: 'Truth-Teller, Liar & Alternator: Complete Strategy',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: '4 Practice Sets'
                  },
                  {
                    title: 'Binary Logic & Hypothesis Testing Elimination',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Puzzles'
                  }
                ]
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
                keyConcepts:
                  'Row and column sum consistency, boundary inequality bounding, deductive deduction before calculations.',
                subtopics: [
                  'Incomplete financial tables',
                  'Survey results with missing rows',
                  'Balance sheet verification',
                  'Percentage share tables'
                ],
                lectures: [
                  {
                    title: 'Missing Value Tables & Inequality Constraints',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: '5 Core Sets'
                  },
                  {
                    title: 'Incomplete Tables & Grid Reasoning',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Advanced Sets'
                  }
                ]
              },
              {
                id: 'dilr-charts',
                title: 'Bar, Line, Stacked & Area Charts',
                weightage: 'Medium-High (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Rapid percentage growth approximation, visual slope reading on line graphs, base effect in stacked column charts.',
                subtopics: [
                  'Cumulative frequency line graphs',
                  'Multi-bar comparison',
                  'Stacked percentage bars',
                  'CAGR & annual growth'
                ],
                lectures: [
                  {
                    title: 'Advanced Data Interpretation: Bar, Line & Stacked Charts',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Full DI Course'
                  },
                  {
                    title: 'Cumulative Graphs & Growth Rate Approximations',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'DI Foundation'
                  }
                ]
              },
              {
                id: 'dilr-pie-scatter',
                title: 'Pie Charts, Radar & Scatter Plots',
                weightage: 'Medium (1 set)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 8,
                keyConcepts:
                  'Degree to percentage conversion (3.6 deg = 1%), bubble chart 3-dimensional data reading, radar axis comparisons.',
                subtopics: [
                  'Multi-layer doughnut charts',
                  'Degree vs value mapping',
                  'Scatter plots & clustering',
                  'Radar performance charts'
                ],
                lectures: [
                  {
                    title: 'Multi-Layer Doughnut, Pie & Scatter Plots',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Masterclass'
                  },
                  {
                    title: 'Radar & Bubble Chart Analysis for CAT',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'CAT Sets'
                  }
                ]
              },
              {
                id: 'dilr-caselets',
                title: 'Unstructured Data Caselets',
                weightage: 'Medium (1 set)',
                difficulty: 'Hard',
                hoursNeeded: 9,
                keyConcepts:
                  'Transforming paragraph narrative into structured mathematical tables, variable identification.',
                subtopics: [
                  'Production and sales narrative',
                  'Company quarterly breakdown',
                  'Resource allocation caselets'
                ],
                lectures: [
                  {
                    title: 'Unstructured Data Caselets: Converting Paragraphs into Grids',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Live Workshop'
                  },
                  {
                    title: 'Caselet Solving Framework & Trap Identification',
                    educator: 'Takshzila Shikshak',
                    url: 'https://www.youtube.com/results?search_query=takshzila+caselets',
                    duration: 'Framework'
                  }
                ]
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
                keyConcepts:
                  'Set theory algebraic variables, Maxima-Minima bounding: maximizing intersection minimizes exactly two categories.',
                subtopics: [
                  '3-Set Venn formula & regions',
                  '4-Set Venn diagram grids',
                  'Maxima and Minima optimization',
                  'Survey discrepancy detection'
                ],
                lectures: [
                  {
                    title: '3-Set & 4-Set Venn Diagrams: Maxima & Minima Optimization',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Full Venn Series'
                  },
                  {
                    title: 'Algebraic Maxima-Minima in Set Theory',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'CAT PYQ Sets'
                  }
                ]
              },
              {
                id: 'dilr-routes',
                title: 'Routes, Networks & Critical Paths',
                weightage: 'Medium (1 set)',
                difficulty: 'Hard',
                hoursNeeded: 8,
                keyConcepts:
                  'One-way routes, toll gate fee minimization, maximum flow bottlenecks (Ford-Fulkerson logic).',
                subtopics: [
                  'Shortest travel distance',
                  'Network traffic capacity',
                  'Deadlock detection',
                  'Pipeline flow optimization'
                ],
                lectures: [
                  {
                    title: 'Routes, Networks & Flow Optimization',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Masterclass'
                  },
                  {
                    title: 'Network Bottlenecks & Critical Path Logic',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Advanced Sets'
                  }
                ]
              },
              {
                id: 'dilr-cubes',
                title: 'Cubes, Dices & Geometric Cuts',
                weightage: 'Low-Medium (Occasional)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts:
                  'Painted cube cuts formula: 0 faces = (n-2)^3, 1 face = 6(n-2)^2, 2 faces = 12(n-2), 3 faces = 8.',
                subtopics: [
                  'Colored faces after n cuts',
                  'Minimum cuts to produce N pieces',
                  'Dice opposite face rules'
                ],
                lectures: [
                  {
                    title: 'Cubes, Dices & Geometric Cuts: Complete Concept Formulas',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Full Theory'
                  },
                  {
                    title: 'Painted Cube Cuts & Minimum Slice Puzzles',
                    educator: 'Elites Grid (Hunny Sharma)',
                    url: 'https://www.youtube.com/watch?v=sN4GIKb409A',
                    duration: 'Exam Solved'
                  }
                ]
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
                keyConcepts:
                  'Deconstructing ontological/epistemological arguments, mapping premises to conclusion, identifying tone.',
                subtopics: [
                  'Existentialism & ethics passages',
                  'Cognitive psychology & consciousness',
                  'Author stance vs cited critics',
                  'Inference vs stated fact'
                ],
                lectures: [
                  {
                    title: 'Option Traps in Reading Comprehension',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+option+traps',
                    duration: 'Masterclass'
                  },
                  {
                    title: 'How to Read Aeon Essays for CAT RC',
                    educator: 'Bodhee Prep',
                    url: 'https://www.youtube.com/results?search_query=bodhee+prep+aeon+essays',
                    duration: 'RC Technique'
                  }
                ]
              },
              {
                id: 'varc-science',
                title: 'Science, Technology, Ecology & Evolution',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 12,
                keyConcepts:
                  'Causal relationships, empirical evidence evaluation, technical analogies, distinguishing hypotheses from validated findings.',
                subtopics: [
                  'Evolutionary biology passages',
                  'Artificial intelligence & ethics',
                  'Climate science & ecological systems',
                  'Mechanism explanations'
                ],
                lectures: [
                  {
                    title: 'Science, Tech & Biology RC: Mapping Hypotheses & Evidence',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+rc+techniques',
                    duration: 'RC Breakdown'
                  },
                  {
                    title: 'Scientific Jargon & Technical Passage Deconstruction',
                    educator: 'Bodhee Prep',
                    url: 'https://www.youtube.com/results?search_query=bodhee+prep+rc',
                    duration: 'Reading Technique'
                  }
                ]
              },
              {
                id: 'varc-sociology',
                title: 'Sociology, Anthropology & History',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 14,
                keyConcepts:
                  'Cultural frameworks, historical causality, systemic biases, contrasting sociological schools of thought.',
                subtopics: [
                  'Colonialism and modernity',
                  'Linguistic anthropology',
                  'Urban sociology & labor trends',
                  'Historical revisions'
                ],
                lectures: [
                  {
                    title: 'Sociology, History & Cultural Anthropology Passages',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+rc+reading',
                    duration: 'Analytical Method'
                  },
                  {
                    title: 'Eliminating Biased Interpretations in Humanities RC',
                    educator: 'Bodhee Prep',
                    url: 'https://www.youtube.com/results?search_query=bodhee+prep+reading+comprehension',
                    duration: 'Strategy'
                  }
                ]
              },
              {
                id: 'varc-economics',
                title: 'Economics, Business & Public Policy',
                weightage: 'High (1 passage ~4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 12,
                keyConcepts:
                  'Market incentives, policy trade-offs, unintended consequences, behavioral economics heuristics.',
                subtopics: [
                  'Monopoly & digital platforms',
                  'Macroeconomic debt cycles',
                  'Public choice theory',
                  'Behavioral nudges'
                ],
                lectures: [
                  {
                    title: 'Economics & Public Policy RC: Incentives, Trade-offs & Market Failures',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+rc',
                    duration: 'Deep Analysis'
                  },
                  {
                    title: 'Business & Macroeconomics Passages Decoded',
                    educator: '2IIM CAT Preparation',
                    url: 'https://www.youtube.com/watch?v=Z2172H_WwL0',
                    duration: 'RC Walkthrough'
                  }
                ]
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
                keyConcepts:
                  'Mandatory pairs identification, noun-pronoun references, chronological markers, transition words (however, thus).',
                subtopics: [
                  'Pronoun antecedent tracking',
                  'Transition connectors (contrast/cause)',
                  'Opening & closing sentence identification',
                  'TITA numerical ordering strategies'
                ],
                lectures: [
                  {
                    title: 'Mandatory Pairs & VA Strategies',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+parajumbles',
                    duration: 'Full Series'
                  },
                  {
                    title: 'Para Jumbles TITA Elimination Rules',
                    educator: 'Krishna Sripada',
                    url: 'https://www.youtube.com/results?search_query=krishna+sripada+parajumbles',
                    duration: 'Technique'
                  }
                ]
              },
              {
                id: 'varc-summary',
                title: 'Paragraph Summary',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Identifying core thesis sentence, eliminating options with broad/narrow distortion, eliminating extreme words (always, never).',
                subtopics: [
                  'Main idea extraction',
                  'Eliminating over-generalizations',
                  'Spotting out-of-scope additions',
                  'Tone preservation'
                ],
                lectures: [
                  {
                    title: 'Paragraph Summary Elimination Traps',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+para+summary',
                    duration: 'Mastery'
                  }
                ]
              },
              {
                id: 'varc-completion',
                title: 'Para Completion (Last Sentence)',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Logical culmination of argument, avoiding sudden topic leaps, maintaining consistent tone and scope.',
                subtopics: [
                  'Concluding argument coherence',
                  'Tone matching',
                  'Premise fulfillment'
                ],
                lectures: [
                  {
                    title: 'Para Completion: Spotting the Organic Logical Conclusion',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+para+completion',
                    duration: 'Methodology'
                  },
                  {
                    title: 'Last Sentence Coherence & Avoiding Topic Drifts',
                    educator: 'Krishna Sripada',
                    url: 'https://www.youtube.com/results?search_query=krishna+sripada+varc',
                    duration: 'Verbal Ability'
                  }
                ]
              },
              {
                id: 'varc-odd-one',
                title: 'Odd Sentence Out',
                weightage: 'Medium (1-2 Qs)',
                difficulty: 'Moderate-Hard',
                hoursNeeded: 6,
                keyConcepts:
                  'Find the 4 coherent sentences that form a unified story; the outlier sentence may discuss the same theme but from an alien perspective.',
                subtopics: [
                  'Subject matter cohesion',
                  'Shift in focal scope',
                  'Style and register mismatch'
                ],
                lectures: [
                  {
                    title: 'Odd Sentence Out: Subject Matter Cohesion & Tone Mismatch',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/results?search_query=gejospeaks+odd+one+out',
                    duration: 'Elimination Framework'
                  },
                  {
                    title: 'Finding the Common Narrative in 4 Sentences',
                    educator: 'Krishna Sripada',
                    url: 'https://www.youtube.com/results?search_query=krishna+sripada+odd+sentence+out',
                    duration: 'Strategy'
                  }
                ]
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
            id: 'xat-dm-ethics',
            title: 'Ethical & Stakeholder Decision Making',
            estimatedHours: 20,
            topics: [
              {
                id: 'xat-dm-governance',
                title: 'Corporate Governance & Whistleblowing',
                weightage: 'High (2-3 sets)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Balancing profit with ethics, legal compliance vs moral responsibility, long-term brand equity, whistleblowing protocols.',
                subtopics: [
                  'Employee grievances',
                  'Supply chain violations',
                  'Shareholder vs stakeholder primacy',
                  'Conflict of interest rules'
                ],
                lectures: [
                  {
                    title: 'XAT Decision Making Complete Masterclass',
                    educator: 'Elites Grid (Hunny Malhotra)',
                    url: 'https://www.youtube.com/watch?v=FmHl82Pj2u0',
                    duration: 'Full Series'
                  },
                  {
                    title: 'Decision Making Ethical Frameworks',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/playlist?list=PLg4dY5-Xf7G2_5h84_Y9lq6WJ9mR8iU0d',
                    duration: 'Crash Course'
                  }
                ]
              },
              {
                id: 'xat-dm-social',
                title: 'Environmental, Social & CSR Policy',
                weightage: 'Medium (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Pollution externalities, community consent, tribal land displacement, long-term sustainability vs immediate quarterly profits.',
                subtopics: [
                  'Factory relocation dilemmas',
                  'Carbon footprint offsets',
                  'Community welfare obligations'
                ],
                lectures: [
                  {
                    title: 'CSR & Environmental Ethics Cases',
                    educator: '2IIM XAT Prep',
                    url: 'https://www.youtube.com/watch?v=FmHl82Pj2u0',
                    duration: 'Lecture Series'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-dm-mgmt',
            title: 'Managerial & Business Strategy Dilemmas',
            estimatedHours: 22,
            topics: [
              {
                id: 'xat-dm-operations',
                title: 'Operations, Quality Control & Crisis Management',
                weightage: 'High (2 sets)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Product recall thresholds, vendor fraud detection, supply bottleneck mitigation, customer safety primacy.',
                subtopics: [
                  'Defective batch handling',
                  'Vendor subcontracting violations',
                  'Factory strike resolutions'
                ],
                lectures: [
                  {
                    title: 'Operational DM Strategy',
                    educator: 'Elites Grid',
                    url: 'https://www.youtube.com/watch?v=FmHl82Pj2u0',
                    duration: 'Case Practice'
                  }
                ]
              },
              {
                id: 'xat-dm-marketing',
                title: 'Marketing Ethics & Competitive Strategy',
                weightage: 'Medium (1-2 sets)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts:
                  'Misleading advertisements, predatory pricing, patent infringement claims, customer privacy protections.',
                subtopics: [
                  'Ad campaign backlash',
                  'Competitor sabotage counter-strategy',
                  'Data privacy compliance'
                ],
                lectures: [
                  {
                    title: 'Marketing Decision Scenarios',
                    educator: 'Rodha',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Strategy Class'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-dm-hr',
            title: 'Human Resources & Team Dynamics',
            estimatedHours: 18,
            topics: [
              {
                id: 'xat-dm-grievance',
                title: 'Employee Bias, Promotions & Grievances',
                weightage: 'High (2 sets)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Objective appraisal matrices, handling senior employee resistance to change, diversity and meritocracy balance.',
                subtopics: [
                  'Promotion favoritism disputes',
                  'Workplace harassment investigations',
                  'Incentive structure redesign'
                ],
                lectures: [
                  {
                    title: 'HR Caselets in XAT DM',
                    educator: 'Elites Grid',
                    url: 'https://www.youtube.com/watch?v=FmHl82Pj2u0',
                    duration: 'Past Year Solved'
                  }
                ]
              },
              {
                id: 'xat-dm-conflicts',
                title: 'Cross-Functional Team Friction',
                weightage: 'Medium (1 set)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Sales vs Manufacturing tension, resource sharing conflicts, empathetic leadership intervention.',
                subtopics: [
                  'R&D vs Commercialization timelines',
                  'Budget allocation disputes',
                  'Escalation matrices'
                ],
                lectures: [
                  {
                    title: 'Team Conflict Resolution Sets',
                    educator: 'Takshzila',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Concept Video'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-dm-quant',
            title: 'Analytical & Mathematical DM',
            estimatedHours: 15,
            topics: [
              {
                id: 'xat-dm-cases',
                title: 'Data-Driven Caselets & Cost-Benefit Analysis',
                weightage: 'High (1-2 sets)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Expected Monetary Value (EMV), probability trees, break-even trade-offs, constraint optimization.',
                subtopics: [
                  'Bidding strategy under uncertainty',
                  'Expansion feasibility numbers',
                  'Risk-reward matrices'
                ],
                lectures: [
                  {
                    title: 'Analytical DM Mathematical Problems',
                    educator: 'Elites Grid',
                    url: 'https://www.youtube.com/watch?v=FmHl82Pj2u0',
                    duration: 'Problem Solving'
                  }
                ]
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
        modules: [
          {
            id: 'xat-val-rc-mod',
            title: 'Reading & Literary Comprehension',
            estimatedHours: 25,
            topics: [
              {
                id: 'xat-val-philosophy',
                title: 'Philosophical, Sociological & Abstract RC',
                weightage: 'High (3-4 passages)',
                difficulty: 'Challenging',
                hoursNeeded: 12,
                keyConcepts:
                  'Epistemology, existentialism, aesthetics, structuralism, evaluating nuanced author thesis and unstated premises.',
                subtopics: [
                  'Primary purpose in abstract texts',
                  'Author tone & implicit bias',
                  'Counter-argument identification'
                ],
                lectures: [
                  {
                    title: 'XAT RC Decoded: Abstract Passages',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/playlist?list=PLg4dY5-Xf7G2_5h84_Y9lq6WJ9mR8iU0d',
                    duration: 'RC Series'
                  }
                ]
              },
              {
                id: 'xat-val-poem',
                title: 'Poem Comprehension & Symbolism',
                weightage: 'High (1-2 poems every year)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Poetic devices (metaphor, metonymy, oxymoron), thematic ambiguity, tone shifts between stanzas.',
                subtopics: [
                  'Underlying theme extraction',
                  'Symbolic interpretations',
                  'Attitude of the speaker'
                ],
                lectures: [
                  {
                    title: 'XAT Poem Comprehension Masterclass',
                    educator: 'Gejo Speaks',
                    url: 'https://www.youtube.com/playlist?list=PLg4dY5-Xf7G2_5h84_Y9lq6WJ9mR8iU0d',
                    duration: 'Poem Workshop'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-val-cr-mod',
            title: 'Critical Reasoning & Argumentation',
            estimatedHours: 20,
            topics: [
              {
                id: 'xat-val-arguments',
                title: 'Assumptions, Weaken, Strengthen & Flaws',
                weightage: 'High (5-6 Qs)',
                difficulty: 'Moderate-Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Identifying conclusion vs premises, assumption negation test, causal vs correlation fallacies.',
                subtopics: [
                  'Assumption identification',
                  'Weakening through alternative causes',
                  'Strengthening through control groups'
                ],
                lectures: [
                  {
                    title: 'Critical Reasoning Core Rules',
                    educator: 'Bodhee Prep',
                    url: 'https://www.youtube.com/playlist?list=PLg4dY5-Xf7G2_5h84_Y9lq6WJ9mR8iU0d',
                    duration: 'Crash Course'
                  }
                ]
              },
              {
                id: 'xat-val-logic',
                title: 'Syllogisms & Logical Deductions',
                weightage: 'Medium (2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Venn diagrams for quantifiers (All, Some, None), truth-teller and liar logic in verbal format.',
                subtopics: [
                  'Deductive syllogisms',
                  'Logical consistency checks',
                  'Fallacy of illicit minor/major'
                ],
                lectures: [
                  {
                    title: 'Formal Logic & Deductions',
                    educator: 'Takshzila',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Concept Class'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-val-vocab-mod',
            title: 'Verbal Ability & Contextual Lexicon',
            estimatedHours: 15,
            topics: [
              {
                id: 'xat-val-vocab',
                title: 'Nuanced Contextual Vocabulary & Analogies',
                weightage: 'Medium (3-4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Precision of word pairs, subtle connotations (e.g. thrifty vs miserly), etymological roots, semantic analogies.',
                subtopics: [
                  'Contextual word replacement',
                  'Analogies of degree and relation',
                  'Phonetic & idiomatic usage'
                ],
                lectures: [
                  {
                    title: 'XAT Vocabulary & Word Pairs',
                    educator: '2IIM Verbal',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Vocabulary Guide'
                  }
                ]
              },
              {
                id: 'xat-val-cloze',
                title: 'Sentence Completion & Para Completion',
                weightage: 'Medium (2-3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 7,
                keyConcepts:
                  'Signpost words (however, nevertheless, consequently), structural sentence balance, paragraph climax tone.',
                subtopics: [
                  'Double-blank cloze tests',
                  'Closing sentence matching',
                  'Punctuation & grammatical mood'
                ],
                lectures: [
                  {
                    title: 'Sentence Completion Strategies',
                    educator: 'Bodhee Prep',
                    url: 'https://www.youtube.com/playlist?list=PLg4dY5-Xf7G2_5h84_Y9lq6WJ9mR8iU0d',
                    duration: 'Solved Examples'
                  }
                ]
              }
            ]
          }
        ]
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
        description: 'Advanced Geometry, Higher Algebra, Functions, Numbers, Multi-Variable DI',
        modules: [
          {
            id: 'xat-qadi-geom-mod',
            title: 'Advanced Geometry & Trigonometry',
            estimatedHours: 25,
            topics: [
              {
                id: 'xat-qadi-geometry',
                title: 'Higher Geometry, Trigonometry & Mensuration',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 12,
                keyConcepts:
                  'Ptolemy theorem, Stewart theorem, trigonometric heights & angles of elevation, 3D cutting solids, coordinate geometry rotations.',
                subtopics: [
                  'Cyclic quadrilaterals & chord properties',
                  'Trigonometric identities in triangles',
                  'Coordinate reflection & distances',
                  'Solid frustums & spheres'
                ],
                lectures: [
                  {
                    title: 'Advanced Geometry for XAT',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Deep Dive'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-qadi-alg-mod',
            title: 'Higher Algebra & Modern Math',
            estimatedHours: 25,
            topics: [
              {
                id: 'xat-qadi-algebra',
                title: 'Polynomials, Functional Equations & Graphs',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 12,
                keyConcepts:
                  'Higher degree roots relation, Vieta formulas, functional equations f(x+y) = f(x)f(y), transformations of curves.',
                subtopics: [
                  'Cubic & quartic roots',
                  'Functional equations techniques',
                  'Graph shifts & symmetry',
                  'Logarithmic bounds'
                ],
                lectures: [
                  {
                    title: 'Higher Algebra & Functions for XAT',
                    educator: 'Ravi Prakash (Rodha)',
                    url: 'https://www.youtube.com/watch?v=hGOn9659ujo',
                    duration: 'Full Series'
                  }
                ]
              },
              {
                id: 'xat-qadi-pnc',
                title: 'Permutations, Combinations & Probability',
                weightage: 'High (2-3 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Derangements formula, circular permutations with beads, conditional probability, Bayes theorem, geometric probability.',
                subtopics: [
                  'Derangement problems',
                  'Distributing identical vs distinct objects',
                  'Conditional events & expected value'
                ],
                lectures: [
                  {
                    title: 'PnC & Probability Mastery',
                    educator: 'Raman Tiwari',
                    url: 'https://www.youtube.com/playlist?list=PLj8E34obZYU0sxwpe8w7ZLN6PlzLcMtqs',
                    duration: 'Masterclass'
                  }
                ]
              }
            ]
          },
          {
            id: 'xat-qadi-di-mod',
            title: 'Data Interpretation & Reasoning',
            estimatedHours: 20,
            topics: [
              {
                id: 'xat-qadi-caselets',
                title: 'Data Caselets & Unconventional Tables',
                weightage: 'High (2-3 sets)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Missing value constraint tables, scatter plot trendlines, multi-variable optimization in DI.',
                subtopics: [
                  'Constraint maximization tables',
                  'Scatter plots & clustering',
                  'Radar & bubble charts'
                ],
                lectures: [
                  {
                    title: 'XAT Data Interpretation Sets',
                    educator: 'Anastasis Shankar',
                    url: 'https://www.youtube.com/playlist?list=PLgdxDqtv4Gt-4vXeT_OuiwJ7-jBujAEru',
                    duration: 'Practice Sets'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'xat-gk',
        name: 'General Knowledge & Current Affairs',
        shortName: 'GK',
        questionsCount: 25,
        durationMinutes: 15,
        color: '#10B981',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        description:
          'Business Awareness, Macroeconomics, Indian Polity, Static GK, International Treaties',
        modules: [
          {
            id: 'xat-gk-biz-mod',
            title: 'Business, Economy & Treaties',
            estimatedHours: 15,
            topics: [
              {
                id: 'xat-gk-economy',
                title: 'Macroeconomics, Banking & Monetary Policy',
                weightage: 'High (8-10 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'RBI repo/reverse repo rates, fiscal deficit metrics, GDP components, inflation indices (CPI/WPI), WTO/IMF mandates.',
                subtopics: [
                  'Monetary policy tools',
                  'Foreign exchange reserves',
                  'Global trade agreements'
                ]
              },
              {
                id: 'xat-gk-corporate',
                title: 'Mergers, Acquisitions & Corporate Leaders',
                weightage: 'High (6-8 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Recent billion-dollar acquisitions, startup unicorns, prominent CEOs, brand parent companies.',
                subtopics: [
                  'Tech company leadership',
                  'Automobile mergers',
                  'Regulatory antitrust rulings'
                ]
              }
            ]
          },
          {
            id: 'xat-gk-static-mod',
            title: 'Static GK & International Affairs',
            estimatedHours: 15,
            topics: [
              {
                id: 'xat-gk-polity',
                title: 'Indian Constitution, Geography & Geopolitics',
                weightage: 'High (6-8 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Fundamental rights, key constitutional amendments, maritime straits (Malacca, Hormuz), international boundaries.',
                subtopics: [
                  'Constitutional articles',
                  'Geographical straits & canals',
                  'UN bodies & headquarters'
                ]
              },
              {
                id: 'xat-gk-awards',
                title: 'Awards, Nobel Prizes & Summits',
                weightage: 'Medium (4-5 Qs)',
                difficulty: 'Easy-Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Nobel laureates in Economics & Peace, Booker Prize winners, Oscar awards, G20/BRICS summit hosts.',
                subtopics: [
                  'Nobel Prize citations',
                  'Major literature awards',
                  'Global climate summits'
                ]
              }
            ]
          }
        ]
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
        description:
          'Problem Solving in Algebra & Arithmetic (Note: Focus Edition has ZERO Geometry)',
        modules: [
          {
            id: 'gmat-qr-alg-mod',
            title: 'Algebra & Pure Math',
            estimatedHours: 25,
            topics: [
              {
                id: 'gmat-qr-equations',
                title: 'Linear & Quadratic Systems & Roots',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 10,
                keyConcepts:
                  'Solving simultaneous systems with integer constraints, quadratic factoring, discriminant properties, vertex of parabola.',
                subtopics: [
                  'System of linear equations',
                  'Quadratic roots & factoring',
                  'Completing the square'
                ],
                lectures: [
                  {
                    title: 'GMAT Focus Algebra Masterclass',
                    educator: 'GMAT Club Official',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Full Series'
                  }
                ]
              },
              {
                id: 'gmat-qr-inequalities',
                title: 'Inequalities & Absolute Value Equations',
                weightage: 'High (3-4 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Flipping inequality signs on negative multiplication, wavy-curve sign charts, distance definition of absolute values |x - a| < d.',
                subtopics: [
                  'Sign chart interval method',
                  'Non-linear inequalities',
                  'Modulus boundary testing'
                ],
                lectures: [
                  {
                    title: 'Inequalities & Absolute Values for GMAT',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Core Lesson'
                  }
                ]
              },
              {
                id: 'gmat-qr-exponents',
                title: 'Exponents, Roots & Scientific Notation',
                weightage: 'Medium (2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 6,
                keyConcepts:
                  'Rules of exponents, rationalizing radical expressions, units digit cycles of exponential powers.',
                subtopics: [
                  'Power rules & negative exponents',
                  'Surds simplification',
                  'Units digit cyclicity'
                ],
                lectures: [
                  {
                    title: 'Exponents & Roots Crash Course',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Video Guide'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-qr-arith-mod',
            title: 'Arithmetic Word Problems',
            estimatedHours: 25,
            topics: [
              {
                id: 'gmat-qr-rates',
                title: 'Work-Rate & Speed-Distance Kinetics',
                weightage: 'High (3-4 Qs)',
                difficulty: 'Moderate-Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Combined rate reciprocals 1/A + 1/B = 1/T, catch-up relative speed, average speed harmonic mean 2ab/(a+b).',
                subtopics: [
                  'Combined machine work rates',
                  'Catch-up & pass problems',
                  'Average speed traps'
                ],
                lectures: [
                  {
                    title: 'GMAT Work & Rate Traps',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Masterclass'
                  }
                ]
              },
              {
                id: 'gmat-qr-numbers',
                title: 'Number Properties, Primes & Divisibility',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Fundamental theorem of arithmetic, finding number of factors from prime exponents, trailing zeroes from factors of 10 (2x5).',
                subtopics: [
                  'Prime factorization trees',
                  'LCM & GCD relations',
                  'Even/Odd parity & sign rules'
                ],
                lectures: [
                  {
                    title: 'Number Properties for 700+ Scorers',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Lecture Series'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-qr-stats-mod',
            title: 'Statistics & Combinatorics',
            estimatedHours: 18,
            topics: [
              {
                id: 'gmat-qr-statistics',
                title: 'Mean, Median, Range & Standard Deviation',
                weightage: 'High (3 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Median positioning in odd vs even sets, effect of outliers on mean vs median, shift/scale effects on standard deviation.',
                subtopics: [
                  'Equidistant sets mean=median',
                  'Standard deviation invariance under constant addition',
                  'Weighted average balance rule'
                ],
                lectures: [
                  {
                    title: 'GMAT Statistics & Standard Deviation',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Video Lesson'
                  }
                ]
              },
              {
                id: 'gmat-qr-counting',
                title: 'Combinatorics & Overlapping Sets (Venn)',
                weightage: 'Medium (2 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Combinations formula nCr, slot method with restrictions, 2-group double-set matrix grids.',
                subtopics: [
                  'Double-set matrix table',
                  'Permutation restrictions',
                  'Independent probability'
                ],
                lectures: [
                  {
                    title: 'Overlapping Sets & Combinations',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Practice Class'
                  }
                ]
              }
            ]
          }
        ]
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
        description:
          'Critical Reasoning & Reading Comprehension (Zero Sentence Correction in Focus)',
        modules: [
          {
            id: 'gmat-vr-cr-mod',
            title: 'Critical Reasoning (CR)',
            estimatedHours: 25,
            topics: [
              {
                id: 'gmat-vr-assumptions',
                title: 'Assumptions (Supporter & Defender Models)',
                weightage: 'High (3-4 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 9,
                keyConcepts:
                  'Negation technique: if negating the option destroys the conclusion, that option is the essential assumption.',
                subtopics: [
                  'Supporter assumptions (connecting gaps)',
                  'Defender assumptions (eliminating alternate causes)',
                  'Negation test mechanics'
                ],
                lectures: [
                  {
                    title: 'GMAT Critical Reasoning: The Negation Test',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Masterclass'
                  }
                ]
              },
              {
                id: 'gmat-vr-weaken',
                title: 'Weaken & Strengthen Arguments',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Moderate-Challenging',
                hoursNeeded: 9,
                keyConcepts:
                  'Causality vs correlation, providing alternative causes to weaken, showing control group consistency to strengthen.',
                subtopics: [
                  'Alternative cause identification',
                  'Reversing causality',
                  'Data sample representation attacks'
                ],
                lectures: [
                  {
                    title: 'Strengthen & Weaken Framework',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'CR Series'
                  }
                ]
              },
              {
                id: 'gmat-vr-boldface',
                title: 'Boldface Arguments & Method of Reasoning',
                weightage: 'High (2 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 7,
                keyConcepts:
                  'Classifying bold segments: main conclusion, intermediate conclusion, factual premise, counter-premise, or conceded fact.',
                subtopics: [
                  'Premise vs conclusion distinction',
                  'Attitude words in arguments',
                  'Role mapping'
                ],
                lectures: [
                  {
                    title: 'Boldface CR Questions Decoded',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Strategy Class'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-vr-rc-mod',
            title: 'Reading Comprehension (RC)',
            estimatedHours: 20,
            topics: [
              {
                id: 'gmat-vr-mainidea',
                title: 'Primary Purpose & Passage Structure',
                weightage: 'High (4 passages, ~12 Qs total)',
                difficulty: 'Moderate',
                hoursNeeded: 10,
                keyConcepts:
                  'Paragraph skeleton mapping, identifying author thesis vs cited researcher opinions, tone neutrality in GMAT.',
                subtopics: [
                  'Primary purpose identification',
                  'Structural organization questions',
                  'Author stance & tone'
                ],
                lectures: [
                  {
                    title: 'GMAT Reading Comprehension Framework',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'RC Masterclass'
                  }
                ]
              },
              {
                id: 'gmat-vr-rc-inference',
                title: 'Inference & Detail Questions',
                weightage: 'High (6-7 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 8,
                keyConcepts:
                  'Zero extrapolation rule: inferences must be directly supported by text without outside knowledge.',
                subtopics: [
                  'Unstated implications',
                  'Direct detail retrieval',
                  'Contextual terminology'
                ],
                lectures: [
                  {
                    title: 'Avoiding Out-of-Scope Trap Answers',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Video Guide'
                  }
                ]
              }
            ]
          }
        ]
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
        modules: [
          {
            id: 'gmat-di-ds-mod',
            title: 'Data Sufficiency (The 12-Second Grid)',
            estimatedHours: 25,
            topics: [
              {
                id: 'gmat-di-ds-val',
                title: 'Value DS vs Yes/No DS Framework',
                weightage: 'High (6-7 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 12,
                keyConcepts:
                  'The AD/BCE decision tree. Statement (1) alone sufficient eliminates BCE. For Yes/No questions: definite YES or definite NO is sufficient; a MAYBE is insufficient.',
                subtopics: [
                  'The 12-second AD/BCE elimination grid',
                  'Value questions (unique single numerical answer)',
                  'Yes/No questions (definite truth value)',
                  'Avoiding sufficiency confirmation bias'
                ],
                lectures: [
                  {
                    title: 'Data Sufficiency Strategy & AD/BCE Grid',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'DS Masterclass'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-di-tpa-mod',
            title: 'Two-Part Analysis (TPA)',
            estimatedHours: 18,
            topics: [
              {
                id: 'gmat-di-tpa-quant',
                title: 'Quantitative & Verbal Two-Part Analysis',
                weightage: 'High (4-5 Qs)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Evaluating interdependent column choices, dual-variable constraint optimization, identifying premises and conclusions simultaneously.',
                subtopics: [
                  'Algebraic simultaneous choice matrices',
                  'Logistical flow trade-offs',
                  'Argument roles dual classification'
                ],
                lectures: [
                  {
                    title: 'Two-Part Analysis in GMAT Data Insights',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Full Workshop'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-di-msr-mod',
            title: 'Multi-Source Reasoning (MSR)',
            estimatedHours: 18,
            topics: [
              {
                id: 'gmat-di-msr-tabs',
                title: '3-Tab Document Synthesis',
                weightage: 'High (3-4 Qs per set)',
                difficulty: 'Challenging',
                hoursNeeded: 10,
                keyConcepts:
                  'Cross-referencing emails, company policies, and numeric tables across 3 tabs; identifying conflicting constraints.',
                subtopics: [
                  'Email correspondence inference',
                  'Policy vs implementation audit',
                  'Triangulating data points'
                ],
                lectures: [
                  {
                    title: 'Multi-Source Reasoning Tab Navigation',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'MSR Deep Dive'
                  }
                ]
              }
            ]
          },
          {
            id: 'gmat-di-visual-mod',
            title: 'Table Analysis & Graphics Interpretation',
            estimatedHours: 18,
            topics: [
              {
                id: 'gmat-di-tables',
                title: 'Sortable Table Analysis & Binary Triads',
                weightage: 'High (3-4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Sorting spreadsheets by columns, answering 3-part True/False or Yes/No questions (must get all 3 correct for points).',
                subtopics: [
                  'Column sorting shortcuts',
                  'Multi-condition filtering',
                  'Percentage share verification'
                ],
                lectures: [
                  {
                    title: 'Table Analysis Speed Techniques',
                    educator: 'GMAT Club',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Interactive Session'
                  }
                ]
              },
              {
                id: 'gmat-di-graphics',
                title: 'Graphics Interpretation (Scatter & Dual Axes)',
                weightage: 'High (3-4 Qs)',
                difficulty: 'Moderate',
                hoursNeeded: 8,
                keyConcepts:
                  'Reading scatter plot regression trends, dual vertical axes scaling, fill-in-the-blank drop-down selections.',
                subtopics: [
                  'Scatter plots & outliers',
                  'Dual vertical axis charts',
                  'Cumulative percentage curves'
                ],
                lectures: [
                  {
                    title: 'Graphics Interpretation on GMAT Focus',
                    educator: 'GMAT Ninja',
                    url: 'https://www.youtube.com/watch?v=ADH2rAo-wKk',
                    duration: 'Visual Data Class'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
