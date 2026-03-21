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
    'Pinot Noir':       { 'duck': 1, 'mushrooms': 1 },
    'Champagne Blend':  { 'oysters': 1, 'caviar': 1, 'sushi': 1 },
    'Syrah':            { 'lamb': 1, 'game': 1 },
    'Grenache Blend':   { 'mediterranean': 1, 'lamb': 1 },
    'Rhône Blend':      { 'lamb': 1, 'mediterranean': 1 },
    'Roussanne':        { 'lobster': 1, 'risotto': 1 },
    'Marsanne':         { 'white-fish': 1, 'lobster': 1 },
    'Mourvèdre':        { 'game': 1, 'lamb': 1 },
  },
  'Italy': {
    'Nebbiolo':         { 'pasta-sub': 1, 'risotto': 1 },
    'Sangiovese':       { 'pizza': 1, 'pasta-sub': 1 },
    'Barbera':          { 'pizza': 1, 'pasta-sub': 1 },
  },
  'Spain': {
    'Tempranillo':      { 'chorizo': 1, 'lamb': 1 },
    'Grenache':         { 'mediterranean': 1, 'lamb': 1 },
    'Albariño':         { 'shrimp': 1, 'white-fish': 1 },
  },
  'Germany': {
    'Riesling':         { 'trout': 1, 'duck': 1 },
  },
  'Austria': {
    'Grüner Veltliner': { 'white-fish': 1, 'salad': 1 },
    'Riesling':         { 'trout': 1, 'white-fish': 1 },
  },
  'Argentina': {
    'Malbec':           { 'steak': 1, 'ribs': 1 },
    'Cabernet Franc':   { 'lamb': 1, 'steak': 1 },
  },
  'Australia': {
    'Syrah':            { 'ribs': 1, 'steak': 1, 'game': 1 },
    'Grenache Blend':   { 'roasted': 1, 'mediterranean': 1 },
  },
  'New Zealand': {
    'Sauvignon Blanc':  { 'oysters': 1, 'white-fish': 1 },
    'Pinot Noir':       { 'salmon': 1, 'duck': 1 },
  },
  'Chile': {
    'Carmenère':        { 'steak': 1, 'ribs': 1 },
    'Cabernet Sauvignon': { 'steak': 1 },
  },
  'Portugal': {
    'Red Blend':        { 'ribs': 1, 'steak': 1 },
  },
};

// Which pairing keys are considered "robust" (fatty/rich) vs "delicate".
// Used to adjust scores for wines not yet in their drink window —
// young tannic wines benefit from fat and are less suited to delicate dishes.
export const ROBUST_PAIRING_KEYS = new Set([
  'red-meat', 'steak', 'ribs', 'lamb', 'game', 'chorizo',
  'cheese', 'cheese-sub', 'charcuterie',
  'pasta', 'pasta-sub', 'pizza', 'risotto',
  'poultry', 'duck', 'turkey',
]);
export const DELICATE_PAIRING_KEYS = new Set([
  'fish', 'salmon', 'trout', 'white-fish',
  'seafood', 'oysters', 'shrimp', 'sushi', 'caviar', 'lobster',
  'vegetables', 'salad', 'mediterranean',
]);

