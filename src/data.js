import { PAIRING_KEYS } from './constants';

const DEFAULT_PAIRINGS = ['Grilled meats', 'Roasted vegetables', 'Aged cheeses', 'Pasta dishes', 'Charcuterie'];
export const DEFAULT_TASTING_NOTES = 'Complex and well-balanced with rich fruit flavors, subtle oak influence, and a smooth finish.';

export const WINE_PAIRINGS = {
  // Reds
  'Barbera': ['Pizza', 'Pasta bolognese', 'Grilled chicken', 'Charcuterie', 'Mushroom dishes'],
  'Bordeaux Blend': ['Grilled steak', 'Lamb chops', 'Aged cheeses', 'Beef bourguignon', 'Roasted duck'],
  'Cabernet Franc': ['Grilled lamb chops', 'Roasted duck', 'Mushroom risotto', 'Soft cheeses', 'Herb-roasted chicken'],
  'Cabernet Sauvignon': ['Ribeye steak', 'Braised short ribs', 'Blue cheese', 'Grilled lamb', 'Venison'],
  'Cabernet Sauvignon Blend': ['Grilled meats', 'BBQ ribs', 'Beef stew', 'Hard cheeses', 'Roasted vegetables'],
  'Carmenère': ['Grilled beef', 'Spiced lamb', 'BBQ ribs', 'Hard cheeses', 'Roasted vegetables'],
  'Gamay': ['Charcuterie', 'Roasted chicken', 'Salmon', 'Mushroom tart', 'Light pasta dishes'],
  'Grenache': ['Grilled lamb', 'Roasted chicken', 'Charcuterie', 'Provençal roasted vegetables', 'Aged cheeses'],
  'Grenache Blend': ['Grilled lamb', 'Cassoulet', 'Ratatouille', 'Herbed roast chicken', 'Mediterranean dishes'],
  'GSM Blend': ['Grilled lamb', 'BBQ ribs', 'Braised beef', 'Herb-roasted chicken', 'Aged cheeses'],
  'Malbec': ['Grilled steak', 'Empanadas', 'BBQ ribs', 'Blue cheese', 'Spicy tacos'],
  'Meritage': ['Grilled steak', 'Lamb chops', 'Aged cheeses', 'Beef bourguignon', 'Roasted duck'],
  'Merlot': ['Roasted chicken', 'Pork tenderloin', 'Mushroom risotto', 'Grilled salmon', 'Pasta with tomato sauce'],
  'Mourvèdre': ['Grilled lamb', 'Wild game', 'Braised beef short ribs', 'Aged cheeses', 'Smoked meats'],
  'Nebbiolo': ['Braised beef', 'Truffle risotto', 'Lamb chops', 'Aged Parmesan', 'Osso buco'],
  'Petit Verdot': ['Grilled steak', 'Venison', 'BBQ ribs', 'Blue cheese', 'Slow-cooked beef'],
  'Petite Sirah': ['Grilled brisket', 'BBQ ribs', 'Braised short ribs', 'Blue cheese', 'Venison stew'],
  'Pinot Noir': ['Duck breast', 'Grilled salmon', 'Mushroom dishes', 'Roasted turkey', 'Soft cheeses'],
  'Red Blend': ['Grilled meats', 'Hearty stews', 'BBQ', 'Aged cheeses', 'Roasted vegetables'],
  'Rhône Blend': ['Grilled lamb', 'Herb-roasted chicken', 'Ratatouille', 'Aged cheeses', 'Grilled meats'],
  'Sangiovese': ['Pizza', 'Pasta bolognese', 'Osso buco', 'Aged Parmesan', 'Grilled vegetables'],
  'Syrah': ['Grilled lamb', 'BBQ brisket', 'Wild game', 'Spicy sausages', 'Smoked meats'],
  'Tempranillo': ['Paella', 'Grilled chorizo', 'Manchego cheese', 'Lamb skewers', 'Roasted peppers'],
  'Côtes du Rhône Red': ['Grilled meats', 'Ratatouille', 'Herb-crusted lamb', 'Goat cheese', 'BBQ chicken'],
  'Zinfandel': ['BBQ ribs', 'Grilled sausages', 'Pizza', 'Lamb chops', 'Spicy dishes'],

  // Whites
  'Albariño': ['Grilled shrimp', 'Oysters', 'Grilled fish', 'Seafood paella', 'Ceviche'],
  'Chablis': ['Oysters', 'Grilled fish', 'Shrimp', 'Soft cheeses', 'Sushi'],
  'Chardonnay': ['Lobster', 'Chicken piccata', 'Grilled fish', 'Creamy pasta', 'Brie cheese'],
  'Chenin Blanc': ['Grilled chicken', 'Lobster', 'Goat cheese', 'Light pasta', 'Roasted vegetables'],
  'Gewürztraminer': ['Spiced chicken', 'Soft cheeses', 'Smoked salmon', 'Roasted duck', 'Charcuterie'],
  'Grüner Veltliner': ['Grilled fish', 'Wiener schnitzel', 'Asparagus salad', 'Soft cheeses', 'Light pasta'],
  'Marsanne': ['Grilled fish', 'Lobster', 'Creamy pasta', 'Soft cheeses', 'Roasted chicken'],
  'Muscat': ['Soft cheeses', 'Charcuterie', 'Spiced chicken', 'Smoked salmon', 'Salads'],
  'Pinot Gris': ['Grilled salmon', 'Roasted chicken', 'Soft cheeses', 'Creamy pasta', 'Mushroom dishes'],
  'Pouilly-Fuissé': ['Lobster', 'Grilled fish', 'Chicken piccata', 'Brie cheese', 'Creamy pasta'],
  'Riesling': ['Grilled trout', 'Spiced pork', 'Soft cheeses', 'Roasted duck', 'Smoked salmon'],
  'Rosé': ['Grilled shrimp', 'Salads', 'Mediterranean dishes', 'Goat cheese', 'Light pasta'],
  'Roussanne': ['Roasted chicken', 'Lobster bisque', 'Mushroom risotto', 'Aged cheeses', 'Creamy seafood'],
  'Sauvignon Blanc': ['Grilled fish', 'Oysters', 'Goat cheese', 'Grilled shrimp', 'Salads'],
  'Viognier': ['Lobster', 'Roasted chicken', 'Spiced lamb', 'Soft cheeses', 'Grilled fish'],
  'White Blend': ['Grilled fish', 'Roasted chicken', 'Soft cheeses', 'Seafood pasta', 'Salads'],

  // Sparkling
  'Champagne Blend': ['Oysters', 'Caviar', 'Crispy fried appetizers', 'Soft cheeses', 'Sushi'],
  'Crémant': ['Oysters', 'Smoked salmon', 'Soft cheeses', 'Fried oysters', 'Charcuterie'],
  'Prosecco': ['Charcuterie', 'Grilled shrimp', 'Soft cheeses', 'Crispy fried appetizers', 'Light pasta'],
  'Sparkling Wine': ['Oysters', 'Grilled shrimp', 'Charcuterie', 'Crispy fried appetizers', 'Soft cheeses'],

  // Dessert & Fortified
  'Late Harvest Riesling': ['Foie gras', 'Fruit desserts', 'Blue cheese', 'Fruit tart', 'Soft cheeses'],
  'Port': ['Blue cheese', 'Dark chocolate', 'Aged cheeses', 'Walnuts', 'Dried fruits'],
  'Sauternes': ['Foie gras', 'Blue cheese', 'Fruit desserts', 'Lobster', 'Soft cheeses'],
  'Sherry': ['Tapas', 'Charcuterie', 'Almonds', 'Aged cheeses', 'Seafood'],
};

