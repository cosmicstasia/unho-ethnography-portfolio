// Part 1: Conceptual Research Plan.
// `original` is the plan as first submitted (copied from the team Google Doc).
// `updated` is the revised plan after instructor feedback and fieldwork.

export const columns = [
  'Research question being addressed',
  'What do we need to know?',
  'Why is this information important?',
  'Where can we find this information?',
  'Who are the targeted stakeholders?',
  'What type of data are needed?',
  'What are the ethical implications of collecting data from these stakeholders?',
  'Ethical principle(s) alignment (using our team’s principles)',
  'Research method approach',
  'What are the anticipated roadblocks or failures of this data collection approach?',
];

export const original: string[][] = [
  [
    'How do the biases against women in engineering contribute to the retention of women in the engineering program at UTK?',
    'We need to know the specific biases experienced by women in engineering.',
    'This information is important as it allows us to gain a comprehensive understanding of the myriad of experiences of women in engineering',
    'Interview using maybe anonymous surveys to protect confidentiality',
    'Professors, Female Students, Female Engineering Students',
    'The date we would need is how many women have entered engineering, and how many women have dropped out of engineering and why?',
    'The ethical implications are we have to get their consent to get and release information, and keep a professional relationship with all stakeholders.',
    'Consent of collecting data; Research question bias',
    'Interview; Observations',
    'Limited information; can’t get a lot of information from observing things',
  ],
  [
    'How does seeing female engineering faculty impact gender roles in Engineering?',
    'If female faculty changes gender biases through the perspectives of students',
    'This information is important because it reveals the impact of representation for female engineering students and how it affects the number of female students going into engineering.',
    'Survey online, in-person feedback, professor interview, women in engineering club',
    'Engineering students',
    'Differences in resources received between male and female faculty??',
    'The ethical implications would be getting their consent to release information told to us, and keeping questions professional.',
    'Female bias',
    'Interview; Observation',
    'Assumptions',
  ],
];

export const updated: string[][] = [
  [
    'How do the biases against women in engineering contribute to the retention of women in the engineering program at UTK?',
    'What experiences with bias, if any, women in UTK engineering have had, and whether those experiences make them think about leaving the major.',
    'It lets us understand the different experiences of women in engineering, and whether bias is one of the reasons women leave.',
    'Interviews with female engineering students and a female engineering faculty member. Public Tickle College of Engineering reports and Women in Engineering program pages.',
    'Female engineering students, female engineering faculty, and male engineering students for comparison.',
    'Interview transcripts about experiences in engineering classes and thoughts about staying or leaving. Enrollment and retention numbers by gender from college reports.',
    'We get informed consent before recording. We refer to participants as P1 to P5, remove names from transcripts and empathy maps, and do not publish audio.',
    'Consent of collecting data; Research question bias (we ask open questions that do not assume bias happened)',
    'Ethnographic interviews (P1, P3, P4); artifact and document collection',
    'Only one participant (P4) was thinking about leaving engineering. UT does not publish retention numbers by gender, so we could not find the data we planned to use.',
  ],
  [
    'How does seeing female engineering faculty impact gender roles in engineering?',
    'Whether having female engineering faculty changes how students participate in class and who they think belongs in engineering.',
    'It shows the impact of representation for female engineering students and how it affects the number of women going into and staying in engineering.',
    'Interviews with a female faculty member, a graduate TA, and male and female students. National faculty data from the Society of Women Engineers.',
    'Female and male engineering students, female engineering faculty, and engineering TAs.',
    'Interview accounts of participation with male and female instructors. Numbers of women on engineering faculty.',
    'Same consent and confidentiality steps as above. Questions stay professional and neutral.',
    'Female bias (we included male participants and asked about gender “if at all” so we did not lead answers)',
    'Ethnographic interviews (P1, P2, P3, P5); artifact and document collection',
    'Students had little to compare. P2 has only had female engineering professors and P5 has never had one. UT does not post its faculty numbers by gender.',
  ],
];

// How we responded to each point in Dr. Mac's feedback.
export const feedbackResponses: { feedback: string; response: string }[] = [
  {
    feedback: 'Refine the research questions and make sure each method gives information that answers them.',
    response:
      'We kept both research questions but made “what do we need to know” more specific. We added an alignment table below that shows which interviews and documents answer which question.',
  },
  {
    feedback: 'Consider whether interviews may be more useful than observations.',
    response:
      'We agreed. We dropped observation and online surveys and did five ethnographic interviews instead. For our second method we used artifact and document collection, which also let us look for the enrollment and retention numbers our plan asked for.',
  },
  {
    feedback: 'Be intentional about whose perspectives you include.',
    response:
      'Our first plan only listed professors and female students. We ended up interviewing a female faculty member, a male graduate TA, two female students, and a male student so we could compare perspectives.',
  },
  {
    feedback: 'Avoid questions that assume gender bias has occurred.',
    response:
      'Our interview guide asks about gender “if at all” and asks what differences participants have seen “if any.” We started each interview with questions about the participant’s own path into engineering before bringing up gender.',
  },
  {
    feedback: 'Establish clear procedures for protecting participants’ confidentiality.',
    response:
      'We asked for consent before recording, labeled participants P1 to P5, removed names from transcripts and empathy maps, and kept audio recordings off this site.',
  },
  {
    feedback: 'Revisit your team’s guiding principles.',
    response:
      'We updated the ethical principles column to say how consent and avoiding research question bias and female bias actually shaped what we did.',
  },
];

// Research question -> method -> evidence alignment.
export const alignment: { rq: string; method: string; evidence: string[] }[] = [
  {
    rq: 'RQ1: Bias and retention',
    method: 'Interviews',
    evidence: [
      'P4 is considering leaving and says gender is “part of the reason.”',
      'P3 and P4 describe feeling they have to be perfect or overperform to belong.',
      'P1 describes mediating team conflicts where female students get left out.',
    ],
  },
  {
    rq: 'RQ1: Bias and retention',
    method: 'Artifact and document collection',
    evidence: [
      'Annual report: women are 25% of undergraduates, but there is no public retention data by gender.',
      '2022 ASEE paper by UT faculty and staff: women leave partly because of a lack of mentoring and social support.',
    ],
  },
  {
    rq: 'RQ2: Female faculty and gender roles',
    method: 'Interviews',
    evidence: [
      'P1 has had students surprised she was not a man, and thinks a female instructor normalizes women in engineering.',
      'P2 and P3 have had mostly female engineering professors; P5 has had none.',
      'P5 says female TAs show students “that there are successful women in this field.”',
    ],
  },
  {
    rq: 'RQ2: Female faculty and gender roles',
    method: 'Artifact and document collection',
    evidence: [
      'Society of Women Engineers: about 1 in 5 U.S. engineering faculty are women, and aerospace has the lowest share.',
    ],
  },
];