export const VARIETAL_PAIRING_SCORES = {
  // --- Reds ---
  'Barbera': {
    'pasta': 5, 'pasta-sub': 4, 'pizza': 5, 'risotto': 2,
    'poultry': 3, 'chicken': 3,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 4,
    'vegetables': 3, 'mushrooms': 3,
  },
  'Bordeaux Blend': {
    'red-meat': 5, 'steak': 5, 'lamb': 5, 'ribs': 3,
    'poultry': 2, 'duck': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Cabernet Franc': {
    'red-meat': 4, 'lamb': 5, 'steak': 2,
    'poultry': 4, 'chicken': 4, 'duck': 4,
    'pasta': 3, 'risotto': 4,
    'cheese': 3, 'cheese-sub': 3,
    'vegetables': 3, 'mushrooms': 4,
  },
  'Cabernet Sauvignon': {
    'red-meat': 5, 'steak': 5, 'ribs': 4, 'lamb': 4, 'game': 3,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Cabernet Sauvignon Blend': {
    'red-meat': 5, 'steak': 4, 'ribs': 4, 'lamb': 3,
    'cheese': 2, 'cheese-sub': 2,
    'vegetables': 2, 'roasted': 2,
  },
  'Carmenère': {
    'red-meat': 5, 'steak': 4, 'lamb': 4, 'ribs': 3,
    'cheese': 2, 'cheese-sub': 2,
    'vegetables': 2, 'roasted': 2,
  },
  'Gamay': {
    'poultry': 4, 'chicken': 4,
    'fish': 3, 'salmon': 3,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 4,
    'pasta': 2, 'pasta-sub': 2,
    'vegetables': 2, 'mushrooms': 3,
  },
  'Grenache': {
    'red-meat': 4, 'lamb': 5, 'steak': 2,
    'poultry': 4, 'chicken': 4,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 3,
    'vegetables': 4, 'roasted': 4, 'mediterranean': 4,
  },
  'Grenache Blend': {
    'red-meat': 4, 'lamb': 5,
    'poultry': 4, 'chicken': 4,
    'pasta': 3, 'risotto': 3,
    'cheese': 2, 'cheese-sub': 2,
    'vegetables': 4, 'roasted': 4, 'mediterranean': 5,
  },
  'GSM Blend': {
    'red-meat': 5, 'lamb': 5, 'ribs': 4, 'steak': 3, 'game': 3,
    'poultry': 3, 'chicken': 3,
    'cheese': 3, 'cheese-sub': 2,
  },
  'Malbec': {
    'red-meat': 5, 'steak': 5, 'ribs': 4, 'lamb': 3,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Meritage': {
    'red-meat': 5, 'steak': 5, 'lamb': 4, 'ribs': 3,
    'poultry': 2, 'duck': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Merlot': {
    'red-meat': 3, 'steak': 2,
    'poultry': 4, 'chicken': 4,
    'pasta': 3, 'pasta-sub': 3, 'risotto': 3,
    'fish': 3, 'salmon': 3,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Mourvèdre': {
    'red-meat': 5, 'lamb': 5, 'game': 4, 'ribs': 4, 'steak': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Nebbiolo': {
    'red-meat': 4, 'lamb': 4, 'steak': 3, 'game': 2,
    'pasta': 5, 'pasta-sub': 5, 'risotto': 4,
    'cheese': 4, 'cheese-sub': 4,
  },
  'Petit Verdot': {
    'red-meat': 5, 'steak': 5, 'game': 4, 'ribs': 4, 'lamb': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Petite Sirah': {
    'red-meat': 5, 'ribs': 5, 'steak': 4, 'game': 3, 'lamb': 3,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Pinot Noir': {
    'poultry': 5, 'duck': 5, 'turkey': 4, 'chicken': 3,
    'fish': 4, 'salmon': 4,
    'vegetables': 4, 'mushrooms': 5, 'roasted': 3,
    'cheese': 3, 'cheese-sub': 3, 'charcuterie': 2,
    'pasta': 3, 'risotto': 3,
  },
  'Red Blend': {
    'red-meat': 4, 'steak': 3, 'ribs': 3,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 2,
    'vegetables': 3, 'roasted': 3,
    'pasta': 2,
  },
  'Rhône Blend': {
    'red-meat': 4, 'lamb': 5, 'steak': 3,
    'poultry': 3, 'chicken': 3,
    'cheese': 3, 'cheese-sub': 3,
    'vegetables': 4, 'roasted': 4, 'mediterranean': 4,
  },
  'Sangiovese': {
    'pasta': 5, 'pizza': 5, 'pasta-sub': 5, 'risotto': 3,
    'red-meat': 3, 'steak': 2,
    'cheese': 3, 'cheese-sub': 3,
    'vegetables': 3, 'roasted': 3, 'mushrooms': 3,
  },
  'Syrah': {
    'red-meat': 5, 'lamb': 5, 'game': 5, 'ribs': 4, 'steak': 4,
    'poultry': 2, 'duck': 2,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Tempranillo': {
    'red-meat': 4, 'lamb': 4, 'chorizo': 5, 'steak': 3, 'ribs': 2,
    'pasta': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Côtes du Rhône Red': {
    'red-meat': 4, 'lamb': 4, 'steak': 3, 'ribs': 2,
    'poultry': 3, 'chicken': 3,
    'cheese': 3, 'cheese-sub': 2,
    'vegetables': 3, 'roasted': 4, 'mediterranean': 3,
  },
  'Zinfandel': {
    'red-meat': 4, 'ribs': 5, 'lamb': 3, 'chorizo': 3, 'steak': 3,
    'pasta': 3, 'pizza': 3,
    'cheese': 2,
  },

  // --- Whites ---
  'Albariño': {
    'seafood': 5, 'oysters': 5, 'shrimp': 5, 'lobster': 3, 'sushi': 4,
    'fish': 4, 'salmon': 3, 'white-fish': 5,
  },
  'Chablis': {
    'seafood': 5, 'oysters': 5, 'shrimp': 4, 'sushi': 4,
    'fish': 4, 'white-fish': 4,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Chardonnay': {
    'seafood': 4, 'lobster': 5,
    'poultry': 4, 'chicken': 5,
    'fish': 4, 'white-fish': 4, 'salmon': 3,
    'pasta': 3, 'pasta-sub': 3, 'risotto': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Chenin Blanc': {
    'poultry': 4, 'chicken': 4,
    'seafood': 3, 'lobster': 4,
    'cheese': 3, 'cheese-sub': 3,
    'pasta': 2,
    'vegetables': 3, 'roasted': 3,
  },
  'Gewürztraminer': {
    'poultry': 3, 'chicken': 3, 'duck': 4,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 3,
    'fish': 2, 'salmon': 3,
  },
  'Grüner Veltliner': {
    'fish': 4, 'white-fish': 4, 'salmon': 2,
    'poultry': 2,
    'cheese': 2, 'cheese-sub': 2,
    'pasta': 2,
    'vegetables': 3, 'salad': 3,
  },
  'Marsanne': {
    'fish': 4, 'white-fish': 4,
    'seafood': 4, 'lobster': 4,
    'pasta': 3, 'pasta-sub': 3, 'risotto': 3,
    'poultry': 3, 'chicken': 3,
    'cheese': 2, 'cheese-sub': 2,
  },
  'Muscat': {
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 3,
    'poultry': 2,
    'fish': 2, 'salmon': 2,
    'vegetables': 2, 'salad': 2,
  },
  'Pinot Gris': {
    'fish': 4, 'salmon': 4, 'white-fish': 3,
    'poultry': 3, 'chicken': 3,
    'cheese': 3, 'cheese-sub': 3,
    'pasta': 3, 'pasta-sub': 3, 'risotto': 3,
    'vegetables': 3, 'mushrooms': 3,
  },
  'Pouilly-Fuissé': {
    'seafood': 4, 'lobster': 5,
    'fish': 4, 'white-fish': 4,
    'poultry': 4, 'chicken': 4,
    'pasta': 3, 'pasta-sub': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Riesling': {
    'fish': 4, 'trout': 5, 'salmon': 3, 'white-fish': 3,
    'poultry': 3, 'duck': 4,
    'cheese': 3, 'cheese-sub': 3,
  },
  'Rosé': {
    'seafood': 4, 'shrimp': 4, 'lobster': 2,
    'fish': 3, 'salmon': 3,
    'poultry': 2, 'chicken': 2,
    'pasta': 2, 'pizza': 2,
    'cheese': 3, 'cheese-sub': 3,
    'vegetables': 4, 'salad': 4, 'mediterranean': 5,
  },
  'Roussanne': {
    'poultry': 4, 'chicken': 4,
    'seafood': 3, 'lobster': 3,
    'pasta': 3, 'risotto': 4,
    'cheese': 3, 'cheese-sub': 3,
    'vegetables': 3, 'mushrooms': 3,
  },
  'Sauvignon Blanc': {
    'seafood': 4, 'oysters': 4, 'shrimp': 4,
    'fish': 4, 'white-fish': 4, 'salmon': 3,
    'cheese': 4, 'cheese-sub': 4,
    'vegetables': 3, 'salad': 3,
  },
  'Viognier': {
    'seafood': 3, 'lobster': 3,
    'poultry': 4, 'chicken': 4,
    'red-meat': 2, 'lamb': 3,
    'fish': 3, 'white-fish': 3,
    'cheese': 3, 'cheese-sub': 3,
  },
  'White Blend': {
    'fish': 4, 'white-fish': 4, 'salmon': 3,
    'poultry': 3, 'chicken': 3,
    'seafood': 3, 'shrimp': 3,
    'pasta': 3,
    'cheese': 2, 'cheese-sub': 2,
    'vegetables': 3, 'salad': 3,
  },

  // --- Sparkling ---
  'Champagne Blend': {
    'seafood': 5, 'oysters': 5, 'caviar': 5, 'shrimp': 3, 'sushi': 4,
    'fish': 3, 'salmon': 3,
    'cheese': 4, 'cheese-sub': 4, 'charcuterie': 3,
    'pasta': 2,
  },
  'Crémant': {
    'seafood': 4, 'oysters': 4, 'shrimp': 3,
    'fish': 3, 'salmon': 3,
    'cheese': 3, 'cheese-sub': 3, 'charcuterie': 3,
    'pasta': 2,
  },
  'Prosecco': {
    'seafood': 3, 'shrimp': 3,
    'cheese': 3, 'cheese-sub': 2, 'charcuterie': 3,
    'pasta': 3, 'pasta-sub': 3,
    'vegetables': 2,
  },
  'Sparkling Wine': {
    'seafood': 4, 'oysters': 4, 'shrimp': 3,
    'fish': 2,
    'cheese': 3, 'cheese-sub': 3, 'charcuterie': 3,
  },

  // --- Dessert & Fortified ---
  'Late Harvest Riesling': {
    'cheese': 5, 'cheese-sub': 4,
  },
  'Port': {
    'cheese': 5, 'cheese-sub': 5,
  },
  'Sauternes': {
    'cheese': 5, 'cheese-sub': 5,
    'seafood': 2, 'lobster': 2,
  },
  'Sherry': {
    'cheese': 4, 'cheese-sub': 4, 'charcuterie': 4,
    'seafood': 3, 'oysters': 2,
  },
};
