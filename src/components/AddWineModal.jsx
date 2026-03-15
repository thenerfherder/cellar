import React, { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';
import { VARIETALS, WINE_REGIONS } from '../constants';

const AddWineModal = ({ onClose, onSave, initialWine, catalogProducers, getCatalogWineNames }) => {
  const empty = { producer: '', name: '', vintage: '', varietal: '', country: '', state: '', quantity: '1', estimatedPrice: '', drinkWindow: '' };
  const [form, setForm] = useState(() => initialWine ? {
    producer: initialWine.producer,
    name: initialWine.name,
    vintage: initialWine.vintage != null ? String(initialWine.vintage) : '',
    varietal: initialWine.varietal,
    country: initialWine.country ?? '',
    state: initialWine.state ?? '',
    quantity: String(initialWine.quantity),
    estimatedPrice: String(initialWine.estimatedPrice),
    drinkWindow: initialWine.drinkWindow,
  } : empty);
  const [saving, setSaving] = useState(false);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const setCountry = (e) => setForm(prev => ({ ...prev, country: e.target.value, state: '' }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      producer: form.producer.trim(),
      name: form.name.trim(),
      vintage: form.vintage ? parseInt(form.vintage) : null,
      varietal: form.varietal,
      country: form.country,
      state: form.state,
      quantity: parseInt(form.quantity),
      estimatedPrice: parseFloat(form.estimatedPrice),
      drinkWindow: form.drinkWindow.trim(),
    });
    setSaving(false);
  };

  const field = (label, key, props = {}) => (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</label>
      <input
        value={form[key]}
        onChange={set(key)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm"
        {...props}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start sm:items-center justify-center p-4 pt-8 sm:pt-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{initialWine ? 'Edit Wine' : 'Add Wine'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Producer</label>
              <AutocompleteInput
                value={form.producer}
                onChange={(v) => setForm(prev => ({ ...prev, producer: v }))}
                suggestions={catalogProducers}
                required
                placeholder="e.g. Cayuse Vineyards"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Wine Name</label>
              <AutocompleteInput
                value={form.name}
                onChange={(v) => setForm(prev => ({ ...prev, name: v }))}
                suggestions={getCatalogWineNames(form.producer)}
                required
                placeholder="e.g. Cailloux Vineyard"
              />
            </div>
            {field('Vintage', 'vintage', { type: 'number', placeholder: 'Leave blank for NV', min: 1800, max: new Date().getFullYear() })}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Varietal</label>
              <select
                required
                value={form.varietal}
                onChange={set('varietal')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white"
              >
                <option value="" disabled>Select a varietal…</option>
                {Object.entries(VARIETALS).map(([group, options]) => (
                  <optgroup key={group} label={group}>
                    {options.map(v => <option key={v} value={v}>{v}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            {field('Quantity', 'quantity', { required: true, type: 'number', min: 1 })}
            {field('Price per Bottle ($)', 'estimatedPrice', { required: true, type: 'number', min: 0, step: '0.01', placeholder: '0.00' })}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Country</label>
              <select
                required
                value={form.country}
                onChange={setCountry}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white"
              >
                <option value="" disabled>Select country…</option>
                {Object.keys(WINE_REGIONS).sort().map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">State / Region</label>
              <select
                required
                value={form.state}
                onChange={set('state')}
                disabled={!form.country}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white disabled:opacity-40"
              >
                <option value="" disabled>Select state…</option>
                {(WINE_REGIONS[form.country] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {field('Drink Window', 'drinkWindow', { required: true, placeholder: 'e.g. 2024-2035', pattern: '\\d{4}-\\d{4}' })}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold uppercase tracking-wider bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : initialWine ? 'Save Changes' : 'Add Wine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWineModal;
