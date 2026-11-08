<script lang="ts">
  import { onMount } from 'svelte';

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
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  });

  const isActive = (item: Item) =>
    active === item.id || (item.children?.some((c) => c.id === active) ?? false);
</script>

{#snippet list()}
  <ol class="space-y-1 font-sans text-sm">
    {#each items as item}
      <li>
        <a
          href={`#${item.id}`}
          onclick={() => (open = false)}
          aria-current={active === item.id ? 'location' : undefined}
          class="block rounded px-2 py-1 no-underline {isActive(item)
            ? 'bg-surface0 text-peach'
            : 'text-subtext1 hover:bg-surface0/60 hover:text-text'}"
        >
          {item.title}
        </a>
        {#if item.children}
          <ol class="mt-1 ml-3 space-y-0.5 border-l border-surface1 pl-2">
            {#each item.children as child}
              <li>
                <a
                  href={`#${child.id}`}
                  onclick={() => (open = false)}
                  aria-current={active === child.id ? 'location' : undefined}
                  class="block rounded px-2 py-0.5 no-underline {active === child.id
                    ? 'text-peach'
                    : 'text-subtext0 hover:text-text'}"
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

<!-- Phone / tablet: sticky bar with a toggle -->
<div class="border-b border-surface0 bg-mantle/95 backdrop-blur lg:hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <span class="font-sans text-sm font-semibold text-text">Three is a Magic Number</span>
    <button
      type="button"
      class="rounded border border-surface1 px-3 py-1 font-sans text-sm text-text hover:bg-surface0"
      aria-expanded={open}
      aria-controls="toc-mobile"
      onclick={() => (open = !open)}
    >
      {open ? 'Close' : 'Contents'}
    </button>
  </div>
  {#if open}
    <nav id="toc-mobile" aria-label="Table of contents" class="max-h-[70vh] overflow-y-auto px-4 pb-4">
      {@render list()}
    </nav>
  {/if}
</div>

<!-- Desktop: sticky sidebar -->
<nav
  aria-label="Table of contents"
  class="hidden h-screen overflow-y-auto border-r border-surface0 bg-mantle px-4 py-6 lg:block"
>
  <p class="mb-3 px-2 font-sans text-xs font-semibold tracking-wide text-overlay1 uppercase">Contents</p>
  {@render list()}
</nav>
