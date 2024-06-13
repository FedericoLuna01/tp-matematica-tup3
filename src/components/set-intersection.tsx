// @ts-nocheck

// Función para calcular la intersección de múltiples arrays
const intersect = (arrays) => {
  if (arrays.length === 0) return [];
  return arrays.reduce((acc, curr) => acc.filter(item => curr.includes(item)));
};

// Función para generar todas las combinaciones posibles de los conjuntos
const generateCombinations = (arrays) => {
  const combinations = [];

  const generate = (prefix, arrays, start) => {
    for (let i = start; i < arrays.length; i++) {
      const newPrefix = [...prefix, arrays[i]];
      combinations.push(newPrefix);
      generate(newPrefix, arrays, i + 1);
    }
  };

  generate([], arrays, 0);

  return combinations;
};

const isSubset = (subset, set) => {
  return subset.every(val => set.includes(val));
};

export const SetIntersection = ({ data }) => {
  // Mapeo de valores a conjuntos
  const sets = data.map(item => ({ label: item.label, values: item.values }));

  // Generación de todas las combinaciones posibles de los conjuntos
  const combinations = generateCombinations(sets);

  // Array para almacenar las combinaciones ya cubiertas
  const coveredCombinations = [];

  return (
    <div>
      <h3>Datos:</h3>
      {data.map((item, index) => (
        <div key={index}>
          <strong>{item.label}:</strong> {item.values.join(', ')}
        </div>
      ))}
      <h3>Intersecciones:</h3>
      {combinations.map((combination, index) => {
        const intersection = intersect(combination.map(item => item.values));
        const labels = combination.map(item => item.label).join(' ∩ ');

        if (intersection.length > 0 && !coveredCombinations.some(covComb => isSubset(combination.map(item => item.label), covComb.map(item => item.label)))) {
          coveredCombinations.push(combination);
          return (
            <div key={index}>
              <strong>{labels}:</strong> {intersection.join(', ')}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};