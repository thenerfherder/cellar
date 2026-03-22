export const COLORS = [
  '#E63946', '#F77F00', '#FCBF49', '#06A77D', '#118AB2', '#073B4C',
  '#8338EC', '#FF006E', '#FB5607', '#FFBE0B', '#8AC926', '#1982C4',
  '#6A4C93', '#D62828', '#F94144', '#FF9F1C', '#2EC4B6', '#9D4EDD'
];

export const CONFIG = {
  OTHER_THRESHOLD: 0.05,
  CURRENT_YEAR: new Date().getFullYear(),
  MIN_SEGMENT_DISPLAY: 3,
  SPECIAL_BOTTLE_THRESHOLD: 70.00
};

export const DRINKABILITY_STATUS = {
  FINAL_YEAR: 'Final Year',
  READY_NOW: 'Ready Now',
  AGE_1_5: 'Age 1-5 Years',
  AGE_5_PLUS: 'Age 5+ Years'
};

export const VARIETALS = {
  'Red': [
    'Barbera', 'Cabernet Franc', 'Cabernet Sauvignon', 'Carmenère', 'Gamay', 'Grenache',
    'Malbec', 'Merlot', 'Mourvèdre', 'Nebbiolo', 'Petit Verdot', 'Petite Sirah',
    'Pinot Noir', 'Sangiovese', 'Syrah', 'Tempranillo', 'Zinfandel',
  ],
  'White': [
    'Albariño', 'Chablis', 'Chardonnay', 'Chenin Blanc', 'Gewürztraminer', 'Grüner Veltliner',
    'Marsanne', 'Muscat', 'Pinot Gris', 'Pouilly-Fuissé', 'Riesling', 'Roussanne',
    'Sauvignon Blanc', 'Viognier',
  ],
  'Rosé': ['Rosé'],
  'Blends': [
    'Bordeaux Blend', 'Cabernet Sauvignon Blend', 'Côtes du Rhône Red',
    'Grenache Blend', 'GSM Blend', 'Meritage', 'Red Blend', 'Rhône Blend', 'White Blend',
  ],
  'Sparkling': ['Champagne Blend', 'Crémant', 'Prosecco', 'Sparkling Wine'],
  'Dessert & Fortified': ['Late Harvest Riesling', 'Port', 'Sauternes', 'Sherry'],
};

export const PAIRING_KEYS = {
  // Category keys
  RED_MEAT: 'red-meat',
  POULTRY: 'poultry',
  PORK: 'pork',
  FISH: 'fish',
  SEAFOOD: 'seafood',
  PASTA: 'pasta',
  CHEESE: 'cheese',
  VEGETABLES: 'vegetables',
  // Sub-category keys — Red Meat
  STEAK: 'steak',
  LAMB: 'lamb',
  RIBS: 'ribs',
  GAME: 'game',
  CHORIZO: 'chorizo',
  // Sub-category keys — Poultry
  CHICKEN: 'chicken',
  DUCK: 'duck',
  TURKEY: 'turkey',
  // Sub-category keys — Pork
  PORK_CHOPS: 'pork-chops',
  PORK_BELLY: 'pork-belly',
  HAM: 'ham',
  // Sub-category keys — Fish
  SALMON: 'salmon',
  TROUT: 'trout',
  WHITE_FISH: 'white-fish',
  // Sub-category keys — Seafood
  OYSTERS: 'oysters',
  LOBSTER: 'lobster',
  SHRIMP: 'shrimp',
  SUSHI: 'sushi',
  CAVIAR: 'caviar',
  // Sub-category keys — Pasta & Pizza
  PASTA_SUB: 'pasta-sub',
  PIZZA: 'pizza',
  RISOTTO: 'risotto',
  // Sub-category keys — Cheese
  CHEESE_SUB: 'cheese-sub',
  CHARCUTERIE: 'charcuterie',
  // Sub-category keys — Vegetables
  SALAD: 'salad',
  MUSHROOMS: 'mushrooms',
  ROASTED: 'roasted',
  MEDITERRANEAN: 'mediterranean',
};

export const WINE_REGIONS = {
  'Argentina': ['Luján de Cuyo', 'Mendoza', 'Patagonia', 'Salta', 'San Juan'],
  'Australia': ['Barossa Valley', 'Clare Valley', 'Coonawarra', 'Eden Valley', 'Hunter Valley', 'Margaret River', 'McLaren Vale', 'Yarra Valley'],
  'Austria': ['Burgenland', 'Kamptal', 'Kremstal', 'Styria', 'Wachau'],
  'Chile': ['Aconcagua Valley', 'Bío Bío', 'Casablanca Valley', 'Colchagua Valley', 'Elqui Valley', 'Maipo Valley'],
  'France': ['Alsace', 'Beaujolais', 'Bordeaux', 'Burgundy', 'Champagne', 'Corsica', 'Languedoc-Roussillon', 'Loire Valley', 'Provence', 'Rhône Valley'],
  'Germany': ['Baden', 'Mosel', 'Nahe', 'Pfalz', 'Rheingau', 'Rheinhessen'],
  'Italy': ['Campania', 'Friuli-Venezia Giulia', 'Piedmont', 'Sardinia', 'Sicily', 'Tuscany', 'Umbria', 'Veneto'],
  'New Zealand': ['Central Otago', "Hawke's Bay", 'Marlborough', 'Martinborough', 'Nelson'],
  'Portugal': ['Alentejo', 'Bairrada', 'Dão', 'Douro', 'Vinho Verde'],
  'South Africa': ['Franschhoek', 'Paarl', 'Stellenbosch', 'Swartland', 'Walker Bay'],
  'Spain': ['Cava', 'Galicia', 'Jerez', 'Navarra', 'Priorat', 'Ribera del Duero', 'Rioja'],
  'USA': ['California', 'New York', 'Oregon', 'Virginia', 'Washington'],
};
