<script lang="ts">
  import { tasks, toggleTaskCompletion, removeTask, setTaskEdit } from './stores/tasklist';
  import { filter, sortBy } from './stores/taskfilters';

  // Computed filtered and sorted tasks
  $: filtered = $tasks.filter(task =>
    $filter === "all" ? true
    : $filter === "active" ? !task.completed
    : task.completed
  );

  $: sorted = [...filtered].sort((a, b) => {
    if ($sortBy === 'dueDateAsc') {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      return (a.dueDate||'').localeCompare(b.dueDate||'');
    }
    if ($sortBy === 'dueDateDesc') {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      return (b.dueDate||'').localeCompare(a.dueDate||'');
    }
    if ($sortBy === 'createdAsc') return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    if ($sortBy === 'createdDesc') return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    if ($sortBy === 'alphaAsc') return a.description.localeCompare(b.description);
    if ($sortBy === 'alphaDesc') return b.description.localeCompare(a.description);
    return 0;
  });

  let confirmDelete: string|number|null = null;

  function askDel(id: string|number) {
    confirmDelete = id;
    setTimeout(() => confirmDelete === id && (confirmDelete = null), 2200);
  }
</script>

<div class="tasks-area">
  {#if sorted.length === 0}
    <div class="empty-list">
      <span>No tasks{#if $filter !== 'all'} in this view{/if}.</span>
    </div>
  {:else}
    <ul class="tasks-list">
      {#each sorted as task (task.id)}
        <li class:completed={task.completed}>
          <span class="complete-box">
            <input type="checkbox" checked={task.completed} on:change={() => toggleTaskCompletion(task)}/>
          </span>
          <span class="desc">{task.description}</span>
          {#if task.dueDate}
            <span class="due-date">📅 {task.dueDate.slice(0,10)}</span>
          {/if}
          <span class="actions">
            <button class="edit-btn" title="Edit" on:click={() => setTaskEdit(task)}>✏️</button>
            {#if confirmDelete === task.id}
              <button class="delete-btn" title="Confirm delete" on:click={() => removeTask(task.id)}>Sure?</button>
            {:else}
              <button class="delete-btn" title="Delete" on:click={() => askDel(task.id)}>🗑</button>
            {/if}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .tasks-area {
    margin: 0.5rem 0 0.3rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 150px;
  }
  .tasks-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.41rem;
  }
  .tasks-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1.2px solid var(--color-border);
    background: #fff;
    border-radius: 8px;
    padding: 0.76rem 0.9rem;
    font-size: 1.11rem;
    font-weight: 400;
    transition: background 0.15s;
  }
  .tasks-list li.completed {
    background: #f5f7fb;
    color: var(--color-task-completed);
    text-decoration: line-through;
    opacity: 0.7;
  }
  .complete-box input[type='checkbox'] {
    transform: scale(1.18);
    accent-color: var(--color-accent);
    margin: 0 5px 0 0;
  }
  .desc { flex: 1; }
  .due-date {
    font-size: 0.96rem;
    color: var(--color-primary);
    margin-right: 0.6rem;
    margin-left: 0.17rem;
  }
  .actions {
    display: flex;
    gap: 0.32rem;
    align-items: center;
  }
  .edit-btn, .delete-btn {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: var(--color-primary);
    opacity: 0.75;
    border-radius: 4px;
    padding: 2px 6px;
    transition: background 0.12s, color 0.12s;
  }
  .edit-btn:hover, .delete-btn:hover {
    color: var(--color-accent);
    background: #f7eaad3d;
    opacity: 1;
  }
  .empty-list {
    margin: 2.1rem auto 0 auto;
    color: #b8bac2;
    font-size: 1.21rem;
    text-align: center;
  }
</style>
