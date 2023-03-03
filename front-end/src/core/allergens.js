export const allergens_list = [
  "poisson",
  "viande",
  "fromage",
  "arachide",
  "lait",
  "oeuf",
  "crustacés",
  "soja",
  "coques",
  "céleri",
  "moutarde",
  "sésame",
  "lupin",
  "anhydride",
  "céréales"
];

export const allergens_selection = Array(15).fill(false);

export function tradAllergens(allergens) {
  var str = "[";
  var idx = 1;
  allergens.map((item) => {
    if (item) {
      str += `${idx},`
    }
    idx += 1;
  });
  if (str.endsWith(",")) {
    str = str.substring(0, str.length - 1);
  }
  str += ']';
  return str;
}