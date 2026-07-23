import { Drug, Interaction, SeverityLevel, PairMatchResult, MultiDrugCheckResult } from '../types';
import { DRUGS_DATA } from '../data/drugs';
import { INTERACTIONS_DATA } from '../data/interactions';

/**
 * Searches drugs dataset by query (generic name, brand name, drug class, or therapeutic class)
 */
export function searchDrugs(query: string): Drug[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return DRUGS_DATA.filter(drug => {
    const matchGeneric = drug.generic_name.toLowerCase().includes(q);
    const matchBrand = drug.brand_names.some(b => b.toLowerCase().includes(q));
    const matchClass = drug.drug_class.toLowerCase().includes(q) ||
                       drug.pharmacological_class.toLowerCase().includes(q) ||
                       drug.therapeutic_class.toLowerCase().includes(q);
    return matchGeneric || matchBrand || matchClass;
  });
}

/**
 * Find a drug by ID or generic/brand name
 */
export function findDrugByNameOrId(nameOrId: string): Drug | undefined {
  const target = nameOrId.trim().toLowerCase();
  return DRUGS_DATA.find(d => 
    d.id.toLowerCase() === target || 
    d.generic_name.toLowerCase() === target ||
    d.brand_names.some(b => b.toLowerCase() === target)
  );
}

/**
 * Normalizes drug name or ID to standard drug ID if found, or lowercase string
 */
function normalizeDrugKey(identifier: string): string {
  const drug = findDrugByNameOrId(identifier);
  return drug ? drug.id.toLowerCase() : identifier.trim().toLowerCase();
}

/**
 * Find exact interaction pair between Drug 1 and Drug 2 (order-independent)
 */
export function findPairInteraction(drug1NameOrId: string, drug2NameOrId: string): Interaction | undefined {
  const key1 = normalizeDrugKey(drug1NameOrId);
  const key2 = normalizeDrugKey(drug2NameOrId);

  return INTERACTIONS_DATA.find(item => {
    const a = item.drug_a.toLowerCase();
    const b = item.drug_b.toLowerCase();
    return (a === key1 && b === key2) || (a === key2 && b === key1);
  });
}



/**
 * Evaluates all pairwise combinations for 2, 3, 4 or more drugs
 */
export function checkMultiDrugInteractions(drugNamesOrIds: string[]): MultiDrugCheckResult {
  const cleanList = drugNamesOrIds.map(d => d.trim()).filter(Boolean);
  
  const resolvedDrugs: (Drug | { generic_name: string })[] = cleanList.map(item => {
    const found = findDrugByNameOrId(item);
    return found || { generic_name: item };
  });

  const pairs: PairMatchResult[] = [];
  let highestSeverity: SeverityLevel = 'No significant interaction identified';
  let foundCount = 0;

  const severityRank: Record<SeverityLevel, number> = {
    'Major': 3,
    'Moderate': 2,
    'Minor': 1,
    'No significant interaction identified': 0
  };

  for (let i = 0; i < resolvedDrugs.length; i++) {
    for (let j = i + 1; j < resolvedDrugs.length; j++) {
      const d1 = resolvedDrugs[i];
      const d2 = resolvedDrugs[j];

      const name1 = 'id' in d1 ? d1.id : d1.generic_name;
      const name2 = 'id' in d2 ? d2.id : d2.generic_name;

      const interaction = findPairInteraction(name1, name2);

      if (interaction) {
        foundCount++;
        if (severityRank[interaction.severity] > severityRank[highestSeverity]) {
          highestSeverity = interaction.severity;
        }
      }

      pairs.push({
        drug1: d1,
        drug2: d2,
        interaction
      });
    }
  }

  return {
    selectedDrugs: resolvedDrugs,
    pairs,
    overallSeverity: highestSeverity,
    totalInteractionsCount: foundCount
  };
}
