<script lang="ts">
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import { form, getFieldErrors } from "./Form.svelte";
  import type { ComprinhaError } from "$lib/store/comprinhas";

  export let error: ComprinhaError | null;

  $: getError = getFieldErrors(error);
</script>

<div class="grid group col-span-8 md:col-span-3">
  <Label for="item" class="group-hover:text-purple-light font-normal"
    >Item</Label
  >
  <Input
    bind:value={$form.item}
    class="mt-2 bg-base-gray-500 group-hover:border-purple-light focus-visible:ring-transparent focus-visible:border-purple-light"
    id="item"
    type="text"
    name="item"
  />
  {#if error}
    {@const message = getError("item")}
    <p class="text-red-500 text-sm">{@html message ?? "&nbsp;"}</p>
  {/if}
</div>