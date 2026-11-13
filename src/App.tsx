import { useCallback, useMemo, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";
import { useDebounce } from "./hooks/useDebounce";
import { useUsers } from "./hooks/useUsers";
import type { User, UserDraft } from "./types";

export default function App() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const debouncedQuery = useDebounce(query);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.username}`.toLowerCase().includes(q)
    );
  }, [users, debouncedQuery]);

  const handleCreate = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = useCallback((u: User) => { setEditing(u); setFormOpen(true); }, []);
  const handleDelete = useCallback((id: number) => {
    if (window.confirm("Удалить пользователя?")) deleteUser(id);
  }, [deleteUser]);

  const handleSubmit = (draft: UserDraft) => {
    if (editing) updateUser(editing.id, draft);
    else addUser(draft);
    setFormOpen(false);
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Пользователи <span className="count">{filtered.length}</span></h1>
        <button className="primary" onClick={handleCreate} disabled={loading}>+ Добавить</button>
      </header>
      <SearchBar value={query} onChange={setQuery} />
      {loading ? (
        <p className="empty">Загрузка…</p>
      ) : (
        <UserList users={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {formOpen && (
        <UserForm key={editing?.id ?? "new"} user={editing} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      )}
    </main>
  );
}
