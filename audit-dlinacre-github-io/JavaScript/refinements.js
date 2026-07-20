/**
 * Robust LocalStorage Wrapper & Post-Copy Guidance Modal snippet
 */

function safeGetStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch (e) {
    console.warn("LocalStorage access restricted:", e);
    return fallback;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("LocalStorage write restricted:", e);
  }
}

function showPostCopyModal() {
  const existing = document.getElementById("postCopyModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "postCopyModal";
  modal.className = "audit-modal-backdrop";
  modal.innerHTML = `
    <div class="audit-modal">
      <h3 style="margin-bottom: 12px; font-size: 18px; color: var(--success);">✨ Prompt Copied Successfully!</h3>
      <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
        Your production-grade audit prompt is now in your clipboard. Open <strong>Arena Agent Mode</strong>, start a new session, and paste your prompt to execute the multi-expert audit.
      </p>
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button type="button" onclick="document.getElementById('postCopyModal').remove()" style="background: var(--bg-hover); color: var(--text); border: 1px solid var(--border); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 500;">Got it</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
