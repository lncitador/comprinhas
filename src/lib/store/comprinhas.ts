import { z } from "zod";
import { writable } from "svelte/store";
import type { SetNonNullable } from "type-fest";
import { None, Option, Some } from "oxide.ts";
import { unidades } from "./unidades";
import { categorias } from "./categorias";
import { randomUUID } from "../utils";

export const comprinhasSchema = z.object({
  id: z.string().uuid().nullish(),
  verificado: z.boolean().default(false),
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

  const state = writable<Required<SetNonNullable<Comprinha, "id">>[]>(
    local ? JSON.parse(local) : []
  );

  function add(
    comprinha: Omit<Comprinha, "id" | "verificado">
  ): Option<ComprinhaError> {
    const parse = comprinhasSchema.safeParse(comprinha);

    if (parse.success === false) {
      return Some(parse.error);
    }

    state.update((comprinhas) => {
      const novaComprinha = {
        ...parse.data,
        id: randomUUID(),
      };

      const newState = [novaComprinha, ...comprinhas];
      localStorage.setItem("comprinhas", JSON.stringify(newState));
      return newState;
    });

    return None;
  }

  function marcar(id: string) {
    state.update((comprinhas) => {
      const index = comprinhas.findIndex((c) => c.id === id);
      comprinhas[index].verificado = !comprinhas[index].verificado;
      localStorage.setItem("comprinhas", JSON.stringify(comprinhas));
      return comprinhas;
    });
  }

  function reset() {
    state.set([]);
    localStorage.removeItem("comprinhas");
  }

  return {
    state,
    add,
    reset,
    marcar,
  };
}

export type ComprinhaStore = ReturnType<typeof comprinhas>;
