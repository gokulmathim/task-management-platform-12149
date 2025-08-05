<script lang="ts">
  import { user, login, signup, logout } from './stores/auth';
  import { writable } from 'svelte/store';

  const mode = writable<'signin'|'signup'>('signin');
  let email = '';
  let password = '';
  let error: string|null = null;
  let loading = false;

  function switchMode() {
    error = null;
    mode.update(v => v === 'signin' ? 'signup' : 'signin');
  }

  async function handleAuth(e: Event) {
    e.preventDefault();
    error = null;
    loading = true;
    try {
      if ($mode === "signin") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      // err is assumed to be unknown; attempt to provide a message.
      if (err && typeof err === "object" && "message" in err && typeof (err as {message?:unknown}).message === "string") {
        error = (err as {message:string}).message;
      } else {
        error = "Error";
      }
    } finally {
      loading = false;
    }
  }

  function handleLogout() {
    logout();
  }
</script>

{#if $user}
  <div class="auth-info">
    <span class="user-email">{$user.email}</span>
    <button class="auth-btn logout" on:click={handleLogout} title="Log out">Log out</button>
  </div>
{:else}
  <form class="auth-form" on:submit={handleAuth} autocomplete="on">
    <label>
      Email
      <input required type="email" bind:value={email} autocomplete="username"/>
    </label>
    <label>
      Password
      <input required type="password" bind:value={password} autocomplete="current-password"/>
    </label>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    <button class="auth-btn" type="submit" disabled={loading}>
      {#if loading}…{/if}
      {#if $mode === 'signin'}Sign In{:else}Sign Up{/if}
    </button>
    <button class="auth-switch" type="button" on:click={switchMode}>
      {$mode === 'signin' ? 'New user? Sign up' : 'Have an account? Sign in'}
    </button>
  </form>
{/if}

<style>
  .auth-info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .user-email { font-weight: 500; font-size: 1.08rem; }
  .auth-btn, .auth-switch {
    font-size: .99rem;
    font-weight: 400;
    padding: 0.28rem 0.92rem;
    background: var(--color-accent);
    color: #333;
    margin-left: 0.45rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.19s;
  }
  .auth-btn.logout {
    background: #f27272;
    color: #f8f8f8;
  }
  .auth-btn:disabled {
    opacity: 0.75;
  }
  .auth-form {
    display: flex;
    align-items: center;
    gap: 0.48rem;
  }
  .auth-form label {
    font-size: .97rem;
    font-weight: 400;
    margin-right: 0.38rem;
  }
  .auth-form input {
    font-size: 0.99rem;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    border: 1.2px solid var(--color-secondary);
    margin-left: 0.22rem;
    min-width: 120px;
  }
  .auth-switch {
    background: transparent;
    color: var(--color-primary);
    margin-left: 0.36rem;
    border-radius: 5px;
    border: none;
    font-size: 0.93rem;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.17s;
    padding: 0.17rem 0.3rem;
  }
  .error {
    color: #f27272;
    font-size: 0.99rem;
    font-weight: 500;
    margin: 0 0.3rem;
  }
</style>
