document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copy-email");
  const status = document.getElementById("copy-status");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const user = "valeria.graffeo";
    const domain = "gmail";
    const tld = "com";

    const email = `${user}@${domain}.${tld}`;

    try {
      await navigator.clipboard.writeText(email);
      status.textContent = "Copied.";
    } catch {
      status.textContent = email;
    }
  });
});
