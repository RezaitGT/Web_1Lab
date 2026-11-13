import { memo } from "react";
import type { User } from "../types";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

function UserCardBase({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <article className="card">
      <div className="avatar">{user.firstName[0]}{user.lastName[0]}</div>
      <div className="card-body">
        <h3>{user.firstName} {user.lastName} <small>@{user.username}</small></h3>
        <p>{user.company.title}, {user.company.name}</p>
        <p>{user.address.city}, {user.address.country} · {user.age} лет</p>
        <p>{user.email} · {user.phone}</p>
      </div>
      <div className="card-actions">
        <button onClick={() => onEdit(user)}>Изменить</button>
        <button className="danger" onClick={() => onDelete(user.id)}>Удалить</button>
      </div>
    </article>
  );
}

// memo позволяет пропустить рендер при равных props; это оптимизация, а не гарантия.
export const UserCard = memo(UserCardBase);
