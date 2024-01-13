<script lang="ts">
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import * as Select from "../ui/select";
  import { form, getFieldErrors } from "./Form.svelte";
  import { formatNumeral } from "cleave-zen";
  import { unidades } from "$lib/store/unidades";
  import type { ComprinhaError } from "$lib/store/comprinhas";

  export let error: ComprinhaError | null;

  $: formattedValue = formatNumeral($form.quantidade, {
    numeralDecimalMark: ",",
    delimiter: ".",
    numeralDecimalScale: 2,
    stripLeadingZeroes: true,
  });

  $: getError = getFieldErrors(error);

  function onInput() {
    $form.quantidade = formattedValue;
  }
</script>

<div class="grid col-span-4 sm:col-span-3 md:col-span-2">
  <Label
    for="quantidade"
    class="group-hover:text-purple-light font-normal"
  >
    Quantidade
  </Label>
  <div class="flex">
    <Input
      bind:value={$form.quantidade}
      on:input={onInput}
      class="mt-2 bg-base-gray-500 group-hover:border-purple-light focus-visible:ring-transparent rounded-r-none focus-visible:border-purple-light"
      id="quantidade"
      type="text"
      name="quantidade"
    />
    <div class="flex w-20">
      <Select.Root items={unidades}>
        <Select.Trigger
          class="mt-2 w-36 bg-base-gray-400 group-hover:border-purple-light focus:ring-transparent rounded-l-none focus:border-purple-light"
        >
          <Select.Value placeholder="UND" />
        </Select.Trigger>
        <Select.Content>
          {#each unidades as { value, label }}
            <Select.Item {value}>
              <div class="flex flex-1 items-center justify-between">
                <span>{label}</span>
              </div>
            </Select.Item>
          {/each}
        </Select.Content>
        <Select.Input name="unidade" />
      </Select.Root>
    </div>
  </div>
  {#if error}
    {@const quantidade = getError("quantidade")}
    {@const unidade = getError("unidade")}
    <p class="text-red-500 text-sm">
      {@html quantidade ?? unidade ?? "&nbsp;"}
    </p>
  {/if}
</div>