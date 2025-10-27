// v-----------------------------------9

(function () {
  console.log("📘 Classroom UI Enhancer loaded with auto-cleanup and reinit.");

  // -----------------------------------------------------
  // STEP 1 — Generate embedded HTML for supported documents
  // -----------------------------------------------------

 function getDocumentEmbedHTML(url) {
  if (!url) return "";

  if (url.includes("docs.google.com/presentation")) {
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
      const presentationId = match[1];
      const viewerURL = `https://docs.google.com/presentation/d/${presentationId}/view?usp=sharing`;
      return `
        <div class="embedded-document">
          <iframe src="${viewerURL}" width="100%" height="480px" allowfullscreen></iframe>
        </div>`;
    }
  }

  if (url.includes("docs.google.com/forms")) {
    const embedLink = url.includes("embedded=true") ? url : url + "?embedded=true";
    return `
      <div class="embedded-document">
        <iframe src="${embedLink}" width="100%" height="600px" allowfullscreen></iframe>
      </div>`;
  }

    if (url.includes("flexiquiz.com/SC/")) {
    return `
      <div class="embedded-document">
        <iframe src="${url}" width="100%" height="600px" allowfullscreen></iframe>
      </div>`;
  }

  if (url.includes("docs.google.com/document")) {
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
      const docId = match[1];
      const previewURL = `https://docs.google.com/document/d/${docId}/preview`;
      return `
        <div class="embedded-document">
          <iframe src="${previewURL}" width="100%" height="600px" allowfullscreen></iframe>
        </div>`;
    }
  }

  if (url.includes("docs.google.com/spreadsheets")) {
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
      const sheetId = match[1];
      const embedURL = `https://docs.google.com/spreadsheets/d/${sheetId}/preview`;
      return `
        <div class="embedded-document">
          <iframe src="${embedURL}" width="100%" height="600px" allowfullscreen></iframe>
        </div>`;
    }
  }

  if (url.includes("drive.google.com/file/")) {
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
      return `
        <div class="embedded-document">
          <iframe src="${previewURL}" width="100%" height="480px" allowfullscreen></iframe>
        </div>`;
    }
  }

  if (url.endsWith(".ppt") || url.endsWith(".pptx")) {
    return `
      <p>⚠️ Browser cannot embed .pptx directly.</p>
      <p><a href="${url}" target="_blank">📎 Download PowerPoint File</a></p>`;
  }

  return `<p><a href="${url}" target="_blank">📎 View Attachment</a></p>`;
}

  // -----------------------------------------------------
  // STEP 2 — Observe and attach event handlers
  // -----------------------------------------------------
  function startObservingListItems(panel) {
    let policy = null;
    if (window.trustedTypes && trustedTypes.createPolicy) {
      policy = trustedTypes.createPolicy("classroomPolicy", { createHTML: (input) => input });
    }

    const attachToListItems = () => {
      const listItems = document.querySelectorAll('li[data-stream-item-id]');
      if (!listItems.length) return;

      listItems.forEach((item) => {
        if (item.dataset.listenerAttached) return;
        item.dataset.listenerAttached = "true";

        item.addEventListener("click", () => {
          const contentEl = item.querySelector(".bqKF7d span");
          const htmlContent = contentEl ? contentEl.innerHTML.trim() : "<p>No content found. <b>Click Again,</b> </p>";

          // const linkEl = item.querySelector(
          //   'a[href*=".ppt"], a[href*=".pptx"], a[href*="docs.google.com/presentation"], a[href*="docs.google.com/forms"], a[href*="drive.google.com/file"]'
          // );

          const linkEl = item.querySelector(
          'a[href*=".ppt"], a[href*=".pptx"], a[href*="docs.google.com/presentation"], a[href*="docs.google.com/forms"], a[href*="drive.google.com/file"], a[href*="docs.google.com/document"], a[href*="docs.google.com/spreadsheets"], a[href*="flexiquiz.com/SC/"]'
          );

          const embedHTML = linkEl ? getDocumentEmbedHTML(linkEl.href) : "";

          let topicName = "Untitled Topic";

          const topicContainer = item.closest('[guidedhelpid="classworkTopicListGh"], [jsname="dTDiAc"]');
          if (topicContainer) {
            const titleEl = topicContainer.querySelector('.Vu2fZd.Cx437e');
            if (titleEl && titleEl.innerText.trim()) {
              topicName = titleEl.innerText.trim();
            }
          }

          if (topicName === "Untitled Topic") {
            const possibleTopic = item.parentElement?.previousElementSibling?.querySelector('.Vu2fZd.Cx437e');
            if (possibleTopic && possibleTopic.innerText.trim()) {
              topicName = possibleTopic.innerText.trim();
            }
          }

          console.log("📘 Topic Name:", topicName);

          const topicHeaderHTML = `
            <h2 style="
              font-weight: 600;
              color: #1967d2;
              font-size: 20px;
              margin-bottom: 10px;
              border-bottom: 2px solid #e8eaed;
              padding-bottom: 5px;
            ">
              ${topicName}
            </h2>
          `;

          const fullHTML = `<div style="white-space: normal; line-height: 1.6;">${topicHeaderHTML}${htmlContent}${embedHTML}</div>`;

          // try {
          //   if (policy) panel.innerHTML = policy.createHTML(fullHTML);
          //   else panel.innerHTML = fullHTML;
          // } catch {
          //   panel.innerHTML = `<p>⚠️ Rendering error. Showing raw content.</p>` + fullHTML;
          // }

            try {
  // 🧩 Always find the current wrapper dynamically
  const livePanel = document.querySelector(".myCustomWrapper");
  if (livePanel) {
    if (policy) livePanel.innerHTML = policy.createHTML(fullHTML);
    else livePanel.innerHTML = fullHTML;
  } else {
    console.warn("⚠️ Panel not found during click — creating new one...");
    createCustomUI();
    const newPanel = document.querySelector(".myCustomWrapper");
    if (newPanel) newPanel.innerHTML = fullHTML;
  }
} catch (err) {
  console.error("⚠️ Rendering error:", err);
}


        });
      });
    };

    // const observer = new MutationObserver(() => attachToListItems());
    // observer.observe(document.body, { childList: true, subtree: true });
    // attachToListItems();
    const observer = new MutationObserver(() => attachToListItems());
observer.observe(document.body, { childList: true, subtree: true });

// 🧩 Added fix: retry attaching until items exist
const retryInterval = setInterval(() => {
  if (document.querySelector('li[data-stream-item-id]')) {
    attachToListItems();
    clearInterval(retryInterval);
  }
}, 1000);

  }

  // -----------------------------------------------------
  // STEP 3 — Inject CSS
  // -----------------------------------------------------

