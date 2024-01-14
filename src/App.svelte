<script lang="ts">
  import Form, { state } from "$lib/components/form";
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
      class="flex flex-col w-full mt-6 h-[calc(100vh-16rem)] pb-6 overflow-auto"
    >
      {#each $state as comprinha}
        <div><pre>{JSON.stringify(comprinha, null, 2)}</pre></div>
      {/each}
    </div>
  </div>
</div>
