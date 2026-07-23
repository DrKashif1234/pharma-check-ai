import { Interaction } from '../types';

export const INTERACTIONS_DATA: Interaction[] = [
  {
    id: 'int_warfarin_aspirin',
    drug_a: 'warfarin',
    drug_b: 'aspirin',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Additive antithrombotic and anticoagulant effects. Aspirin irreversibly inhibits COX-1 mediated platelet TXA2 aggregation and causes direct gastric mucosal erosion, while warfarin inhibits Vitamin K-dependent coagulation cascade factors (II, VII, IX, X).',
    clinical_significance: 'Co-administration dramatically increases the incidence of major gastrointestinal and systemic hemorrhage without providing proportional cardiovascular benefit in most routine patients.',
    possible_effects: [
      'Substantially increased risk of severe gastrointestinal bleeding',
      'Increased risk of major intracranial or systemic hemorrhage',
      'Prolonged bleeding time and easy bruising'
    ],
    monitoring: [
      'Monitor Prothrombin Time (PT) and International Normalized Ratio (INR) closely',
      'Monitor hemoglobin and hematocrit levels',
      'Assess for clinical signs of occult bleeding (dark tarry stools, coffee-ground emesis, hematuria, unexplained bruising)'
    ],
    management_considerations: [
      'Avoid unindicated concomitant use unless explicit indication exists (e.g. recent mechanical heart valve or acute coronary stent placement).',
      'If combination is clinically essential, use the lowest effective aspirin dose (81 mg daily).',
      'Consider prescribing a gastroprotective agent such as a Proton Pump Inhibitor (PPI) or H2-receptor antagonist.'
    ],
    educational_summary: 'Combining Warfarin (an anticoagulant) and Aspirin (an antiplatelet) creates a double hit to hemostasis, dramatically elevating bleeding risk.',
    source_reference: 'Stockley\'s Drug Interactions (12th Ed) & Chest Antithrombotic Guidelines 2024'
  },
  {
    id: 'int_lisinopril_spironolactone',
    drug_a: 'lisinopril',
    drug_b: 'spironolactone',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Additive inhibition of aldosterone action. Lisinopril reduces aldosterone secretion by blocking ACE, while spironolactone competitively blocks aldosterone receptors in renal collecting ducts, together markedly curtailing urinary potassium excretion.',
    clinical_significance: 'Potentially fatal hyperkalemia can develop rapidly, leading to severe cardiac conduction abnormalities, bradycardia, or cardiac arrest, particularly in elderly patients or those with diabetic nephropathy.',
    possible_effects: [
      'Severe Hyperkalemia (Serum K+ > 5.5 - 6.0 mEq/L)',
      'Cardiac arrhythmias, sinus arrest, or ventricular fibrillation',
      'Muscle weakness, paresthesias, and ascending paralysis'
    ],
    monitoring: [
      'Check baseline serum potassium and eGFR before initiating therapy.',
      'Recheck serum potassium and renal function at 1 week, 1 month, and periodically thereafter.',
      'Obtain ECG if potassium exceeds 5.5 mEq/L or if patient experiences muscle fatigue or palpitations.'
    ],
    management_considerations: [
      'Combination is evidence-based in heart failure (NYHA II-IV), but low doses of spironolactone (12.5mg - 25mg daily) must be used.',
      'Counsel patient to strictly avoid potassium supplements and potassium-rich salt substitutes.',
      'Withhold or reduce spironolactone if serum potassium exceeds 5.0 mEq/L or eGFR drops below 30 mL/min/1.73m2.'
    ],
    educational_summary: 'Lisinopril and Spironolactone both block aldosterone activity in the kidneys, leading to potassium retention and severe hyperkalemia.',
    source_reference: 'AHA/ACC Heart Failure Guidelines 2023 & Renal Clinical Pharmacology'
  },
  {
    id: 'int_simvastatin_clarithromycin',
    drug_a: 'simvastatin',
    drug_b: 'clarithromycin',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Clarithromycin is a potent, mechanism-based inhibitor of hepatic CYP3A4. Simvastatin is extensively metabolized by CYP3A4. Concomitant administration inhibits simvastatin clearance, spiking plasma AUC by up to 10- to 12-fold.',
    clinical_significance: 'Extremely high simvastatin plasma concentrations trigger muscle cell necrosis, causing acute skeletal muscle breakdown (rhabdomyolysis) and secondary acute kidney injury from myoglobinuria.',
    possible_effects: [
      'Severe myopathy, muscle breakdown, and rhabdomyolysis',
      'Acute kidney injury secondary to myoglobinuria',
      'Marked elevation in serum Creatine Kinase (CK > 10x ULN)',
      'Dark brown or tea-colored urine'
    ],
    monitoring: [
      'Monitor for unexplainable muscle pain, tenderness, or weakness.',
      'Check serum Creatine Kinase (CK), blood urea nitrogen (BUN), and serum creatinine if muscle symptoms occur.',
      'Monitor urine color.'
    ],
    management_considerations: [
      'Concomitant administration is CONTRAINDICATED by FDA product labeling.',
      'Temporarily suspend simvastatin therapy during the short course of clarithromycin.',
      'Alternatively, select a non-CYP3A4 metabolized macrolide (e.g. Azithromycin) or non-CYP3A4 statin (e.g. Pravastatin or Rosuvastatin).'
    ],
    educational_summary: 'Clarithromycin blocks CYP3A4, causing simvastatin to build up to toxic levels in the bloodstream and break down muscle tissue (rhabdomyolysis).',
    source_reference: 'FDA Drug Safety Communication: Simvastatin drug interaction updates & Lexicomp'
  },
  {
    id: 'int_fluoxetine_tramadol',
    drug_a: 'fluoxetine',
    drug_b: 'tramadol',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Dual pharmacokinetic/pharmacodynamic interaction. Fluoxetine potently inhibits CYP2D6 (preventing tramadol bioactivation to its M1 opioid metabolite while increasing parent drug level) and additively increases central synaptic serotonin levels, raising risk of Serotonin Syndrome.',
    clinical_significance: 'Concurrent use increases risk of central nervous system toxicity, Serotonin Syndrome, and lowers the seizure threshold. In addition, analgesic efficacy of tramadol may be diminished due to reduced M1 active metabolite generation.',
    possible_effects: [
      'Serotonin Syndrome (hyperthermia, agitation, hyperreflexia, tremor, diaphoresis, clonus)',
      'Increased risk of generalized tonic-clonic seizures',
      'Reduced pain control / analgesic tolerance'
    ],
    monitoring: [
      'Observe closely for signs of serotonergic hyperreactivity (neuromuscular excitability, autonomic instability, altered mental state).',
      'Monitor pain control efficacy.'
    ],
    management_considerations: [
      'Avoid combination whenever possible.',
      'Consider alternative non-serotonergic analgesics (e.g. acetaminophen, short-course standard opioids) if pain management is required.',
      'Educate patient on immediate warning signs of Serotonin Syndrome (fever, shivering, confusion, severe muscle twitching).'
    ],
    educational_summary: 'Fluoxetine and Tramadol both boost serotonin levels while fluoxetine blocks tramadol metabolism, triggering Serotonin Syndrome and lowering seizure threshold.',
    source_reference: 'Clinical Pharmacokinetics & Psychopharmacology Review 2024'
  },
  {
    id: 'int_metformin_contrast_media',
    drug_a: 'metformin',
    drug_b: 'contrast_media',
    severity: 'Major',
    interaction_type: 'Pharmacokinetic',
    mechanism: 'Iodinated radiocontrast media can induce acute renal vasoconstriction and direct tubular epithelial damage, causing transient contrast-induced acute kidney injury (AKI). Because metformin is excreted entirely unchanged by the kidneys, AKI causes rapid metformin accumulation, precipitating severe lactic acidosis.',
    clinical_significance: 'Metformin-associated lactic acidosis (MALA) is a medical emergency with mortality rates approaching 30-50%.',
    possible_effects: [
      'Metformin accumulation and severe Lactic Acidosis',
      'Metabolic acidosis (low serum bicarbonate, elevated anion gap, high blood lactate)',
      'Hypothermia, severe hypotension, respiratory distress, and somnolence'
    ],
    monitoring: [
      'Obtain baseline eGFR prior to radiocontrast imaging procedure.',
      'Re-evaluate serum creatinine/eGFR 48 hours post-procedure before restarting metformin.'
    ],
    management_considerations: [
      'In patients with eGFR 30-60 mL/min/1.73m2 or undergoing arterial catheterization, withhold metformin at or prior to contrast administration.',
      'Do not restart metformin until 48 hours after contrast procedure, and only after kidney function has been confirmed stable.'
    ],
    educational_summary: 'Radiocontrast can cause sudden kidney injury, preventing metformin excretion and leading to dangerous Lactic Acidosis.',
    source_reference: 'American College of Radiology (ACR) Manual on Contrast Media 2023'
  },
  {
    id: 'int_ibuprofen_lisinopril',
    drug_a: 'ibuprofen',
    drug_b: 'lisinopril',
    severity: 'Moderate',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Ibuprofen inhibits renal prostaglandin synthesis (COX-1/2), constricting afferent glomerular arterioles. Lisinopril inhibits angiotensin II synthesis, dilating efferent glomerular arterioles. Together, they severely drop intraglomerular hydrostatic pressure and renal perfusion.',
    clinical_significance: 'Attenuates antihypertensive effectiveness of lisinopril while significantly increasing risk of acute kidney injury and fluid retention, especially in dehydrated or elderly individuals.',
    possible_effects: [
      'Acute Kidney Injury / decrease in eGFR',
      'Loss of blood pressure control / elevated blood pressure',
      'Fluid retention and edema exacerbation'
    ],
    monitoring: [
      'Monitor blood pressure regularly.',
      'Assess serum creatinine, eGFR, and BUN if NSAID is used for more than 3-5 days.',
      'Monitor weight and signs of peripheral edema.'
    ],
    management_considerations: [
      'Limit ibuprofen duration to the shortest effective period (under 3-5 days).',
      'Suggest non-NSAID analgesics like acetaminophen for mild to moderate pain when feasible.',
      'Ensure patient remains well hydrated.'
    ],
    educational_summary: 'Ibuprofen constricts kidney blood entry while Lisinopril opens blood exit, causing intraglomerular pressure to plummet and triggering kidney strain.',
    source_reference: 'British Journal of Clinical Pharmacology & Kidney Disease Guidelines'
  },
  {
    id: 'int_aspirin_ibuprofen',
    drug_a: 'aspirin',
    drug_b: 'ibuprofen',
    severity: 'Moderate',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Ibuprofen competitively blocks aspirin from accessing its target site (Serine 529) inside the COX-1 enzyme channel in platelets. Because ibuprofen binds reversibly while low-dose aspirin requires irreversible acetylation, ibuprofen blocks aspirin\'s cardioprotective antiplatelet activity.',
    clinical_significance: 'Interferes with the irreversible antiplatelet cardioprotection of low-dose aspirin, potentially increasing risk of myocardial infarction or thrombotic cardiovascular events.',
    possible_effects: [
      'Loss of cardioprotective antiplatelet effect of aspirin',
      'Increased risk of acute coronary events or arterial thrombosis',
      'Increased cumulative gastrointestinal irritation'
    ],
    monitoring: [
      'Monitor for cardiac ischemic symptoms if patient is taking aspirin for secondary cardiovascular prevention.'
    ],
    management_considerations: [
      'If both drugs are required, administer immediate-release aspirin AT LEAST 30 minutes before ibuprofen, or wait AT LEAST 8 hours after ibuprofen before taking aspirin.',
      'Consider switching from ibuprofen to acetaminophen for routine analgesia.'
    ],
    educational_summary: 'Ibuprofen physically blocks Aspirin from binding inside platelet COX-1 enzymes, neutralizing aspirin\'s cardioprotective antiplatelet shield.',
    source_reference: 'FDA Drug Safety Communication: Interaction between Ibuprofen and Low-Dose Aspirin'
  },
  {
    id: 'int_digoxin_amiodarone',
    drug_a: 'digoxin',
    drug_b: 'amiodarone',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Amiodarone potently inhibits P-glycoprotein (P-gp) efflux transporters in renal tubules and gut mucosa, as well as hepatic CYP3A4. Digoxin clearance is reduced by approximately 50%, doubling plasma digoxin concentrations within 2 to 7 days.',
    clinical_significance: 'Narrows digoxin\'s already tight therapeutic window, precipitating life-threatening digoxin toxicity including severe bradycardia, AV nodal blockade, or fatal ventricular dysrhythmias.',
    possible_effects: [
      'Digoxin Toxicity (Serum digoxin > 2.0 ng/mL)',
      'Severe bradycardia, AV block, ventricular ectopic beats',
      'Gastrointestinal intolerance (nausea, severe vomiting, anorexia)',
      'Visual alterations (green-yellow color vision halos, blurred vision)'
    ],
    monitoring: [
      'Measure serum digoxin concentration before starting amiodarone and recheck at 3, 7, and 14 days.',
      'Perform baseline and periodic ECGs.',
      'Monitor serum potassium and magnesium levels.'
    ],
    management_considerations: [
      'Upon initiating amiodarone, REDUCE DIGOXIN DOSE BY 30% TO 50% immediately.',
      'Re-evaluate clinical need for digoxin when initiating amiodarone.',
      'Instruct patient to report visual halos, nausea, or slow pulse immediately.'
    ],
    educational_summary: 'Amiodarone blocks P-glycoprotein efflux pumps that clear Digoxin, causing digoxin levels in the blood to double and leading to toxic cardiac arrhythmias.',
    source_reference: 'Circulation Journal & Lexicomp Drug Information Reference'
  },
  {
    id: 'int_ciprofloxacin_tizanidine',
    drug_a: 'ciprofloxacin',
    drug_b: 'tizanidine',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Ciprofloxacin is a potent, selective inhibitor of CYP1A2. Tizanidine undergoes extensive (>95%) first-pass hepatic metabolism by CYP1A2. Ciprofloxacin inhibits tizanidine clearance, increasing tizanidine peak plasma concentration (Cmax) by 7-fold and total area under the curve (AUC) by 10-fold.',
    clinical_significance: 'Triggers dramatic enhancement of tizanidine\'s alpha-2 adrenergic agonist activity, producing profound hypotension, bradycardia, severe somnolence, and psychomotor impairment.',
    possible_effects: [
      'Profound, life-threatening hypotension and syncope',
      'Severe bradycardia',
      'Extreme sedation, somnolence, coma, or respiratory depression'
    ],
    monitoring: [
      'Monitor blood pressure and heart rate closely if accidental exposure occurs.'
    ],
    management_considerations: [
      'Concomitant administration is STRICTLY CONTRAINDICATED by FDA product labeling.',
      'If antibiotic therapy is needed for a patient taking tizanidine, select an alternative fluoroquinolone (e.g., levofloxacin) or non-quinolone antibiotic that does not inhibit CYP1A2.'
    ],
    educational_summary: 'Ciprofloxacin shuts down CYP1A2, causing Tizanidine levels to jump 10-fold and causing severe hypotension and profound sedation.',
    source_reference: 'FDA Black Box Warning & Zanaflex Prescribing Information'
  },
  {
    id: 'int_omeprazole_clopidogrel',
    drug_a: 'omeprazole',
    drug_b: 'clopidogrel',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Clopidogrel is an inactive prodrug requiring bioactivation via hepatic CYP2C19 into its active thiol metabolite. Omeprazole competitively inhibits CYP2C19, significantly decreasing conversion to active clopidogrel metabolite and lowering platelet inhibition by ~40%.',
    clinical_significance: 'Reduces clopidogrel\'s antiplatelet efficacy, increasing the risk of adverse cardiovascular events, stent thrombosis, recurrent myocardial infarction, or ischemic stroke.',
    possible_effects: [
      'Decreased antiplatelet activity of clopidogrel',
      'Increased risk of acute coronary stent thrombosis',
      'Higher rate of recurrent myocardial infarction or ischemic stroke'
    ],
    monitoring: [
      'Assess platelet aggregation or CYP2C19 genotype if clinically indicated.',
      'Monitor for cardiac ischemic symptoms.'
    ],
    management_considerations: [
      'Avoid omeprazole or esomeprazole in patients taking clopidogrel.',
      'If gastroprotection is necessary, switch to an antacid/PPI with minimal CYP2C19 inhibitory potency, such as Pantoprazole, or an H2-blocker like Famotidine.'
    ],
    educational_summary: 'Omeprazole blocks the CYP2C19 enzyme needed to activate Clopidogrel, leaving platelets uninhibited and raising stent thrombosis risk.',
    source_reference: 'FDA Safety Alert: Clopidogrel and Omeprazole interaction & ACC/AHA Guidelines'
  },
  {
    id: 'int_sildenafil_nitroglycerin',
    drug_a: 'sildenafil',
    drug_b: 'nitroglycerin',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Nitroglycerin donates nitric oxide (NO), stimulating guanylyl cyclase to produce cGMP. Sildenafil inhibits PDE5, preventing the enzymatic degradation of cGMP. Concomitant use leads to overwhelming accumulation of cGMP in vascular smooth muscle.',
    clinical_significance: 'Unchecked cGMP accumulation causes catastrophic systemic vasodilation, precipitating profound, refractory hypotension, coronary hypoperfusion, and potentially fatal myocardial infarction or cardiac arrest.',
    possible_effects: [
      'Severe, precipitous, and refractory systemic hypotension',
      'Coronary hypoperfusion and acute myocardial infarction',
      'Syncope, dizziness, cardiac arrest'
    ],
    monitoring: [
      'Continuous blood pressure and electrocardiographic monitoring in emergency settings.'
    ],
    management_considerations: [
      'ABSOLUTE CONTRAINDICATION. Never administer nitrates within 24 hours of sildenafil (or 48 hours of tadalafil).',
      'If acute chest pain occurs in a patient who took sildenafil within 24 hours, nitrates must be withheld; use alternative anti-ischemic agents (e.g., beta-blockers, opioids).'
    ],
    educational_summary: 'Nitroglycerin creates cGMP while Sildenafil prevents its breakdown, causing massive cGMP accumulation and fatal drops in blood pressure.',
    source_reference: 'AHA/ACC Angina Guidelines & FDA Black Box Contraindication'
  },
  {
    id: 'int_apixaban_st_johns_wort',
    drug_a: 'apixaban',
    drug_b: 'st_johns_wort',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'St. John\'s Wort potently induces hepatic CYP3A4 and intestinal P-glycoprotein (P-gp) transporters via PXR activation. Apixaban is a dual substrate of CYP3A4 and P-gp. Induction speeds apixaban elimination, reducing drug concentration by ~50%.',
    clinical_significance: 'Sub-therapeutic apixaban concentrations fail to adequately inhibit Factor Xa, exposing patients to dangerous systemic thromboembolism, stroke, or deep vein thrombosis.',
    possible_effects: [
      'Marked reduction in apixaban anticoagulant efficacy',
      'Increased risk of ischemic stroke in atrial fibrillation',
      'Recurrent deep vein thrombosis (DVT) or pulmonary embolism (PE)'
    ],
    monitoring: [
      'Inquire about over-the-counter herbal supplement use.',
      'Consider Anti-Factor Xa assay if efficacy failure is suspected.'
    ],
    management_considerations: [
      'Avoid concomitant use of St. John\'s Wort with apixaban or other direct oral anticoagulants (DOACs).',
      'Counsel patient to discontinue St. John\'s Wort and report any neurological or thromboembolic symptoms.'
    ],
    educational_summary: 'St. John\'s Wort accelerates apixaban clearance by activating P-gp and CYP3A4, leaving the patient unprotected against blood clots and stroke.',
    source_reference: 'EHRA Practical Guide on DOAC Use & Clinical Pharmacokinetics'
  },
  {
    id: 'int_apixaban_ketoconazole',
    drug_a: 'apixaban',
    drug_b: 'ketoconazole',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Ketoconazole is a potent dual inhibitor of CYP3A4 and P-glycoprotein. Because apixaban elimination relies heavily on CYP3A4 metabolism and P-gp excretion, ketoconazole doubles apixaban exposure (AUC increase ~2-fold).',
    clinical_significance: 'Excessive anticoagulation levels substantially increase the risk of spontaneous, life-threatening major bleeding events.',
    possible_effects: [
      'Doubling of apixaban blood concentration',
      'High risk of major gastrointestinal, intracranial, or retroperitoneal bleeding',
      'Prolonged anti-Factor Xa activity'
    ],
    monitoring: [
      'Monitor for signs of bleeding (epistaxis, hematuria, melena, severe bruising).',
      'Check baseline hemoglobin and platelet count.'
    ],
    management_considerations: [
      'For patients taking apixaban 5mg or 10mg twice daily, reduce apixaban dose by 50% when co-administered with potent dual CYP3A4/P-gp inhibitors.',
      'If patient is already on apixaban 2.5mg twice daily, avoid co-administration of ketoconazole altogether.'
    ],
    educational_summary: 'Ketoconazole blocks both CYP3A4 and P-gp clearance pathways, doubling apixaban blood levels and greatly elevating bleeding risks.',
    source_reference: 'Eliquis (Apixaban) Prescribing Information & FDA Drug Interactions Database'
  },
  {
    id: 'int_clarithromycin_digoxin',
    drug_a: 'clarithromycin',
    drug_b: 'digoxin',
    severity: 'Major',
    interaction_type: 'Pharmacokinetic',
    mechanism: 'Clarithromycin inhibits intestinal P-glycoprotein (P-gp) efflux pumps and eradicates Eubacterium lentum (intestinal flora that inactivates digoxin), resulting in dramatically enhanced oral bioavailability and decreased renal excretion of digoxin.',
    clinical_significance: 'Spikes serum digoxin levels into toxic ranges, leading to life-threatening cardiac arrhythmias and severe digitalis toxicity.',
    possible_effects: [
      'Digoxin toxicity (nausea, vomiting, confusion, green/yellow halo vision)',
      'Bradycardia, AV block, ventricular arrhythmias'
    ],
    monitoring: [
      'Monitor serum digoxin levels closely during macrolide therapy.',
      'Monitor heart rate and rhythm via ECG.'
    ],
    management_considerations: [
      'Reduce digoxin dose or switch to a non-P-gp inhibiting antibiotic like Azithromycin.'
    ],
    educational_summary: 'Clarithromycin disables intestinal P-gp pumps and gut bacteria that clear Digoxin, causing digoxin toxicity.',
    source_reference: 'Stockley\'s Drug Interactions & Antimicrobial Therapy Manual'
  },
  {
    id: 'int_st_johns_wort_fluoxetine',
    drug_a: 'st_johns_wort',
    drug_b: 'fluoxetine',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Additive serotonergic action. St. John\'s Wort and fluoxetine both inhibit presynaptic serotonin reuptake, resulting in excessive accumulation of serotonin at central 5-HT receptors.',
    clinical_significance: 'High risk of precipitating Serotonin Syndrome, a life-threatening toxidrome characterized by autonomic volatility and neuromuscular hyperactivity.',
    possible_effects: [
      'Serotonin Syndrome (hyperthermia, agitation, tremor, clonus, diarrhea)',
      'Severe mental status alterations'
    ],
    monitoring: [
      'Assess for neuromuscular irritability, fever, and confusion.'
    ],
    management_considerations: [
      'Avoid concurrent use of herbal St. John\'s Wort with any prescription SSRI.',
      'Discontinue St. John\'s Wort prior to starting SSRI therapy.'
    ],
    educational_summary: 'Combining St. John\'s Wort and Fluoxetine floods brain synapses with serotonin, causing Serotonin Syndrome.',
    source_reference: 'Journal of Clinical Psychopharmacology'
  },
  {
    id: 'int_spironolactone_ibuprofen',
    drug_a: 'spironolactone',
    drug_b: 'ibuprofen',
    severity: 'Moderate',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Ibuprofen inhibits renal prostaglandin synthesis, reducing renal blood flow and antagonizing spironolactone\'s diuretic and antihypertensive response, while additively elevating serum potassium.',
    clinical_significance: 'Decreases diuretic efficacy, causes fluid accumulation, and increases risk of hyperkalemia.',
    possible_effects: [
      'Hyperkalemia',
      'Reduced diuretic and antihypertensive efficacy',
      'Renal function decline'
    ],
    monitoring: [
      'Monitor serum potassium, blood pressure, and renal function.'
    ],
    management_considerations: [
      'Avoid prolonged NSAID use in patients taking potassium-sparing diuretics.'
    ],
    educational_summary: 'Ibuprofen antagonizes Spironolactone\'s diuretic action while exacerbating hyperkalemia risks.',
    source_reference: 'Renal Pharmacotherapy Review'
  },
  {
    id: 'int_sertraline_tramadol',
    drug_a: 'sertraline',
    drug_b: 'tramadol',
    severity: 'Major',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'Synergistic elevation of synaptic serotonin concentrations. Both sertraline and tramadol inhibit serotonin reuptake in the central nervous system.',
    clinical_significance: 'High risk of Serotonin Syndrome and increased risk of seizures.',
    possible_effects: [
      'Serotonin Syndrome',
      'Lowered seizure threshold',
      'CNS excitability'
    ],
    monitoring: [
      'Monitor for agitation, hyperreflexia, fever, or clonus.'
    ],
    management_considerations: [
      'Use alternative non-serotonergic analgesics or monitor closely if co-administration is unavoidable.'
    ],
    educational_summary: 'Sertraline and Tramadol together produce dangerous serotonin buildup and lower seizure thresholds.',
    source_reference: 'FDA Safety Announcement & Psychopharmacology Practice Guidelines'
  },
  {
    id: 'int_warfarin_amiodarone',
    drug_a: 'warfarin',
    drug_b: 'amiodarone',
    severity: 'Major',
    interaction_type: 'Enzyme-Based',
    mechanism: 'Amiodarone potently inhibits CYP2C9 and CYP3A4, the main metabolic pathways for S-warfarin and R-warfarin enantiomers. Warfarin clearance decreases by 30-50%.',
    clinical_significance: 'Inhibition causes dramatic INR prolongation and elevated risk of serious bleeding complications.',
    possible_effects: [
      'Severe INR elevation (INR > 5.0)',
      'Major hemorrhage (GI, intracranial, surgical site)'
    ],
    monitoring: [
      'Monitor INR baseline, at 3 days, 1 week, and weekly during amiodarone initiation.'
    ],
    management_considerations: [
      'Reduce warfarin dose by 33% to 50% upon starting amiodarone.',
      'Adjust warfarin based on frequent INR monitoring.'
    ],
    educational_summary: 'Amiodarone inhibits CYP2C9, slowing Warfarin breakdown and causing dramatic INR spikes and severe bleeding.',
    source_reference: 'Chest Guidelines & Anticoagulation Forum Practice Guidance'
  },
  {
    id: 'int_sertraline_aspirin',
    drug_a: 'sertraline',
    drug_b: 'aspirin',
    severity: 'Moderate',
    interaction_type: 'Pharmacodynamic',
    mechanism: 'SSRIs deplete platelet serotonin storage (necessary for platelet aggregation), while aspirin irreversibly inhibits COX-1 thromboxane synthesis. Combined use synergistically impairs hemostasis in the gastric mucosa.',
    clinical_significance: 'Increases risk of upper gastrointestinal ulceration and hemorrhage by 3 to 4-fold.',
    possible_effects: [
      'Increased risk of upper GI bleeding',
      'Easy bruising and prolonged bleeding times'
    ],
    monitoring: [
      'Assess for signs of GI bleeding (melena, hematemesis, weakness).'
    ],
    management_considerations: [
      'Consider prescribing a PPI (e.g., pantoprazole) for gastroprotection in patients taking SSRIs with antiplatelet therapy.'
    ],
    educational_summary: 'Sertraline depletes platelet serotonin while Aspirin blocks thromboxane, multiplying upper GI bleeding risk.',
    source_reference: 'Gastroenterology Journal & American Journal of Health-System Pharmacy'
  }
];
