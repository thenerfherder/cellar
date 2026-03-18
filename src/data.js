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
  'Champagne Blend': ['Oysters', 'Caviar', 'Fried chicken', 'Soft cheeses', 'Sushi'],
  'Crémant': ['Oysters', 'Smoked salmon', 'Soft cheeses', 'Fried oysters', 'Charcuterie'],
  'Prosecco': ['Charcuterie', 'Grilled shrimp', 'Soft cheeses', 'Fried chicken', 'Light pasta'],
  'Sparkling Wine': ['Oysters', 'Grilled shrimp', 'Charcuterie', 'Fried chicken', 'Soft cheeses'],

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
