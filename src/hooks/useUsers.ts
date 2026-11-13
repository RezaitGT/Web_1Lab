import { useCallback, useEffect, useState } from "react";
import { initialUsers } from "../data";
import type { User, UserDraft } from "../types";

/**
 * Кастомный хук: вся логика хранения и изменения списка пользователей.
 * При интеграции API здесь появятся fetch, обработка ошибок и согласование ответов.
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setUsers(initialUsers);
      setLoading(false);
    }, 400); // имитация запроса
    return () => clearTimeout(id);
  }, []);

  const addUser = useCallback((draft: UserDraft) => {
    setUsers((prev) => [{ ...draft, id: Math.max(0, ...prev.map((u) => u.id)) + 1 }, ...prev]);
  }, []);

  const updateUser = useCallback((id: number, draft: UserDraft) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...draft } : u)));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return { users, loading, addUser, updateUser, deleteUser };
}
