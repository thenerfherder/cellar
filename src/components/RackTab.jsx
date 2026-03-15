import React, { useState, useEffect, useRef } from 'react';

const RackTab = ({ rack, isActive, onClick, onRename, onDelete }) => {
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(rack.name);
  const inputRef = useRef(null);

  const commitRename = () => {
    const name = draft.trim() || rack.name;
    setDraft(name);
    onRename(name);
    setRenaming(false);
  };

  useEffect(() => { if (renaming) inputRef.current?.select(); }, [renaming]);

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
        isActive
          ? 'bg-amber-900 text-amber-100 border-amber-900'
          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {renaming ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitRename}
          onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setDraft(rack.name); setRenaming(false); } }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent outline-none w-24 text-xs font-bold uppercase tracking-wider"
        />
      ) : (
        <span>{rack.name}</span>
      )}
      <button
        onClick={e => { e.stopPropagation(); setDraft(rack.name); setRenaming(true); }}
        className={`opacity-50 hover:opacity-100 transition-opacity ${isActive ? 'text-amber-200' : 'text-gray-400'}`}
        title="Rename"
      >
        ✎
      </button>
      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className={`opacity-50 hover:opacity-100 transition-opacity ${isActive ? 'text-amber-200' : 'text-gray-400'}`}
          title="Delete rack"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default RackTab;
