<script lang="ts">
  import { filter, setFilter, sortBy, setSortBy } from './stores/taskfilters';
  export let className = '';
</script>

<div class={`sidebar-panel ${className}`}>
  <div class="sidebar-section">
    <h2>Filter</h2>
    <div>
      <button
        class:selected={$filter === "all"}
        on:click={() => setFilter("all")}
        aria-pressed={$filter === 'all'}
      >All</button>
      <button
        class:selected={$filter === "active"}
        on:click={() => setFilter("active")}
        aria-pressed={$filter === 'active'}
      >Active</button>
      <button
        class:selected={$filter === "completed"}
        on:click={() => setFilter("completed")}
        aria-pressed={$filter === 'completed'}
      >Completed</button>
    </div>
  </div>

  <hr/>

  <div class="sidebar-section">
    <h2>Sort By</h2>
    <select bind:value={$sortBy} on:change={(e) => setSortBy(e.target.value)}>
      <option value="dueDateAsc">Due Date ↑</option>
      <option value="dueDateDesc">Due Date ↓</option>
      <option value="createdAsc">Created ↑</option>
      <option value="createdDesc">Created ↓</option>
      <option value="alphaAsc">Alphabetical A-Z</option>
      <option value="alphaDesc">Alphabetical Z-A</option>
    </select>
  </div>
</div>

<style>
  .sidebar-panel {
    display: flex;
    flex-direction: column;
    gap: 2.1rem;
  }
  .sidebar-section h2 {
    font-size: 1rem;
    margin-bottom: .39rem;
    color: var(--color-primary);
    font-weight: 700;
  }
  .sidebar-section > div {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }
  .sidebar-section button {
    font-size: .99rem;
    color: #3c4c60;
    background: #fff;
    border: 1px solid var(--color-border);
    border-radius: 7px;
    padding: 0.23rem .89rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .sidebar-section button.selected, .sidebar-section button[aria-pressed="true"] {
    background: var(--color-accent);
    color: #3c2a00;
    border: 1.5px solid var(--color-accent);
  }
  select {
    font-size: .98rem;
    border-radius: 7px; 
    padding: 0.18rem .76rem;
    border: 1px solid var(--color-border);
    background: #fff;
  }
  hr {
    margin: 1.5rem 0 1rem 0;
    border: none;
    border-top: 1px solid var(--color-border);
  }
</style>
