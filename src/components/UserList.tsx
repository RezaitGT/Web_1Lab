import type { User } from "../types";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  // условный рендеринг
  if (users.length === 0) return <p className="empty">Пользователи не найдены</p>;

  return (
    <section className="list">
      {users.map((u) => (
        <UserCard key={u.id} user={u} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
