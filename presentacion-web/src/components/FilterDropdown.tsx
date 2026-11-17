import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  id: string;
  label: string;
  value: string;
  options: readonly FilterOption[];
  onChange: (value: string) => void;
}

const CHEVRON_ICON = (
  <svg
    className="slicer-chevron"
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CHECK_ICON = (
  <svg
    className="slicer-check"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3.5 8.2L6.5 11.2L12.5 4.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterDropdown = memo(function FilterDropdown({
  id,
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const labelId = useId();
  const listboxId = useId();

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value) ?? options[0],
    [options, value],
  );

  const isFiltered = value !== 'ALL';

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        const idx = options.findIndex((opt) => opt.value === value);
        setHighlightedIndex(idx >= 0 ? idx : 0);
      }
      return !prev;
    });
  }, [options, value]);

  const handleSelect = useCallback(
    (nextValue: string) => {
      if (nextValue !== value) {
        onChange(nextValue);
      }
      close();
    },
    [close, onChange, value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, highlightedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = options.findIndex((opt) => opt.value === value);
          setHighlightedIndex(idx >= 0 ? idx : 0);
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Home':
          e.preventDefault();
          setHighlightedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setHighlightedIndex(options.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (highlightedIndex >= 0 && options[highlightedIndex]) {
            handleSelect(options[highlightedIndex].value);
          }
          break;
        case 'Tab':
          close();
          break;
      }
    },
    [close, handleSelect, highlightedIndex, isOpen, options, value],
  );

  return (
    <div ref={containerRef} className={`slicer-group${isOpen ? ' is-open' : ''}`}>
      <label id={labelId} className="slicer-label" htmlFor={id}>
        {label}
      </label>
      <div className="slicer-dropdown">
        <button
          id={id}
          type="button"
          className={`slicer-trigger${isOpen ? ' open' : ''}${isFiltered ? ' is-filtered' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${labelId} ${id}`}
          aria-controls={listboxId}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
        >
          <span className="slicer-trigger-text">{selectedOption?.label ?? ''}</span>
          {CHEVRON_ICON}
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            className="slicer-menu"
            role="listbox"
            aria-labelledby={labelId}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isHighlighted = idx === highlightedIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`slicer-option${isSelected ? ' selected' : ''}${isHighlighted ? ' highlighted' : ''}`}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt.value);
                  }}
                >
                  <span className="slicer-option-label">{opt.label}</span>
                  {isSelected && CHECK_ICON}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
});
