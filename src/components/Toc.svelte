<script lang="ts">
  import { onMount } from 'svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  type Item = { id: string; title: string; children?: Item[] };
  let { items }: { items: Item[] } = $props();

  let active = $state('');
  let open = $state(false);

  const flat = items.flatMap((i) => [i, ...(i.children ?? [])]);

  onMount(() => {
    const targets = flat
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    // Highlight the last section whose top has scrolled past the top third of the screen.
    const update = () => {
      const line = window.innerHeight / 3;
      let current = targets[0]?.id ?? '';
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      active = current;
    };
    update();
    // Measure at most once per frame while scrolling.
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const inside = (item: Item) => item.children?.some((c) => c.id === active) ?? false;
</script>

{#snippet list()}
  <ol class="space-y-0.5 font-sans text-[0.9rem] leading-snug">
    {#each items as item}
      <li>
        <a
          href={`#${item.id}`}
          onclick={() => (open = false)}
          aria-current={active === item.id ? 'location' : undefined}
          class="block rounded-md px-2.5 py-1.5 no-underline transition-colors {active === item.id
            ? 'bg-raised font-bold text-strong'
            : inside(item)
              ? 'font-bold text-strong hover:bg-raised/60'
              : 'text-soft hover:bg-raised/60 hover:text-strong'}"
        >
          {item.title}
        </a>
        {#if item.children}
          <ol class="mt-0.5 mb-2 ml-3.5 space-y-px border-l border-line pl-2">
            {#each item.children as child}
              <li>
                <a
                  href={`#${child.id}`}
                  onclick={() => (open = false)}
                  aria-current={active === child.id ? 'location' : undefined}
                  class="block rounded px-2 py-1 text-[0.84rem] no-underline transition-colors {active === child.id
                    ? 'bg-raised text-accent'
                    : 'text-muted hover:text-strong'}"
                >
                  {child.title}
                </a>
              </li>
            {/each}
          </ol>
        {/if}
      </li>
    {/each}
  </ol>
{/snippet}

<!-- Phone / tablet: top bar -->
<div class="border-b border-line bg-sunken/95 backdrop-blur-sm lg:hidden">
  <div class="flex items-center gap-2 px-4 py-2.5">
    <a href="#top" class="mr-auto truncate font-sans text-sm font-bold text-strong no-underline">Three is a Magic Number</a>
    <div class="shrink-0">
      <ThemeSwitcher align="down" compact />
    </div>
    <button
      type="button"
      class="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-raised px-2.5 py-1.5 font-sans text-sm text-fg hover:border-line-strong"
      aria-expanded={open}
      aria-controls="toc-mobile"
      onclick={() => (open = !open)}
    >
      <svg class="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {#if open}
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        {:else}
          <path d="M2.5 4h11M2.5 8h11M2.5 12h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        {/if}
      </svg>
      <span class="sr-only sm:not-sr-only">{open ? 'Close' : 'Contents'}</span>
    </button>
  </div>
  {#if open}
    <nav id="toc-mobile" aria-label="Table of contents" class="max-h-[75vh] overflow-y-auto border-t border-line px-3 py-3">
      {@render list()}
    </nav>
  {/if}
</div>

<!-- Desktop: sidebar -->
<div class="hidden h-screen flex-col border-r border-line bg-sunken lg:flex">
  <a href="#top" class="block px-5 pt-7 pb-5 no-underline">
    <span class="block font-serif text-lg leading-tight font-semibold text-strong">Three is a Magic Number</span>
    <span class="mt-1 block font-sans text-xs text-muted">UNHO 207 · Fall 2026</span>
  </a>
  <nav aria-label="Table of contents" class="min-h-0 flex-1 overflow-y-auto px-3 pb-6">
    {@render list()}
  </nav>
  <div class="border-t border-line px-4 py-4">
    <p class="mb-2 font-sans text-xs font-bold text-muted">Color theme</p>
    <ThemeSwitcher align="up" />
  </div>
</div>
