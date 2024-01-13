import { z } from "zod";
import { writable } from "svelte/store";
import { None, Option, Some } from "oxide.ts";
import { unidades } from "./unidades";
import { categorias } from "./categorias";

export const comprinhasSchema = z.object({
  item: z.string().min(3, { message: "Item deve ter pelo menos 3 letras" }),
  quantidade: z.string().refine(
    (q) => {
      const n = parseInt(q);
      return !isNaN(n) && n > 0;
    },
    {
      message: "Quantidade inválida",
    }
  ),
  unidade: z
    .string()
    .refine((value) => unidades.map((u) => u.value).includes(value), {
      message: "Selecione uma unidade",
    }),
  categoria: z
    .string()
    .refine((value) => categorias.map((c) => c.value).includes(value), {
      message: "Selecione uma categoria",
    }),
});

export type Comprinha = z.infer<typeof comprinhasSchema>;
export type ComprinhaError = z.ZodError<Comprinha>;

export function comprinhas() {
  const local = localStorage.getItem("comprinhas");

  const state = writable<Comprinha[]>(local ? JSON.parse(local) : []);

  function add(comprinha: Comprinha): Option<ComprinhaError> {
    const parse = comprinhasSchema.safeParse(comprinha);

    if (parse.success === false) {
      return Some(parse.error);
    }

    state.update((comprinhas) => {
      const newState = [comprinha, ...comprinhas];
      localStorage.setItem("comprinhas", JSON.stringify(newState));
      return newState;
    });

    return None;
  }

  function reset() {
    state.set([]);
    localStorage.removeItem("comprinhas");
  }

  return {
    state,
    add,
    reset,
  };
}

export type ComprinhaStore = ReturnType<typeof comprinhas>;
