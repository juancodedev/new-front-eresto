import type { Route } from "./admin/+types/adminHome";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Erestó" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
    <h1>Bienvenido a la Página Principal</h1>
    <label htmlFor="options">Selecciona una opción:</label>
    <select id="options">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
    </select>
</div>
  )
}