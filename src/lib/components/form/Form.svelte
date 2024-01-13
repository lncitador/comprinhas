<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import type { Comprinha, ComprinhaError } from "$lib/store/comprinhas";
  import { comprinhas } from "$lib/store/comprinhas";
  import { match } from "oxide.ts";

  export let { state, add, reset } = comprinhas();

  export const form = writable<Comprinha>({
    categoria: "",
    item: "",
    quantidade: "",
    unidade: "",
  });

  export function getFieldErrors(error: ComprinhaError | null) {
    return (field: keyof Comprinha) => {
      return error?.formErrors.fieldErrors[field]?.at(0);
    };
  }
</script>

<script lang="ts">
  import Item from "./Item.svelte";
  import Quantidade from "./Quantidade.svelte";
  import Categoria from "./Categoria.svelte";
  import Submit from "./Submit.svelte";

  let error: ComprinhaError | null;

  function onSubmit({ target }: Event) {
    const formData = new FormData(target as HTMLFormElement);
    const data = Object.fromEntries(formData) as Comprinha;

    error = match(add(data), {
      Some: (error) => error,
      None: () => {
        form.set({
          categoria: "",
          item: "",
          quantidade: "",
          unidade: "",
        });
        return null;
      },
    });
  };
</script>

<form on:submit|preventDefault={onSubmit} class="grid grid-cols-8 mt-8 gap-3">
  <Item {error} />
  <Quantidade {error} />
  <Categoria {error} />
  <Submit {error} />
</form>