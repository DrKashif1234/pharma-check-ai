import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary concern when combining Warfarin with Aspirin?',
    options: [
      'Increased risk of hyperkalemia',
      'Additive bleeding risk due to combined anticoagulant and antiplatelet effects',
      'Decreased antithrombotic efficacy',
      'Severe hepatotoxicity'
    ],
    correctIndex: 1,
    explanation: 'Warfarin blocks coagulation factors II, VII, IX, and X, while Aspirin irreversibly inhibits COX-1 platelet TXA2 aggregation. Combining them severely compromises hemostasis and dramatically increases major GI and systemic bleeding risk.',
    category: 'Anticoagulation & Antiplatelets',
    drugPair: 'Warfarin + Aspirin'
  },
  {
    id: 'q2',
    question: 'Why does Clarithromycin increase the risk of Rhabdomyolysis when co-administered with Simvastatin?',
    options: [
      'Clarithromycin induces CYP2C9, producing toxic statin metabolites',
      'Clarithromycin potently inhibits hepatic CYP3A4, raising simvastatin plasma exposure by up to 10-fold',
      'Clarithromycin competes for renal tubular secretion with simvastatin',
      'Clarithromycin directly damages muscle mitochondria independently of drug levels'
    ],
    correctIndex: 1,
    explanation: 'Simvastatin is heavily metabolized by hepatic CYP3A4. Clarithromycin is a potent CYP3A4 inhibitor, blocking statin clearance and leading to massive statin accumulation, muscle necrosis, and rhabdomyolysis.',
    category: 'Enzyme Inhibition (CYP3A4)',
    drugPair: 'Simvastatin + Clarithromycin'
  },
  {
    id: 'q3',
    question: 'What electrolyte abnormality is most dangerous when Lisinopril is combined with Spironolactone?',
    options: [
      'Hyponatremia',
      'Hyperkalemia',
      'Hypocalcemia',
      'Hypermagnesemia'
    ],
    correctIndex: 1,
    explanation: 'Lisinopril (an ACE inhibitor) reduces aldosterone secretion, while Spironolactone blocks mineralocorticoid receptors. Both mechanisms reduce urinary potassium excretion, causing dangerous or fatal hyperkalemia.',
    category: 'Cardiovascular & Renal',
    drugPair: 'Lisinopril + Spironolactone'
  },
  {
    id: 'q4',
    question: 'Why is Sildenafil strictly contraindicated with Nitroglycerin?',
    options: [
      'Nitroglycerin speeds up sildenafil metabolism',
      'Concurrent cGMP accumulation causes catastrophic systemic vasodilation and refractory hypotension',
      'It causes severe acute renal failure',
      'It induces sudden bronchospasm'
    ],
    correctIndex: 1,
    explanation: 'Nitroglycerin stimulates cGMP production via nitric oxide, while Sildenafil prevents cGMP breakdown by inhibiting PDE5. This dual action leads to massive cGMP accumulation in vascular smooth muscle and severe, potentially fatal hypotension.',
    category: 'Pharmacodynamics',
    drugPair: 'Sildenafil + Nitroglycerin'
  },
  {
    id: 'q5',
    question: 'Why does Omeprazole diminish the antiplatelet effect of Clopidogrel?',
    options: [
      'Omeprazole inhibits CYP2C19, preventing the bioactivation of the clopidogrel prodrug',
      'Omeprazole increases gastric pH, preventing clopidogrel absorption',
      'Omeprazole binds directly to the P2Y12 receptor',
      'Omeprazole increases renal clearance of active clopidogrel'
    ],
    correctIndex: 0,
    explanation: 'Clopidogrel is an inactive prodrug that requires hepatic CYP2C19 activation. Omeprazole competitively inhibits CYP2C19, preventing conversion to the active thiol metabolite and leaving platelets uninhibited.',
    category: 'Prodrug Activation & CYP2C19',
    drugPair: 'Omeprazole + Clopidogrel'
  },
  {
    id: 'q6',
    question: 'When Amiodarone is added to a stable Digoxin regimen, what step should be taken immediately?',
    options: [
      'Increase the digoxin dose by 50%',
      'Reduce the digoxin dose by 30% to 50% and monitor serum digoxin levels closely',
      'Double the amiodarone dose',
      'No adjustment is required'
    ],
    correctIndex: 1,
    explanation: 'Amiodarone inhibits P-glycoprotein (P-gp) and CYP3A4, causing serum digoxin levels to double within 2-7 days. Digoxin dose must be reduced by 30-50% to prevent life-threatening digitalis toxicity.',
    category: 'P-Glycoprotein & Narrow Therapeutic Index',
    drugPair: 'Digoxin + Amiodarone'
  },
  {
    id: 'q7',
    question: 'What happens when St. John\'s Wort is taken concurrently with Apixaban (Eliquis)?',
    options: [
      'Apixaban levels spike, causing severe bleeding',
      'St. John\'s Wort induces CYP3A4 and P-gp, lowering apixaban levels and increasing stroke/clot risk',
      'Anaphylactic reaction',
      'Acute liver failure'
    ],
    correctIndex: 1,
    explanation: 'St. John\'s Wort is a potent inducer of hepatic CYP3A4 and intestinal P-gp. Induction accelerates apixaban clearance, reducing blood levels by ~50% and exposing the patient to stroke and thromboembolism.',
    category: 'Enzyme Induction (Herbal Interactions)',
    drugPair: 'Apixaban + St. John\'s Wort'
  },
  {
    id: 'q8',
    question: 'In the "Triple Whammy" acute kidney injury interaction, which three drug classes combine to compromise renal hemodynamics?',
    options: [
      'ACE Inhibitor/ARB + Diuretic + NSAID',
      'Statin + Macrolide + PPI',
      'Beta blocker + Calcium channel blocker + Digoxin',
      'SSRI + Opioid + Antihistamine'
    ],
    correctIndex: 0,
    explanation: 'The "Triple Whammy" consists of an ACE inhibitor or ARB (dilates efferent arteriole), an NSAID (constricts afferent arteriole via prostaglandin inhibition), and a Diuretic (causes plasma volume depletion). Together, they drastically reduce glomerular filtration rate and trigger acute renal failure.',
    category: 'Renal Hemodynamics',
    drugPair: 'Lisinopril + Ibuprofen + Spironolactone'
  }
];
