<script lang="ts">
  import TaskList from './TaskList.svelte';
  import TaskForm from './TaskForm.svelte';
  import Sidebar from './Sidebar.svelte';
  import AuthPanel from './AuthPanel.svelte';
  import { user } from './stores/auth';
  import { onMount } from 'svelte';

  // On initial load, try to restore user session
  onMount(() => {
    // Try to restore user from localStorage
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      user.set(JSON.parse(saved));
    }
  });
</script>

<svelte:head>
  <title>To-Do List App</title>
  <meta name="description" content="Modern Svelte To-Do List application"/>
</svelte:head>

<div class="todos-app">
  <header class="main-header">
    <h1>📝 To-Do</h1>
    <div class="auth-zone">
      <AuthPanel/>
    </div>
  </header>

  <div class="main-content">
    <aside class="sidebar">
      <Sidebar/>
    </aside>
    <section class="task-section">
      {#if $user}
        <TaskForm/>
        <TaskList/>
      {:else}
        <div class="login-message">
          <p><strong>Sign in</strong> to manage your tasks.</p>
        </div>
      {/if}
    </section>
  </div>

  <footer class="footer">
    <p>To-Do List App &mdash; Built with <a href="https://svelte.dev/" target="_blank">Svelte</a></p>
  </footer>
</div>

<style>
  :root {
    --color-accent: #ffbe2d;
    --color-primary: #2d8cff;
    --color-secondary: #e0e7ef;
    --color-bg: #fff;
    --color-task-completed: #a8b5c3;
    --color-border: #dde6ed;
    --radius: 14px;
  }

  .todos-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-bg);
  }
  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1rem 1.3rem 1rem;
    border-bottom: 1.5px solid var(--color-secondary);
    background: var(--color-primary);
    color: #fff;
  }
  .main-header h1 {
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: -1px;
    margin: 0;
  }
  .auth-zone {
    display: flex;
    align-items: center;
  }
  .main-content {
    display: flex;
    flex: 1;
    gap: 2rem;
    width: 100%;
    max-width: 1050px;
    margin: 0 auto;
    padding: 1.6rem 1rem;
  }
  .sidebar {
    min-width: 190px;
    max-width: 230px;
    background: var(--color-secondary);
    border-radius: var(--radius);
    padding: 2rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
  }
  .task-section {
    flex: 1;
    background: #fff;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius);
    box-shadow: 0 2px 7px 0 rgba(35,50,88,0.07);
    padding: 2rem 1.3rem 1.1rem 1.3rem;
    position: relative;
  }
  .footer {
    text-align: center;
    padding: 1.3rem 0 0.7rem 0;
    background: var(--color-secondary);
    color: #344659;
    margin-top: auto;
    font-size: .95rem;
    border-radius: 0 0 var(--radius) var(--radius);
  }
  .footer a {
    color: var(--color-primary);
    text-decoration: underline;
  }
  .login-message {
    margin: auto;
    text-align: center;
    font-size: 1.13rem;
    color: #878ea5;
  }
  @media (max-width: 900px) {
    .main-content {
      flex-direction: column;
      gap: 0.5rem;
    }
    .sidebar {
      flex-direction: row;
      min-width: 0;
      max-width: none;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 600px) {
    .main-header {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    .main-content {
      padding: 1rem 0.2rem;
    }
    .sidebar, .task-section {
      padding: 1rem 0.5rem;
      border-radius: 10px;
    }
    .footer {
      border-radius: 0;
      font-size: .84rem;
    }
  }
</style>