export const TASTING_NOTES = {
  // Reds
  'Barbera': 'Bright and juicy with high acidity and flavors of cherry, blackberry, and plum. Low tannins with notes of licorice and a clean, food-friendly finish.',
  'Bordeaux Blend': 'Rich and structured with notes of blackcurrant, cedar, tobacco, and dark chocolate. Well-integrated tannins with a long, elegant finish.',
  'Cabernet Franc': 'Medium-bodied with aromas of red bell pepper, violet, and black cherry. Silky tannins with herbaceous notes, tobacco, and a fresh, elegant finish.',
  'Cabernet Sauvignon': 'Full-bodied with intense flavors of blackcurrant, blackberry, and cedar. Firm tannins with notes of tobacco, leather, and dark chocolate.',
  'Cabernet Sauvignon Blend': 'Bold and complex with dark fruit flavors, subtle oak influence, and firm structure. Notes of cassis, vanilla, and spice.',
  'Carmenère': 'Medium to full-bodied with flavors of blackberry, plum, and green pepper. Smooth tannins with notes of chocolate, tobacco, and a hint of spice.',
  'Gamay': 'Light and fruity with flavors of cherry, strawberry, and raspberry. Soft tannins with floral notes and a refreshing finish.',
  'Grenache': 'Medium-bodied with flavors of strawberry, raspberry, and red plum. Silky tannins with notes of spice, herbs, and a warm, lingering finish.',
  'Grenache Blend': 'Rich and fruit-forward with flavors of raspberry, cherry, and spice. Notes of herbs, leather, and a hint of white pepper.',
  'GSM Blend': 'Rich and complex with layers of red and dark fruit, spice, and earth. Medium-full body with notes of garrigue, leather, and a warm, lingering finish.',
  'Malbec': 'Full-bodied with flavors of blackberry, plum, and black cherry. Velvety tannins with notes of cocoa, tobacco, and spice.',
  'Meritage': 'Structured and complex with flavors of blackcurrant, plum, and cedar. Well-integrated tannins with notes of tobacco, vanilla, and a long, elegant finish.',
  'Merlot': 'Smooth and velvety with flavors of plum, black cherry, and chocolate. Soft tannins with hints of vanilla and spice.',
  'Mourvèdre': 'Full-bodied and robust with flavors of blackberry, meat, and dark plum. Firm tannins with notes of leather, iron, and earthy complexity.',
  'Nebbiolo': 'Full-bodied and tannic with flavors of cherry, roses, and tar. High acidity with notes of leather, tobacco, dried herbs, and remarkable aging potential.',
  'Petit Verdot': 'Deeply colored and full-bodied with intense flavors of blackberry, violet, and graphite. Firm tannins with notes of dark chocolate, spice, and a powerful finish.',
  'Petite Sirah': 'Deeply colored and full-bodied with flavors of blueberry, blackberry, and pepper. Firm, grippy tannins with notes of dark chocolate and tobacco.',
  'Pinot Noir': 'Elegant and silky with flavors of cherry, raspberry, and earth. Delicate tannins with notes of mushroom, forest floor, and subtle spice.',
  'Red Blend': 'Complex and well-balanced with layers of dark fruit, spice, and oak. Rich texture with a harmonious blend of flavors.',
  'Rhône Blend': 'Medium to full-bodied with flavors of dark fruit, herbs, and spice. Notes of garrigue, leather, and black pepper with a warm, complex finish.',
  'Sangiovese': 'Medium-bodied with flavors of cherry, plum, and herbs. Bright acidity with notes of leather, tobacco, and earthy undertones.',
  'Syrah': 'Bold and spicy with flavors of blackberry, black pepper, and smoked meat. Full-bodied with notes of leather, tobacco, and dark chocolate.',
  'Tempranillo': 'Medium to full-bodied with flavors of cherry, plum, and tobacco. Balanced acidity with notes of leather, vanilla, and spice.',
  'Côtes du Rhône Red': 'Medium-bodied with flavors of red fruit, herbs, and spice. Notes of cherry, raspberry, and Mediterranean herbs.',
  'Zinfandel': 'Bold and jammy with flavors of blackberry, cherry, and black pepper. Medium tannins with notes of vanilla, chocolate, and a warming, rich finish.',

  // Whites
  'Albariño': 'Crisp and aromatic with flavors of peach, apricot, and citrus. Vibrant acidity with notes of almond, saline mineral, and a clean, refreshing finish.',
  'Chablis': 'Lean and mineral with flavors of green apple, lemon, and white flowers. Crisp acidity with flinty, saline notes and an elegant, restrained finish.',
  'Chardonnay': 'Rich and buttery with flavors of apple, pear, and citrus. Creamy texture with hints of vanilla, toast, and tropical fruit.',
  'Chenin Blanc': 'Versatile and aromatic with flavors of apple, quince, and honey. Balanced acidity with notes of beeswax, lanolin, and a complex, long finish.',
  'Gewürztraminer': 'Intensely aromatic with flavors of lychee, rose petal, and ginger. Full-bodied with notes of apricot, spice, and an opulent finish.',
  'Grüner Veltliner': 'Crisp and peppery with flavors of lime, green apple, and white pepper. High acidity with mineral notes and a clean, spicy finish.',
  'Marsanne': 'Rich and full-bodied with flavors of peach, apricot, and almond. Low acidity with notes of honey, beeswax, and a rich, waxy texture.',
  'Muscat': 'Floral and aromatic with flavors of orange blossom, peach, and apricot. Light-bodied with notes of honey and musk, ranging from dry to sweet.',
  'Pinot Gris': 'Full-bodied for a white wine with flavors of pear, peach, and honeysuckle. Rich texture with notes of spice, smoke, and a lingering, complex finish.',
  'Pouilly-Fuissé': 'Elegant and mineral with flavors of apple, pear, and citrus blossom. Balanced oak with notes of toasted almond, butter, and a long, refined finish.',
  'Riesling': 'Aromatic and vibrant with flavors of lime, green apple, and peach. Racy acidity with notes of petrol, mineral, and a long finish ranging from bone-dry to sweet.',
  'Rosé': 'Fresh and fruity with flavors of strawberry, watermelon, and citrus. Crisp acidity with a light, refreshing finish.',
  'Roussanne': 'Rich and aromatic with flavors of peach, pear, and herbal tea. Full-bodied with notes of honey, almond, and a silky, complex texture.',
  'Sauvignon Blanc': 'Crisp and aromatic with flavors of grapefruit, lime, and green herbs. Vibrant acidity with notes of grass, mineral, and a clean, refreshing finish.',
  'Viognier': 'Full-bodied and aromatic with flavors of peach, apricot, and honeysuckle. Low acidity with notes of orange blossom, vanilla, and a rich, voluptuous finish.',
  'White Blend': 'Fresh and versatile with a blend of fruit and floral notes. Crisp acidity with a clean, food-friendly finish that varies by the component grapes.',

  // Sparkling
  'Champagne Blend': 'Elegant and refined with fine bubbles. Flavors of citrus, apple, and brioche with notes of almond and mineral complexity.',
  'Crémant': 'Elegant sparkling wine with fine bubbles and flavors of apple, citrus, and brioche. Crisp acidity with a light, festive character.',
  'Prosecco': 'Light and refreshing with flavors of green apple, pear, and white peach. Effervescent with notes of almond and a light, approachable finish.',
  'Sparkling Wine': 'Crisp and refreshing with bright acidity. Flavors of green apple, citrus, and stone fruit with persistent bubbles.',

  // Dessert & Fortified
  'Late Harvest Riesling': 'Luscious and sweet with concentrated flavors of apricot, peach, and honey. Vibrant acidity balances the sweetness, with notes of petrol and a long, complex finish.',
  'Port': 'Rich and fortified with intense flavors of black cherry, plum, and chocolate. Full-bodied with notes of caramel, vanilla, and a long, warming finish.',
  'Sauternes': 'Opulent and honeyed with flavors of apricot, peach, and orange marmalade. Rich and sweet with notes of saffron, beeswax, and a remarkable, complex finish.',
  'Sherry': 'Distinctive and complex, ranging from bone-dry to richly sweet. Flavors of walnut, dried fruit, and oxidative notes with a briny, nutty character.',
};

