<script lang="ts">
  import Form, { state, marcar } from "$lib/components/form";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import { match } from "ts-pattern";

  const Unidades = ["und", "kg", "l"] as const;
  type Unidades = (typeof Unidades)[number];

  const descricao = (unidade: string) => {
    return match(unidade as Unidades)
      .with("und", () => "unidades")
      .with("kg", () => "kg")
      .with("l", () => "litros")
      .exhaustive();
  };
</script>

<div
  class="flex flex-col min-h-screen min-w-[425px] items-center bg-base-gray-600"
>
  <div id="cover" class="w-full h-44 bg-cover" />
  <div
    class="px-6 md:px-4 lg:px-0 max-w-3xl w-full -mt-28 h-96 text-base-gray-200"
  >
    <h2 class="text-base-gray-100 text-2xl font-bold">Lista de Compras</h2>
    <Form />
    <div
      id="comprinhas"
      class="flex flex-col w-full mt-6 h-[calc(100vh-16rem)] pb-6 overflow-auto gap-3"
    >
      {#each $state as { item, quantidade, unidade, verificado, id }}
        <div
          class="flex items-center justify-between w-full h-16 p-4 bg-base-gray-400 rounded-md border border-base-gray-300"
        >
          <div class="flex items-center gap-4">
            <Checkbox checked={verificado} on:click={() => marcar(id)} />
            <div class="group flex flex-col text-base-gray-100" class:verificado>
              <span class="text-xs font-bold group-[.verificado]:line-through group-[.verificado]:font-medium" >
                {item}
              </span>
              <div class="flex gap-1">
                <span class="text-xs">
                  {quantidade}
                </span>
                <span class="text-xs">
                  {descricao(unidade)}
                </span>
              </div>
            </div>
          </div>
          <div class="flex">oi</div>
          <!-- <pre>{JSON.stringify(comprinha, null, 2)}</pre> -->
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .verificado {
    @apply text-base-gray-200
  }
</style>