function injectStyles() {
  if (document.getElementById("customStyleEnhancer")) return;
  const style = document.createElement("style");
  style.id = "customStyleEnhancer";
  style.textContent = `
    .kdAl3b {
      position: absolute !important;
      left: 1em !important;
      width: 28% !important;
      z-index: 1;
    }
    .JryN0e.jlxRme {
      display: inline !important;
      width: 25% !important;
      position: fixed !important;
      bottom: 1em !important;
      z-index: 3 !important;
    }
    .iCujF {
      display: block !important;
      position: relative !important;
      justify-content: center !important;
    }
    .myCustomWrapper {
      padding: 1em !important;
      position: fixed !important;
      background-color: #f9fbff !important;
      height: 72% !important;
      width: 53% !important;
      right: 1em !important;
      top: 9em !important;
      display: block !important;
      border-radius: 10px !important;
      font-size: large !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.3) !important;
      z-index: 19 !important;
      overflow-y: auto !important;
      white-space: normal !important;
    }
    .embedded-document iframe {
      border: none;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .myCustomWrapper ul, .myCustomWrapper ol {
      padding-left: 1.5em;
      margin-bottom: 1em;
    }
    .myCustomWrapper li {
      margin-bottom: 0.5em;
      list-style-type: disc;
    }
    .myCustomWrapper ol li {
      list-style-type: decimal;
    }
    .myCustomWrapper h2, .myCustomWrapper h3 {
      color: #1967d2;
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
    .myCustomWrapper p {
      margin-bottom: 1em;
    }
  `;
  document.head.appendChild(style);
}

  // -----------------------------------------------------
  // STEP 4 — UI Panel Setup
  // -----------------------------------------------------
  function createCustomUI() {
    if (document.querySelector(".myCustomWrapper")) return;
    const wrapper = document.createElement("div");
    const imageURL = chrome.runtime.getURL("demoimg.png");
    wrapper.className = "myCustomWrapper";
    // wrapper.innerHTML = `<p>📖 Double Click a classwork item to view its content and slides or forms. If not found <b>Refresh</b> the page.</p>
    // <img src="demoimg.png" alt="Demo Preview" style="width:100%; max-width:500px; margin-top:10px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.15);" />`;
    

wrapper.innerHTML = `
  <p>📖 Double Click on a <b>Topic list item</b> to view its content and slides or forms. If not found <b>Refresh</b> the page.</p>
  <img src="${imageURL}" alt="Demo Preview" style="width:100%; max-width:500px; margin-top:10px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.15);" />
`;
    document.body.appendChild(wrapper);
    // startObservingListItems(wrapper);
    // 🧩 Delay attaching until DOM is ready
setTimeout(() => startObservingListItems(wrapper), 1500);

  }

  // -----------------------------------------------------
  // STEP 5 — Cleanup function
  // -----------------------------------------------------
  function cleanupEnhancer() {
    const wrapper = document.querySelector(".myCustomWrapper");
    const style = document.getElementById("customStyleEnhancer");
    if (wrapper) wrapper.remove();
    if (style) style.remove();
    console.log("🧹 Classroom Enhancer cleaned up.");
  }

  // -----------------------------------------------------
  // STEP 6 — Initialize enhancer
  // -----------------------------------------------------
  // function initializeEnhancer() {
  //   injectStyles();
  //   createCustomUI();
  //   console.log("✅ Classroom Enhancer active on /t/all");
  // }

  function initializeEnhancer() {
  console.log("🧭 Initializing Classroom Enhancer...");

  // Clean up any leftover wrappers/styles
  cleanupEnhancer();

  injectStyles();
  createCustomUI();

  // 🧩 Ensure listeners attach only after the Classwork list exists
  const ensureReady = setInterval(() => {
    if (document.querySelector('li[data-stream-item-id]')) {
      const panel = document.querySelector(".myCustomWrapper");
      if (panel) startObservingListItems(panel);
      clearInterval(ensureReady);
      console.log("✅ Classroom Enhancer active and listeners attached.");
    }
  }, 1000);
}


  // -----------------------------------------------------
  // STEP 7 — URL Watcher (detect page switches)
  // -----------------------------------------------------
  // function watchURLChanges() {
  //   let lastUrl = location.href;

  //   const observer = new MutationObserver(() => {
  //     if (location.href !== lastUrl) {
  //       const newUrl = location.href;
  //       console.log("🔗 URL changed:", newUrl);
  //       lastUrl = newUrl;

  //       // if (!newUrl.endsWith("/t/all")) {
  //       //   cleanupEnhancer();
  //       // } else if (newUrl.endsWith("/t/all")) {
  //       //   console.log("♻️ Reinitializing enhancer for /t/all");
  //       //   setTimeout(() => initializeEnhancer(), 1000);
  //       // }
  //       if (!newUrl.endsWith("/t/all")) {
  //        cleanupEnhancer();
  //         } else {
  //           console.log("♻️ Reinitializing enhancer for /t/all");
  //           // 🧩 Delay to ensure Classroom finished rendering
  //           setTimeout(() => initializeEnhancer(), 2500);
  //         }

  //     }
  //   });

  //   observer.observe(document.body, { childList: true, subtree: true });
  // }

  function watchURLChanges() {
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      const newUrl = location.href;
      console.log("🔗 URL changed:", newUrl);
      lastUrl = newUrl;

      if (!newUrl.endsWith("/t/all")) {
        cleanupEnhancer();
      } else {
        console.log("♻️ Detected return to /t/all, waiting for content...");
        // 🧩 Keep retrying until the page is actually ready
        const waitUntilReady = setInterval(() => {
          const listExists = document.querySelector('li[data-stream-item-id]');
          if (listExists) {
            clearInterval(waitUntilReady);
            initializeEnhancer();
          }
        }, 1500);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}


  // -----------------------------------------------------
  // STEP 8 — Boot
  // -----------------------------------------------------
  function boot() {
    console.log("🚀 Classroom Enhancer booting...");
    if (location.href.endsWith("/t/all")) initializeEnhancer();
    watchURLChanges();
  }

  setTimeout(boot, 2000);
})();

