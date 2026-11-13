import { useEffect, useRef, useState } from "react";
import type { User, UserDraft } from "../types";

interface UserFormProps {
  user: User | null; // null — режим создания
  onSubmit: (draft: UserDraft) => void;
  onCancel: () => void;
}

const empty: UserDraft = {
  firstName: "", lastName: "", age: 18, gender: "male", email: "", phone: "", username: "",
  company: { name: "", title: "" }, address: { city: "", country: "" }
};

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [draft, setDraft] = useState<UserDraft>(user ?? empty);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []); // автофокус через useRef

  const set = <K extends keyof UserDraft>(key: K, value: UserDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const valid = Boolean(draft.firstName.trim() && draft.lastName.trim())
    && /^\S+@\S+\.\S+$/.test(draft.email.trim())
    && Number.isInteger(draft.age) && draft.age >= 0 && draft.age <= 120;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) onSubmit({ ...draft, firstName: draft.firstName.trim(), lastName: draft.lastName.trim(), email: draft.email.trim() });
  };

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="modal" role="dialog" aria-labelledby="form-title" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Escape") onCancel(); }}>
        <h2 id="form-title">{user ? "Редактирование" : "Новый пользователь"}</h2>
        <label>Имя<input required ref={firstRef} value={draft.firstName} onChange={(e) => set("firstName", e.target.value)} /></label>
        <label>Фамилия<input required value={draft.lastName} onChange={(e) => set("lastName", e.target.value)} /></label>
        <label>Логин<input value={draft.username} onChange={(e) => set("username", e.target.value)} /></label>
        <label>Email<input required type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} /></label>
        <label>Телефон<input value={draft.phone} onChange={(e) => set("phone", e.target.value)} /></label>
        <label>Возраст<input required type="number" min={0} max={120} step={1} value={Number.isNaN(draft.age) ? "" : draft.age} onChange={(e) => set("age", e.target.valueAsNumber)} /></label>
        <label>Пол
          <select value={draft.gender} onChange={(e) => set("gender", e.target.value as UserDraft["gender"])}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другой</option>
          </select>
        </label>
        <label>Компания<input value={draft.company.name} onChange={(e) => set("company", { ...draft.company, name: e.target.value })} /></label>
        <label>Должность<input value={draft.company.title} onChange={(e) => set("company", { ...draft.company, title: e.target.value })} /></label>
        <label>Город<input value={draft.address.city} onChange={(e) => set("address", { ...draft.address, city: e.target.value })} /></label>
        <label>Страна<input value={draft.address.country} onChange={(e) => set("address", { ...draft.address, country: e.target.value })} /></label>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Отмена</button>
          <button type="submit" className="primary" disabled={!valid}>Сохранить</button>
        </div>
      </form>
    </div>
  );
}
