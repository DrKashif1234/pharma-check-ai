export type SeverityLevel = 'Major' | 'Moderate' | 'Minor' | 'No significant interaction identified';

export type InteractionCategory = 'Pharmacokinetic' | 'Pharmacodynamic' | 'Enzyme-Based' | 'Other';

export interface Drug {
  id: string;
  generic_name: string;
  brand_names: string[];
  drug_class: string;
  pharmacological_class: string;
  therapeutic_class: string;
  mechanism: string;
  common_uses: string[];
  adverse_effects: string[];
  warnings: string[];
}

export interface Interaction {
  id: string;
  drug_a: string; // drug ID or generic name lowercased
  drug_b: string; // drug ID or generic name lowercased
  severity: SeverityLevel;
  interaction_type: InteractionCategory;
  mechanism: string;
  clinical_significance: string;
  possible_effects: string[];
  monitoring: string[];
  management_considerations: string[];
  educational_summary: string;
  source_reference: string;
}

export interface AIExplanation {
  simpleExplanation: string;
  whyItHappens: string;
  clinicalImportance: string;
  hypotheticalExample: string;
  keyPoint: string;
}

export interface HistoryItem {
  id: string;
  drugs: string[]; // List of drug generic names
  severity: SeverityLevel;
  date: string;
  hasInteraction: boolean;
}

export interface FavoriteItem {
  id: string;
  drugs: string[]; // List of drug generic names
  severity: SeverityLevel;
  addedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  drugPair?: string;
}

export interface PairMatchResult {
  drug1: Drug | { generic_name: string };
  drug2: Drug | { generic_name: string };
  interaction?: Interaction;
}

export interface MultiDrugCheckResult {
  selectedDrugs: (Drug | { generic_name: string })[];
  pairs: PairMatchResult[];
  overallSeverity: SeverityLevel;
  totalInteractionsCount: number;
}

export type ActiveTab = 'home' | 'checker' | 'database' | 'favorites' | 'history' | 'study';