export const getPairingsForWine = (wine) => WINE_PAIRINGS[wine.varietal] ?? DEFAULT_PAIRINGS;

// Direct pairing scores per varietal, keyed by dish category id and sub-category id.
// Category keys: red-meat, poultry, fish, seafood, pasta, cheese, vegetables
// Sub-category keys: steak, lamb, ribs, game, chorizo, chicken, duck, turkey,
//   salmon, trout, white-fish, oysters, lobster, shrimp, sushi, caviar,
//   pasta-sub, pizza, risotto, cheese-sub, charcuterie,
//   salad, mushrooms, roasted, mediterranean
// Scores 1–5: 1=acceptable, 3=good, 5=classic/iconic
// Per-country (and where meaningful, per-varietal) pairing score adjustments.
// Applied on top of VARIETAL_PAIRING_SCORES to reward classic regional pairings.
// Values are additive bonuses using the same key space as VARIETAL_PAIRING_SCORES.
export const REGION_SCORE_MODIFIERS = {
  'France': {
    'Pinot Noir':       { [PAIRING_KEYS.DUCK]: 1, [PAIRING_KEYS.MUSHROOMS]: 1 },
    'Champagne Blend':  { [PAIRING_KEYS.OYSTERS]: 1, [PAIRING_KEYS.CAVIAR]: 1, [PAIRING_KEYS.SUSHI]: 1 },
    'Syrah':            { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.GAME]: 1 },
    'Grenache Blend':   { [PAIRING_KEYS.MEDITERRANEAN]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Rhône Blend':      { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.MEDITERRANEAN]: 1 },
    'Roussanne':        { [PAIRING_KEYS.LOBSTER]: 1, [PAIRING_KEYS.RISOTTO]: 1 },
    'Marsanne':         { [PAIRING_KEYS.WHITE_FISH]: 1, [PAIRING_KEYS.LOBSTER]: 1 },
    'Mourvèdre':        { [PAIRING_KEYS.GAME]: 1, [PAIRING_KEYS.LAMB]: 1 },
  },
  'Italy': {
    'Nebbiolo':         { [PAIRING_KEYS.PASTA_SUB]: 1, [PAIRING_KEYS.RISOTTO]: 1 },
    'Sangiovese':       { [PAIRING_KEYS.PIZZA]: 1, [PAIRING_KEYS.PASTA_SUB]: 1 },
    'Barbera':          { [PAIRING_KEYS.PIZZA]: 1, [PAIRING_KEYS.PASTA_SUB]: 1 },
  },
  'Spain': {
    'Tempranillo':      { [PAIRING_KEYS.CHORIZO]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Grenache':         { [PAIRING_KEYS.MEDITERRANEAN]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Albariño':         { [PAIRING_KEYS.SHRIMP]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Germany': {
    'Riesling':         { [PAIRING_KEYS.TROUT]: 1, [PAIRING_KEYS.DUCK]: 1, [PAIRING_KEYS.PORK]: 1, [PAIRING_KEYS.PORK_CHOPS]: 1 },
  },
  'Austria': {
    'Grüner Veltliner': { [PAIRING_KEYS.WHITE_FISH]: 1, [PAIRING_KEYS.SALAD]: 1 },
    'Riesling':         { [PAIRING_KEYS.TROUT]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Argentina': {
    'Malbec':           { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.RIBS]: 1 },
    'Cabernet Franc':   { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.STEAK]: 1 },
  },
  'Australia': {
    'Syrah':            { [PAIRING_KEYS.RIBS]: 1, [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.GAME]: 1 },
    'Grenache Blend':   { [PAIRING_KEYS.ROASTED]: 1, [PAIRING_KEYS.MEDITERRANEAN]: 1 },
  },
  'New Zealand': {
    'Sauvignon Blanc':  { [PAIRING_KEYS.OYSTERS]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
    'Pinot Noir':       { [PAIRING_KEYS.SALMON]: 1, [PAIRING_KEYS.DUCK]: 1 },
  },
  'Chile': {
    'Carmenère':        { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.RIBS]: 1 },
    'Cabernet Sauvignon': { [PAIRING_KEYS.STEAK]: 1 },
  },
  'Portugal': {
    'Red Blend':        { [PAIRING_KEYS.RIBS]: 1, [PAIRING_KEYS.STEAK]: 1 },
  },
};

// Sub-region (wine.state) pairing score adjustments — stacks on top of REGION_SCORE_MODIFIERS.
// Rewards wines from their most iconic appellations (e.g. Burgundy Pinot gets the France bonus
// AND the Burgundy bonus; a Vin de Pays Pinot only gets the France bonus).
export const SUBREGION_SCORE_MODIFIERS = {
  // France
  'Burgundy':              {
    'Pinot Noir':          { [PAIRING_KEYS.MUSHROOMS]: 1, [PAIRING_KEYS.DUCK]: 1 },
    'Chardonnay':          { [PAIRING_KEYS.LOBSTER]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Champagne':             {
    'Champagne Blend':     { [PAIRING_KEYS.CAVIAR]: 1, [PAIRING_KEYS.OYSTERS]: 1 },
  },
  'Alsace':                {
    'Riesling':            { [PAIRING_KEYS.PORK_CHOPS]: 1, [PAIRING_KEYS.DUCK]: 1 },
    'Gewürztraminer':      { [PAIRING_KEYS.DUCK]: 1, [PAIRING_KEYS.PORK_BELLY]: 1 },
    'Pinot Gris':          { [PAIRING_KEYS.PORK_CHOPS]: 1, [PAIRING_KEYS.PORK_BELLY]: 1 },
  },
  'Bordeaux':              {
    'Bordeaux Blend':      { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Cabernet Franc':      { [PAIRING_KEYS.LAMB]: 1 },
  },
  'Rhône Valley':          {
    'Syrah':               { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.GAME]: 1 },
    'Grenache Blend':      { [PAIRING_KEYS.MEDITERRANEAN]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Rhône Blend':         { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.MEDITERRANEAN]: 1 },
    'Mourvèdre':           { [PAIRING_KEYS.GAME]: 1, [PAIRING_KEYS.LAMB]: 1 },
  },
  'Loire Valley':          {
    'Sauvignon Blanc':     { [PAIRING_KEYS.OYSTERS]: 1, [PAIRING_KEYS.CHEESE_SUB]: 1 },
    'Chenin Blanc':        { [PAIRING_KEYS.CHICKEN]: 1 },
    'Cabernet Franc':      { [PAIRING_KEYS.LAMB]: 1, [PAIRING_KEYS.MUSHROOMS]: 1 },
  },
  'Beaujolais':            {
    'Gamay':               { [PAIRING_KEYS.CHARCUTERIE]: 1, [PAIRING_KEYS.CHICKEN]: 1 },
  },
  'Provence':              {
    'Rosé':                { [PAIRING_KEYS.MEDITERRANEAN]: 1, [PAIRING_KEYS.SALAD]: 1 },
  },
  // Italy
  'Piedmont':              {
    'Nebbiolo':            { [PAIRING_KEYS.PASTA_SUB]: 1, [PAIRING_KEYS.RISOTTO]: 1, [PAIRING_KEYS.MUSHROOMS]: 1 },
    'Barbera':             { [PAIRING_KEYS.PIZZA]: 1, [PAIRING_KEYS.PASTA_SUB]: 1 },
  },
  'Tuscany':               {
    'Sangiovese':          { [PAIRING_KEYS.PIZZA]: 1, [PAIRING_KEYS.PASTA_SUB]: 1 },
    'Bordeaux Blend':      { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1 },
  },
  'Friuli-Venezia Giulia': {
    'Pinot Gris':          { [PAIRING_KEYS.HAM]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  // Spain
  'Rioja':                 {
    'Tempranillo':         { [PAIRING_KEYS.CHORIZO]: 1, [PAIRING_KEYS.LAMB]: 1 },
  },
  'Ribera del Duero':      {
    'Tempranillo':         { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1 },
  },
  'Galicia':               {
    'Albariño':            { [PAIRING_KEYS.OYSTERS]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Jerez':                 {
    'Sherry':              { [PAIRING_KEYS.CHARCUTERIE]: 1, [PAIRING_KEYS.CHEESE_SUB]: 1 },
  },
  // Germany
  'Mosel':                 {
    'Riesling':            { [PAIRING_KEYS.TROUT]: 1, [PAIRING_KEYS.DUCK]: 1 },
  },
  'Rheingau':              {
    'Riesling':            { [PAIRING_KEYS.WHITE_FISH]: 1, [PAIRING_KEYS.PORK_CHOPS]: 1 },
  },
  // Austria
  'Wachau':                {
    'Riesling':            { [PAIRING_KEYS.TROUT]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
    'Grüner Veltliner':    { [PAIRING_KEYS.WHITE_FISH]: 1, [PAIRING_KEYS.SALAD]: 1 },
  },
  'Kamptal':               {
    'Grüner Veltliner':    { [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  // Portugal
  'Douro':                 {
    'Port':                { [PAIRING_KEYS.CHEESE_SUB]: 1, [PAIRING_KEYS.CHOCOLATE]: 1 },
  },
  // Argentina
  'Mendoza':               {
    'Malbec':              { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.RIBS]: 1 },
  },
  'Luján de Cuyo':         {
    'Malbec':              { [PAIRING_KEYS.STEAK]: 1 },
  },
  // Australia
  'Barossa Valley':        {
    'Syrah':               { [PAIRING_KEYS.RIBS]: 1, [PAIRING_KEYS.STEAK]: 1 },
  },
  'Clare Valley':          {
    'Riesling':            { [PAIRING_KEYS.TROUT]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Yarra Valley':          {
    'Pinot Noir':          { [PAIRING_KEYS.SALMON]: 1, [PAIRING_KEYS.DUCK]: 1 },
  },
  // New Zealand
  'Marlborough':           {
    'Sauvignon Blanc':     { [PAIRING_KEYS.OYSTERS]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
  },
  'Central Otago':         {
    'Pinot Noir':          { [PAIRING_KEYS.SALMON]: 1, [PAIRING_KEYS.DUCK]: 1 },
  },
  // USA
  'California':            {
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.LAMB]: 1 },
    'Chardonnay':          { [PAIRING_KEYS.LOBSTER]: 1 },
    'Pinot Noir':          { [PAIRING_KEYS.SALMON]: 1 },
    'Zinfandel':           { [PAIRING_KEYS.RIBS]: 1, [PAIRING_KEYS.CHORIZO]: 1 },
  },
  'Oregon':                {
    'Pinot Noir':          { [PAIRING_KEYS.SALMON]: 1, [PAIRING_KEYS.MUSHROOMS]: 1 },
    'Pinot Gris':          { [PAIRING_KEYS.WHITE_FISH]: 1, [PAIRING_KEYS.SHRIMP]: 1 },
  },
  'Washington':            {
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1 },
    'Merlot':              { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.PORK_CHOPS]: 1 },
    'Riesling':            { [PAIRING_KEYS.PORK_CHOPS]: 1, [PAIRING_KEYS.WHITE_FISH]: 1 },
    'Syrah':               { [PAIRING_KEYS.LAMB]: 1 },
  },
  // Chile
  'Maipo Valley':          {
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1 },
    'Carmenère':           { [PAIRING_KEYS.STEAK]: 1 },
  },
  'Colchagua Valley':      {
    'Carmenère':           { [PAIRING_KEYS.STEAK]: 1, [PAIRING_KEYS.RIBS]: 1 },
    'Cabernet Sauvignon':  { [PAIRING_KEYS.STEAK]: 1 },
  },
};

// Which pairing keys are considered "robust" (fatty/rich) vs "delicate".
// Used to adjust scores for wines not yet in their drink window —
// young tannic wines benefit from fat and are less suited to delicate dishes.
export const ROBUST_PAIRING_KEYS = new Set([
  PAIRING_KEYS.RED_MEAT, PAIRING_KEYS.STEAK, PAIRING_KEYS.RIBS, PAIRING_KEYS.LAMB, PAIRING_KEYS.GAME, PAIRING_KEYS.CHORIZO,
  PAIRING_KEYS.PORK, PAIRING_KEYS.PORK_BELLY,
  PAIRING_KEYS.CHEESE, PAIRING_KEYS.CHEESE_SUB, PAIRING_KEYS.CHARCUTERIE,
  PAIRING_KEYS.PASTA, PAIRING_KEYS.PASTA_SUB, PAIRING_KEYS.PIZZA, PAIRING_KEYS.RISOTTO,
  PAIRING_KEYS.POULTRY, PAIRING_KEYS.DUCK, PAIRING_KEYS.TURKEY,
  PAIRING_KEYS.CHOCOLATE,
]);
export const DELICATE_PAIRING_KEYS = new Set([
  PAIRING_KEYS.FISH, PAIRING_KEYS.SALMON, PAIRING_KEYS.TROUT, PAIRING_KEYS.WHITE_FISH,
  PAIRING_KEYS.SEAFOOD, PAIRING_KEYS.OYSTERS, PAIRING_KEYS.SHRIMP, PAIRING_KEYS.SUSHI, PAIRING_KEYS.CAVIAR, PAIRING_KEYS.LOBSTER,
  PAIRING_KEYS.VEGETABLES, PAIRING_KEYS.SALAD, PAIRING_KEYS.MEDITERRANEAN,
  PAIRING_KEYS.SPICY, PAIRING_KEYS.THAI, PAIRING_KEYS.INDIAN, PAIRING_KEYS.CHINESE,
  PAIRING_KEYS.BRUNCH, PAIRING_KEYS.EGGS, PAIRING_KEYS.SMOKED_SALMON,
  PAIRING_KEYS.DESSERT, PAIRING_KEYS.FRUIT_DESSERT,
]);

// Preparation-style modifiers applied on top of dish scores.
// "Light" (grilled, raw, lightly dressed) favours crisp/high-acid wines.
// "Rich" (cream, butter, braise, confit) favours full-bodied, textured wines.
// Values are +1 / -1 bonuses keyed by varietal.
export const PREPARATION_MODIFIERS = {
  light: {
    'Sauvignon Blanc': 1, 'Riesling': 1, 'Grüner Veltliner': 1,
    'Chablis': 1, 'Albariño': 1, 'Crémant': 1, 'Champagne Blend': 1, 'Sparkling Wine': 1,
    'Gamay': 1, 'Pinot Noir': 1, 'Rosé': 1, 'Prosecco': 1,
    'Chardonnay': -1, 'Viognier': -1, 'Roussanne': -1, 'Marsanne': -1,
    'Cabernet Sauvignon': -1, 'Syrah': -1, 'Malbec': -1,
    'Petite Sirah': -1, 'Zinfandel': -1,
  },
  rich: {
    'Chardonnay': 1, 'Viognier': 1, 'Roussanne': 1, 'Marsanne': 1, 'Pouilly-Fuissé': 1,
    'Merlot': 1, 'Cabernet Franc': 1, 'Pinot Noir': 1, 'Nebbiolo': 1,
    'Sauvignon Blanc': -1, 'Grüner Veltliner': -1, 'Albariño': -1,
    'Chablis': -1, 'Gamay': -1, 'Rosé': -1,
  },
};

// Varietals with naturally high tannins — used by SommelierView to adjust composite scores
// regardless of drink window status. High-tannin wines benefit from fatty/robust dishes (+1)
// and are less suited to delicate dishes (-1).
export const HIGH_TANNIN_VARIETALS = new Set([
  'Cabernet Sauvignon', 'Cabernet Sauvignon Blend', 'Nebbiolo', 'Syrah', 'Petite Sirah',
  'Mourvèdre', 'Petit Verdot', 'Malbec', 'Zinfandel', 'Tempranillo',
  'Cabernet Franc', 'Sangiovese', 'Barbera',
  'Bordeaux Blend', 'Meritage', 'Red Blend', 'GSM Blend',
]);

export const VARIETAL_PAIRING_SCORES = {
  // --- Reds ---
  'Barbera': {
    [PAIRING_KEYS.PASTA]: 5, [PAIRING_KEYS.PASTA_SUB]: 4, [PAIRING_KEYS.PIZZA]: 5, [PAIRING_KEYS.RISOTTO]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 4,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.MUSHROOMS]: 3,
  },
  'Bordeaux Blend': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 5, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.RIBS]: 3,
    [PAIRING_KEYS.POULTRY]: 2, [PAIRING_KEYS.DUCK]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Cabernet Franc': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.STEAK]: 2,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4, [PAIRING_KEYS.DUCK]: 4,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.RISOTTO]: 4,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.MUSHROOMS]: 4,
  },
  'Cabernet Sauvignon': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 5, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.GAME]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Cabernet Sauvignon Blend': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 4, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.LAMB]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 2, [PAIRING_KEYS.ROASTED]: 2,
  },
  'Carmenère': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 4, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.RIBS]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 2, [PAIRING_KEYS.ROASTED]: 2,
  },
  'Gamay': {
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.PORK]: 4, [PAIRING_KEYS.PORK_CHOPS]: 4, [PAIRING_KEYS.HAM]: 4,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 4,
    [PAIRING_KEYS.PASTA]: 2, [PAIRING_KEYS.PASTA_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 2, [PAIRING_KEYS.MUSHROOMS]: 3,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 2, [PAIRING_KEYS.CHINESE]: 2,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.EGGS]: 3,
  },
  'Grenache': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.STEAK]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 3,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.VEGETABLES]: 4, [PAIRING_KEYS.ROASTED]: 4, [PAIRING_KEYS.MEDITERRANEAN]: 4,
  },
  'Grenache Blend': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 5,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 4, [PAIRING_KEYS.ROASTED]: 4, [PAIRING_KEYS.MEDITERRANEAN]: 5,
  },
  'GSM Blend': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.STEAK]: 3, [PAIRING_KEYS.GAME]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Malbec': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 5, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.LAMB]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Meritage': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 5, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.RIBS]: 3,
    [PAIRING_KEYS.POULTRY]: 2, [PAIRING_KEYS.DUCK]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Merlot': {
    [PAIRING_KEYS.RED_MEAT]: 3, [PAIRING_KEYS.STEAK]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 3,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Mourvèdre': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.GAME]: 4, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.STEAK]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Nebbiolo': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.STEAK]: 3, [PAIRING_KEYS.GAME]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.PASTA]: 5, [PAIRING_KEYS.PASTA_SUB]: 5, [PAIRING_KEYS.RISOTTO]: 4,
    [PAIRING_KEYS.CHEESE]: 4, [PAIRING_KEYS.CHEESE_SUB]: 4,
  },
  'Petit Verdot': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 5, [PAIRING_KEYS.GAME]: 4, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.LAMB]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Petite Sirah': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.RIBS]: 5, [PAIRING_KEYS.STEAK]: 4, [PAIRING_KEYS.GAME]: 3, [PAIRING_KEYS.LAMB]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Pinot Noir': {
    [PAIRING_KEYS.POULTRY]: 5, [PAIRING_KEYS.DUCK]: 5, [PAIRING_KEYS.TURKEY]: 4, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.PORK]: 4, [PAIRING_KEYS.PORK_CHOPS]: 4, [PAIRING_KEYS.PORK_BELLY]: 3,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.SALMON]: 4,
    [PAIRING_KEYS.VEGETABLES]: 4, [PAIRING_KEYS.MUSHROOMS]: 5, [PAIRING_KEYS.ROASTED]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3, [PAIRING_KEYS.CHARCUTERIE]: 2,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.CHINESE]: 2,
    [PAIRING_KEYS.BRUNCH]: 2, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Red Blend': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.STEAK]: 4, [PAIRING_KEYS.RIBS]: 4,
    [PAIRING_KEYS.PORK]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.ROASTED]: 3,
    [PAIRING_KEYS.PASTA]: 2,
  },
  'Rhône Blend': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.STEAK]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 4, [PAIRING_KEYS.ROASTED]: 4, [PAIRING_KEYS.MEDITERRANEAN]: 4,
  },
  'Sangiovese': {
    [PAIRING_KEYS.PASTA]: 5, [PAIRING_KEYS.PIZZA]: 5, [PAIRING_KEYS.PASTA_SUB]: 5, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.RED_MEAT]: 3, [PAIRING_KEYS.STEAK]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 3, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.ROASTED]: 3, [PAIRING_KEYS.MUSHROOMS]: 3,
  },
  'Syrah': {
    [PAIRING_KEYS.RED_MEAT]: 5, [PAIRING_KEYS.LAMB]: 5, [PAIRING_KEYS.GAME]: 5, [PAIRING_KEYS.RIBS]: 4, [PAIRING_KEYS.STEAK]: 4,
    [PAIRING_KEYS.POULTRY]: 2, [PAIRING_KEYS.DUCK]: 2,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Tempranillo': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.CHORIZO]: 5, [PAIRING_KEYS.STEAK]: 3, [PAIRING_KEYS.RIBS]: 2,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.PASTA]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Côtes du Rhône Red': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.LAMB]: 4, [PAIRING_KEYS.STEAK]: 3, [PAIRING_KEYS.RIBS]: 2,
    [PAIRING_KEYS.PORK]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.ROASTED]: 4, [PAIRING_KEYS.MEDITERRANEAN]: 3,
  },
  'Zinfandel': {
    [PAIRING_KEYS.RED_MEAT]: 4, [PAIRING_KEYS.RIBS]: 5, [PAIRING_KEYS.LAMB]: 3, [PAIRING_KEYS.CHORIZO]: 3, [PAIRING_KEYS.STEAK]: 3,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_BELLY]: 3,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PIZZA]: 3,
    [PAIRING_KEYS.CHEESE]: 2,
  },

  // --- Whites ---
  'Albariño': {
    [PAIRING_KEYS.SEAFOOD]: 5, [PAIRING_KEYS.OYSTERS]: 5, [PAIRING_KEYS.SHRIMP]: 5, [PAIRING_KEYS.LOBSTER]: 3, [PAIRING_KEYS.SUSHI]: 4,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.SALMON]: 3, [PAIRING_KEYS.WHITE_FISH]: 5,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 3,
    [PAIRING_KEYS.BRUNCH]: 2, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Chablis': {
    [PAIRING_KEYS.SEAFOOD]: 5, [PAIRING_KEYS.OYSTERS]: 5, [PAIRING_KEYS.CAVIAR]: 4, [PAIRING_KEYS.SHRIMP]: 4, [PAIRING_KEYS.SUSHI]: 4,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 4,
  },
  'Chardonnay': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.LOBSTER]: 5,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 5,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 4,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.EGGS]: 2, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Chenin Blanc': {
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.PORK_CHOPS]: 3,
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.LOBSTER]: 4,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.PASTA]: 2,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.ROASTED]: 3,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.INDIAN]: 2,
    [PAIRING_KEYS.DESSERT]: 2, [PAIRING_KEYS.FRUIT_DESSERT]: 3,
  },
  'Gewürztraminer': {
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3, [PAIRING_KEYS.DUCK]: 4,
    [PAIRING_KEYS.PORK]: 4, [PAIRING_KEYS.PORK_BELLY]: 4, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.FISH]: 2, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.SPICY]: 5, [PAIRING_KEYS.THAI]: 4, [PAIRING_KEYS.INDIAN]: 5, [PAIRING_KEYS.CHINESE]: 3,
  },
  'Grüner Veltliner': {
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4, [PAIRING_KEYS.SALMON]: 2,
    [PAIRING_KEYS.POULTRY]: 2,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.PASTA]: 2,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.SALAD]: 3,
    [PAIRING_KEYS.SPICY]: 3, [PAIRING_KEYS.THAI]: 3, [PAIRING_KEYS.CHINESE]: 2,
  },
  'Marsanne': {
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4,
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.LOBSTER]: 4,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
  },
  'Muscat': {
    [PAIRING_KEYS.PORK]: 2, [PAIRING_KEYS.HAM]: 2,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.POULTRY]: 2,
    [PAIRING_KEYS.FISH]: 2, [PAIRING_KEYS.SALMON]: 2,
    [PAIRING_KEYS.VEGETABLES]: 2, [PAIRING_KEYS.SALAD]: 2,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 2,
    [PAIRING_KEYS.DESSERT]: 4, [PAIRING_KEYS.FRUIT_DESSERT]: 4,
  },
  'Pinot Gris': {
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.SALMON]: 4, [PAIRING_KEYS.WHITE_FISH]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.PORK]: 4, [PAIRING_KEYS.PORK_CHOPS]: 4, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3, [PAIRING_KEYS.RISOTTO]: 3,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.MUSHROOMS]: 3,
    [PAIRING_KEYS.SPICY]: 4, [PAIRING_KEYS.THAI]: 4, [PAIRING_KEYS.INDIAN]: 3, [PAIRING_KEYS.CHINESE]: 4,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.EGGS]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Pouilly-Fuissé': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.LOBSTER]: 5,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
  },
  'Riesling': {
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.TROUT]: 5, [PAIRING_KEYS.SALMON]: 3, [PAIRING_KEYS.WHITE_FISH]: 3, [PAIRING_KEYS.SUSHI]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.DUCK]: 4,
    [PAIRING_KEYS.PORK]: 5, [PAIRING_KEYS.PORK_CHOPS]: 5, [PAIRING_KEYS.PORK_BELLY]: 4, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.SPICY]: 5, [PAIRING_KEYS.THAI]: 5, [PAIRING_KEYS.INDIAN]: 5, [PAIRING_KEYS.CHINESE]: 4,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 3,
    [PAIRING_KEYS.DESSERT]: 2, [PAIRING_KEYS.FRUIT_DESSERT]: 3,
  },
  'Rosé': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.SHRIMP]: 4, [PAIRING_KEYS.LOBSTER]: 2,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.POULTRY]: 2, [PAIRING_KEYS.CHICKEN]: 2,
    [PAIRING_KEYS.PASTA]: 2, [PAIRING_KEYS.PIZZA]: 2,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 4, [PAIRING_KEYS.SALAD]: 4, [PAIRING_KEYS.MEDITERRANEAN]: 5,
    [PAIRING_KEYS.SPICY]: 3, [PAIRING_KEYS.THAI]: 3,
    [PAIRING_KEYS.BRUNCH]: 4, [PAIRING_KEYS.EGGS]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Roussanne': {
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.LOBSTER]: 3,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.RISOTTO]: 4,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.MUSHROOMS]: 3,
  },
  'Sauvignon Blanc': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.OYSTERS]: 4, [PAIRING_KEYS.SHRIMP]: 4, [PAIRING_KEYS.SUSHI]: 3,
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.CHEESE]: 4, [PAIRING_KEYS.CHEESE_SUB]: 4,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.SALAD]: 3,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 3,
    [PAIRING_KEYS.BRUNCH]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 3,
  },
  'Viognier': {
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.LOBSTER]: 3,
    [PAIRING_KEYS.POULTRY]: 4, [PAIRING_KEYS.CHICKEN]: 4,
    [PAIRING_KEYS.RED_MEAT]: 2, [PAIRING_KEYS.LAMB]: 3,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.WHITE_FISH]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.INDIAN]: 3,
  },
  'White Blend': {
    [PAIRING_KEYS.FISH]: 4, [PAIRING_KEYS.WHITE_FISH]: 4, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.POULTRY]: 3, [PAIRING_KEYS.CHICKEN]: 3,
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.SHRIMP]: 3,
    [PAIRING_KEYS.PASTA]: 3,
    [PAIRING_KEYS.CHEESE]: 2, [PAIRING_KEYS.CHEESE_SUB]: 2,
    [PAIRING_KEYS.VEGETABLES]: 3, [PAIRING_KEYS.SALAD]: 3,
  },

  // --- Sparkling ---
  'Champagne Blend': {
    [PAIRING_KEYS.SEAFOOD]: 5, [PAIRING_KEYS.OYSTERS]: 5, [PAIRING_KEYS.CAVIAR]: 5, [PAIRING_KEYS.SHRIMP]: 3, [PAIRING_KEYS.SUSHI]: 4,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.HAM]: 4,
    [PAIRING_KEYS.CHEESE]: 4, [PAIRING_KEYS.CHEESE_SUB]: 4, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.PASTA]: 2,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 3,
    [PAIRING_KEYS.BRUNCH]: 5, [PAIRING_KEYS.EGGS]: 4, [PAIRING_KEYS.SMOKED_SALMON]: 5,
    [PAIRING_KEYS.DESSERT]: 3, [PAIRING_KEYS.FRUIT_DESSERT]: 3,
  },
  'Crémant': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.OYSTERS]: 4, [PAIRING_KEYS.CAVIAR]: 3, [PAIRING_KEYS.SHRIMP]: 3, [PAIRING_KEYS.SUSHI]: 3,
    [PAIRING_KEYS.FISH]: 3, [PAIRING_KEYS.SALMON]: 3,
    [PAIRING_KEYS.PORK]: 3, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.PASTA]: 2,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 2,
    [PAIRING_KEYS.BRUNCH]: 4, [PAIRING_KEYS.EGGS]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 4,
  },
  'Prosecco': {
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.SHRIMP]: 3,
    [PAIRING_KEYS.PORK]: 2, [PAIRING_KEYS.HAM]: 3,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 2, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.PASTA]: 3, [PAIRING_KEYS.PASTA_SUB]: 3,
    [PAIRING_KEYS.VEGETABLES]: 2,
    [PAIRING_KEYS.SPICY]: 2, [PAIRING_KEYS.THAI]: 2,
    [PAIRING_KEYS.BRUNCH]: 4, [PAIRING_KEYS.EGGS]: 3, [PAIRING_KEYS.SMOKED_SALMON]: 3,
    [PAIRING_KEYS.FRUIT_DESSERT]: 2,
  },
  'Sparkling Wine': {
    [PAIRING_KEYS.SEAFOOD]: 4, [PAIRING_KEYS.OYSTERS]: 4, [PAIRING_KEYS.CAVIAR]: 4, [PAIRING_KEYS.SHRIMP]: 3, [PAIRING_KEYS.SUSHI]: 4,
    [PAIRING_KEYS.FISH]: 2,
    [PAIRING_KEYS.PORK]: 2, [PAIRING_KEYS.HAM]: 2,
    [PAIRING_KEYS.CHEESE]: 3, [PAIRING_KEYS.CHEESE_SUB]: 3, [PAIRING_KEYS.CHARCUTERIE]: 3,
    [PAIRING_KEYS.SPICY]: 3, [PAIRING_KEYS.THAI]: 3,
    [PAIRING_KEYS.BRUNCH]: 5, [PAIRING_KEYS.EGGS]: 4, [PAIRING_KEYS.SMOKED_SALMON]: 4,
    [PAIRING_KEYS.DESSERT]: 2, [PAIRING_KEYS.FRUIT_DESSERT]: 2,
  },

  // --- Dessert & Fortified ---
  'Late Harvest Riesling': {
    [PAIRING_KEYS.CHEESE]: 5, [PAIRING_KEYS.CHEESE_SUB]: 4,
    [PAIRING_KEYS.DESSERT]: 5, [PAIRING_KEYS.FRUIT_DESSERT]: 5,
  },
  'Port': {
    [PAIRING_KEYS.CHEESE]: 5, [PAIRING_KEYS.CHEESE_SUB]: 5,
    [PAIRING_KEYS.DESSERT]: 5, [PAIRING_KEYS.CHOCOLATE]: 5, [PAIRING_KEYS.FRUIT_DESSERT]: 3,
  },
  'Sauternes': {
    [PAIRING_KEYS.CHEESE]: 5, [PAIRING_KEYS.CHEESE_SUB]: 5,
    [PAIRING_KEYS.SEAFOOD]: 2, [PAIRING_KEYS.LOBSTER]: 2,
    [PAIRING_KEYS.DESSERT]: 5, [PAIRING_KEYS.FRUIT_DESSERT]: 5,
  },
  'Sherry': {
    [PAIRING_KEYS.CHEESE]: 4, [PAIRING_KEYS.CHEESE_SUB]: 4, [PAIRING_KEYS.CHARCUTERIE]: 4,
    [PAIRING_KEYS.SEAFOOD]: 3, [PAIRING_KEYS.OYSTERS]: 2,
    [PAIRING_KEYS.DESSERT]: 3, [PAIRING_KEYS.CHOCOLATE]: 2,
  },
};
