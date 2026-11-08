<script lang="ts">
  import { onMount } from 'svelte';
  import themes from '../data/themes.json';

  let { align = 'up', compact = false }: { align?: 'up' | 'down'; compact?: boolean } = $props();

  const KEY = 'portfolio-theme';
  const groups = [
    { label: 'Dark', items: themes.filter((t) => t.mode === 'dark') },
    { label: 'Light', items: themes.filter((t) => t.mode === 'light') },
  ];

  let current = $state('catppuccin');
  let open = $state(false);
  let root: HTMLDivElement;
  const uid = Math.random().toString(36).slice(2, 8);

  const active = $derived(themes.find((t) => t.id === current) ?? themes[0]);

  onMount(() => {
    current = document.documentElement.dataset.theme ?? 'catppuccin';
    // Keep every switcher on the page in sync.
    const sync = (e: Event) => (current = (e as CustomEvent<string>).detail);
    window.addEventListener('themechange', sync);
    const outside = (e: PointerEvent) => {
      if (open && !root.contains(e.target as Node)) open = false;
    };
    document.addEventListener('pointerdown', outside);
    return () => {
      window.removeEventListener('themechange', sync);
      document.removeEventListener('pointerdown', outside);
    };
  });

  function apply(id: string) {
    const set = () => {
      document.documentElement.dataset.theme = id;
      try {
        localStorage.setItem(KEY, id);
      } catch {}
      window.dispatchEvent(new CustomEvent('themechange', { detail: id }));
    };
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !calm) doc.startViewTransition(set);
    else set();
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      open = false;
      root.querySelector<HTMLButtonElement>('button')?.focus();
    }
  }
</script>

<svelte:window onkeydown={onKey} />

<div
  class="relative font-sans"
  bind:this={root}
  onfocusout={(e) => {
    // Close when keyboard focus leaves the switcher.
    if (open && !root.contains(e.relatedTarget as Node | null)) open = false;
  }}
>
  <button
    type="button"
    class="flex w-full items-center gap-2.5 rounded-md border border-line bg-raised px-2.5 py-1.5 text-left text-sm text-fg transition-colors hover:border-line-strong"
    aria-expanded={open}
    aria-controls={open ? `themes-${uid}` : undefined}
    onclick={() => (open = !open)}
  >
    <span class="flex shrink-0 -space-x-1" aria-hidden="true">
      {#each active.swatches.slice(1, 4) as c}
        <span class="size-3 rounded-full ring-2 ring-raised" style:background={c}></span>
      {/each}
    </span>
    <span class:sr-only={compact} class="min-w-0 flex-1 truncate"><span class="sr-only">Color theme: </span>{active.name}</span>
    <svg class="size-3.5 shrink-0 text-muted" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  {#if open}
    <div
      id={`themes-${uid}`}
      class="absolute z-40 max-h-[min(70vh,32rem)] w-64 overflow-y-auto rounded-lg border border-line-strong bg-raised p-1.5 shadow-[0_12px_32px_-8px_rgb(0_0_0/0.45)] {align === 'up'
        ? 'bottom-full left-0 mb-2'
        : 'top-full right-0 mt-2'}"
    >
      {#each groups as g}
        <fieldset class="mb-1 last:mb-0">
          <legend class="px-2 pt-1.5 pb-1 text-xs font-bold tracking-wide text-muted">{g.label}</legend>
          {#each g.items as t}
            <label
              class="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm has-checked:bg-sunken has-checked:text-strong hover:bg-sunken/70 has-focus-visible:outline-2 has-focus-visible:outline-accent"
            >
              <input
                type="radio"
                name={`theme-${uid}`}
                value={t.id}
                checked={current === t.id}
                onchange={() => apply(t.id)}
                class="sr-only"
              />
              <span
                class="flex h-5 w-9 shrink-0 items-center justify-center gap-0.5 rounded border border-line"
                style:background={t.swatches[0]}
                aria-hidden="true"
              >
                {#each t.swatches.slice(1, 4) as c}
                  <span class="size-1.5 rounded-full" style:background={c}></span>
                {/each}
              </span>
              <span class="flex-1">{t.name}</span>
              {#if current === t.id}
                <svg class="size-3.5 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              {/if}
            </label>
          {/each}
        </fieldset>
      {/each}
    </div>
  {/if}
</div>
