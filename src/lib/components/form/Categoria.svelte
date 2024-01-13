<script lang="ts">
  import { Label } from "../ui/label";
  import * as Select from "../ui/select";
  import { getFieldErrors } from "./Form.svelte";
  import { categorias } from "$lib/store/categorias";
  import type { ComprinhaError } from "$lib/store/comprinhas";

  export let error: ComprinhaError | null;

  $: getError = getFieldErrors(error);
</script>

<div class="grid col-span-4 md:col-span-2">
  <Label for="categoria" class="group-hover:text-purple-light font-normal">
    Categoria
  </Label>
  <Select.Root items={categorias}>
    <Select.Trigger
      class="mt-2 w-full bg-base-gray-400 group-hover:border-purple-light focus:ring-transparent focus:border-purple-light"
    >
      <Select.Value placeholder="Selecione" />
    </Select.Trigger>
    <Select.Content>
      {#each categorias as { value, title, icon }}
        <Select.Item {value}>
          <div class="flex flex-1 items-center justify-between">
            <span>{title}</span>
            <span class="text-sm text-base-gray-400">{icon}</span>
          </div>
        </Select.Item>
      {/each}
    </Select.Content>
    <Select.Input name="categoria" />
  </Select.Root>
  {#if error}
    {@const message = getError("categoria")}
    <p class="text-red-500 text-sm">{@html message ?? "&nbsp;"}</p>
  {/if}
</div>
