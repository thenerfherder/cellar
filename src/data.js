const DEFAULT_PAIRINGS = ['Grilled meats', 'Roasted vegetables', 'Aged cheeses', 'Pasta dishes', 'Charcuterie'];
export const DEFAULT_TASTING_NOTES = 'Complex and well-balanced with rich fruit flavors, subtle oak influence, and a smooth finish.';

export const WINE_PAIRINGS = {
  'Bordeaux Blend': ['Grilled steak', 'Lamb chops', 'Aged cheeses', 'Beef bourguignon', 'Roasted duck'],
  'Merlot': ['Roasted chicken', 'Pork tenderloin', 'Mushroom risotto', 'Grilled salmon', 'Pasta with tomato sauce'],
  'Cabernet Sauvignon': ['Ribeye steak', 'Braised short ribs', 'Blue cheese', 'Grilled lamb', 'Venison'],
  'Cabernet Sauvignon Blend': ['Grilled meats', 'BBQ ribs', 'Beef stew', 'Hard cheeses', 'Roasted vegetables'],
  'Chardonnay': ['Lobster', 'Chicken piccata', 'Grilled fish', 'Creamy pasta', 'Brie cheese'],
  'Pinot Noir': ['Duck breast', 'Grilled salmon', 'Mushroom dishes', 'Roasted turkey', 'Soft cheeses'],
  'Syrah': ['Grilled lamb', 'BBQ brisket', 'Wild game', 'Spicy sausages', 'Smoked meats'],
  'Gamay': ['Charcuterie', 'Roasted chicken', 'Salmon', 'Mushroom tart', 'Light pasta dishes'],
  'Sangiovese': ['Pizza', 'Pasta bolognese', 'Osso buco', 'Aged Parmesan', 'Grilled vegetables'],
  'Tempranillo': ['Paella', 'Grilled chorizo', 'Manchego cheese', 'Lamb skewers', 'Roasted peppers'],
  'Grenache Blend': ['Grilled lamb', 'Cassoulet', 'Ratatouille', 'Herbed roast chicken', 'Mediterranean dishes'],
  'Côtes du Rhône Red': ['Grilled meats', 'Ratatouille', 'Herb-crusted lamb', 'Goat cheese', 'BBQ chicken'],
  'Champagne Blend': ['Oysters', 'Caviar', 'Fried chicken', 'Soft cheeses', 'Sushi'],
  'Sparkling Wine': ['Appetizers', 'Seafood', 'Salty snacks', 'Fried foods', 'Fruit desserts'],
  'Malbec': ['Grilled steak', 'Empanadas', 'BBQ ribs', 'Blue cheese', 'Spicy tacos'],
  'Rosé': ['Grilled shrimp', 'Salads', 'Mediterranean dishes', 'Goat cheese', 'Light pasta'],
  'Red Blend': ['Grilled meats', 'Hearty stews', 'BBQ', 'Aged cheeses', 'Roasted vegetables'],
};

export const TASTING_NOTES = {
  'Bordeaux Blend': 'Rich and structured with notes of blackcurrant, cedar, tobacco, and dark chocolate. Well-integrated tannins with a long, elegant finish.',
  'Merlot': 'Smooth and velvety with flavors of plum, black cherry, and chocolate. Soft tannins with hints of vanilla and spice.',
  'Cabernet Sauvignon': 'Full-bodied with intense flavors of blackcurrant, blackberry, and cedar. Firm tannins with notes of tobacco, leather, and dark chocolate.',
  'Cabernet Sauvignon Blend': 'Bold and complex with dark fruit flavors, subtle oak influence, and firm structure. Notes of cassis, vanilla, and spice.',
  'Chardonnay': 'Rich and buttery with flavors of apple, pear, and citrus. Creamy texture with hints of vanilla, toast, and tropical fruit.',
  'Pinot Noir': 'Elegant and silky with flavors of cherry, raspberry, and earth. Delicate tannins with notes of mushroom, forest floor, and subtle spice.',
  'Syrah': 'Bold and spicy with flavors of blackberry, black pepper, and smoked meat. Full-bodied with notes of leather, tobacco, and dark chocolate.',
  'Gamay': 'Light and fruity with flavors of cherry, strawberry, and raspberry. Soft tannins with floral notes and a refreshing finish.',
  'Sangiovese': 'Medium-bodied with flavors of cherry, plum, and herbs. Bright acidity with notes of leather, tobacco, and earthy undertones.',
  'Tempranillo': 'Medium to full-bodied with flavors of cherry, plum, and tobacco. Balanced acidity with notes of leather, vanilla, and spice.',
  'Grenache Blend': 'Rich and fruit-forward with flavors of raspberry, cherry, and spice. Notes of herbs, leather, and a hint of white pepper.',
  'Côtes du Rhône Red': 'Medium-bodied with flavors of red fruit, herbs, and spice. Notes of cherry, raspberry, and Mediterranean herbs.',
  'Champagne Blend': 'Elegant and refined with fine bubbles. Flavors of citrus, apple, and brioche with notes of almond and mineral complexity.',
  'Sparkling Wine': 'Crisp and refreshing with bright acidity. Flavors of green apple, citrus, and stone fruit with persistent bubbles.',
  'Malbec': 'Full-bodied with flavors of blackberry, plum, and black cherry. Velvety tannins with notes of cocoa, tobacco, and spice.',
  'Rosé': 'Fresh and fruity with flavors of strawberry, watermelon, and citrus. Crisp acidity with a light, refreshing finish.',
  'Red Blend': 'Complex and well-balanced with layers of dark fruit, spice, and oak. Rich texture with a harmonious blend of flavors.',
};

export const getPairingsForWine = (wine) => WINE_PAIRINGS[wine.varietal] ?? DEFAULT_PAIRINGS;
