(() => {
  const input = document.getElementById("petName");
  const save = document.getElementById("save");
  const cancel = document.getElementById("cancel");

  function submit() {
    window.renamePet.submit(input.value);
  }

  async function boot() {
    const config = await window.renamePet.getConfig();
    input.value = config.petName || "";
    input.focus();
    input.select();
  }

  save.addEventListener("click", submit);
  cancel.addEventListener("click", () => window.renamePet.cancel());
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      submit();
    } else if (event.key === "Escape") {
      window.renamePet.cancel();
    }
  });

  boot();
})();
