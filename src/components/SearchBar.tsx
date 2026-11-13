interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search"
      type="search"
      aria-label="Поиск пользователей"
      placeholder="Поиск по имени, email, логину…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
