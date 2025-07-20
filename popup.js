// Dump tab info to clipboard with customizable fields and format (json/string)
class TabsDump {
  constructor() {
    const $ = (s) => document.querySelector(s);
    this.$ = $;
    this.ui = {
      toggle: $("#settings-toggle"),
      panel: $("#settings-panel"),
      run: $("#run-btn"),
      status: $("#status"),
      output: $("#output-area"),
      formats: document.querySelectorAll('input[name="format"]'),
      fields: document.querySelectorAll('input[name="fields"]'),
    };
    this.settings = { format: "string", fields: ["title"] };
    this.bind();
  }

  bind() {
    const { toggle, run, formats, fields } = this.ui;
    toggle?.addEventListener("click", () => this.toggleUI());
    run?.addEventListener("click", () => this.run());
    [...formats, ...fields].forEach((el) =>
      el.addEventListener("change", () => this.syncSettings())
    );
  }

  toggleUI() {
    const { panel, toggle } = this.ui;
    panel?.classList.toggle("hidden");
    toggle?.classList.toggle("active");
  }

  syncSettings() {
    const checked = (name) => [
      ...document.querySelectorAll(`input[name="${name}"]:checked`),
    ];
    const formatEl = checked("format")[0];
    const fieldEls = checked("fields");
    this.settings.format = formatEl?.value || "string";
    this.settings.fields = fieldEls.length
      ? fieldEls.map((el) => el.value)
      : ["title"];
    if (!fieldEls.length) {
      const fallback = this.$('input[name="fields"][value="title"]');
      fallback.checked = true;
    }
  }

  async run() {
    const { run, output } = this.ui;
    this.setStatus("", "");
    run.disabled = true;
    run.textContent = "Processing...";
    output.classList.add("hidden");
    output.value = "";

    try {
      this.syncSettings();
      const tabs = await this.queryTabs();
      const data = this.filter(tabs);
      const result = this.format(data);
      await this.copy(result);
      output.value = result;
      output.classList.remove("hidden");
      this.setStatus("Tabs info copied to clipboard!", "success");
    } catch (e) {
      console.error("TabsDump error:", e);
      this.setStatus("Error: " + e.message, "error");
    } finally {
      run.disabled = false;
      run.textContent = "Run";
    }
  }

  queryTabs() {
    return new Promise((res, rej) =>
      chrome.tabs.query({}, (tabs) =>
        chrome.runtime.lastError
          ? rej(new Error(chrome.runtime.lastError.message))
          : res(tabs)
      )
    );
  }

  filter(tabs) {
    const f = this.settings.fields;
    return tabs.map((t) =>
      f.reduce((a, k) => {
        a[k] = k === "muted" ? t.mutedInfo?.muted || false : t[k] ?? "";
        return a;
      }, {})
    );
  }

  format(data) {
    return this.settings.format === "json"
      ? JSON.stringify(data, null, 2)
      : data.map((t) => t.title).join("\n");
  }

  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  setStatus(msg, type = "") {
    const { status } = this.ui;
    status.textContent = msg;
    status.className = "status" + (type ? " " + type : "");
    if (type === "success") {
      setTimeout(() => {
        status.textContent = "";
        status.className = "status";
      }, 3000);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new TabsDump());
