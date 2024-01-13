<script lang="ts">
  // @ts-expect-error
  import PlusIcon from "../../../assets/plus.svg?component"
  import type { ComprinhaError } from "$lib/store/comprinhas";

  export let error: ComprinhaError | null;

</script>

<div class="grid col-span-8 sm:col-span-1 sm:items-end" class:error>
  <button
    class="h-10 flex w-full mt-4 sm:mt-0 items-center justify-center text-2xl rounded-md bg-purple"
  >
    <PlusIcon />
  </button>
</div>

<style>
  .error {
    @apply mb-5;
  }
</style>