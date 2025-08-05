<script lang="ts">
  import { taskEdit, setTaskEdit, createTask, updateTask } from './stores/tasklist';

  let desc = '';
  let dueDate = '';
  let error = null;

  // Clear fields on new task edit state
  $: if (!$taskEdit) {
    desc = ''; 
    dueDate = '';
    error = null;
  } else if ($taskEdit) {
    desc = $taskEdit.description;
    dueDate = $taskEdit.dueDate ? $taskEdit.dueDate.slice(0, 10) : '';
    error = null;
  }

  function reset() {
    setTaskEdit(null);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!desc.trim()) {
      error = "Please enter a description.";
      return;
    }
    error = null;
    if ($taskEdit) {
      await updateTask({ ...$taskEdit, description: desc, dueDate });
      reset();
    } else {
      await createTask({ description: desc, dueDate });
      desc = '';
      dueDate = '';
    }
  }
</script>

<form class="task-form" on:submit={handleSubmit}>
  <input
    class="desc-input"
    type="text"
    bind:value={desc}
    maxlength={120}
    placeholder="What needs to be done?"
    autocomplete="off"
    required
  />
  <input
    class="date-input"
    type="date"
    bind:value={dueDate}
    aria-label="Due date"
  />
  <button class="submit-btn" type="submit">
    {#if $taskEdit}Save Changes{:else}Add Task{/if}
  </button>
  {#if $taskEdit}
    <button class="cancel-btn" type="button" on:click={reset}>Cancel</button>
  {/if}
  {#if error}
    <span class="error">{error}</span>
  {/if}
</form>

<style>
  .task-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1.1rem;
    align-items: center;    
  }
  .desc-input {
    flex: 2;
    min-width: 170px;
    border: 1.5px solid var(--color-secondary);
    border-radius: 8px;
    font-size: 1.1rem;
    padding: 0.44rem 0.72rem;
  }
  .date-input {
    flex: 1;
    min-width: 135px;
    max-width: 158px;
    border: 1.2px solid var(--color-secondary);
    border-radius: 8px;
    font-size: 1.05rem;
    padding: 0.36rem 0.34rem;
  }
  .submit-btn {
    background: var(--color-accent);
    border: none;
    color: #31332e;
    font-weight: 600;
    font-size: 1.08rem;
    border-radius: 7px;
    padding: 0.45rem 1.14rem;
    cursor: pointer;
  }
  .cancel-btn {
    background: none;
    color: #8a99ae;
    border: none;
    font-size: .94rem;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 0.34rem;
  }
  .error {
    color: #f27272;
    margin-left: 1rem;
    font-size: 1.04rem;
  }
</style>
