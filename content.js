
// v-------------------------------4

// (function () {
//   console.log("📘 Classroom UI Enhancer active.");

//   // -------------------------------
//   // STEP 1: Inject Styles
//   // -------------------------------
//   function injectCustomStyles() {
//     if (document.getElementById("classroom-enhancer-styles")) return;

//     const style = document.createElement("style");
//     style.id = "classroom-enhancer-styles";
//     style.textContent = `
//       .kdAl3b { position: absolute !important; left: 1em !important; width: 28% !important; z-index: 9998 !important; }
//       .JryN0e.jlxRme { display: inline !important; width: 25% !important; position: fixed !important; left: 46% !important; z-index: 3 !important; }
//       .iCujF { display: block !important; position: relative !important; justify-content: center !important; }
//       .LMQ9gf {
//         padding: 1em !important;
//         position: fixed !important;
//         background-color: aliceblue !important;
//         height: 68% !important;
//         width: 52% !important;
//         right: 1em !important;
//         top: 10em !important;
//         display: block !important;
//         border-radius: 10px !important;
//         font-size: large !important;
//         box-shadow: 0 0 10px rgba(0,0,0,0.3) !important;
//         z-index: 9999 !important;
//         overflow-y: auto !important;
//         white-space: normal !important;
//       }
//       .embedded-document iframe {
//         border: none;
//         background: #fff;
//         border-radius: 8px;
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   // -------------------------------
//   // STEP 2: Safe embed for docs/slides
//   // -------------------------------
//   function getDocumentEmbedHTML(url) {
//     if (!url) return "";

//     if (!url.includes("docs.google.com/presentation")) {
//       return `<p><a href="${url}" target="_blank">📎 View Document</a></p>`;
//     }

//     const match = url.match(/\/d\/([^\/]+)\//);
//     if (match && match[1]) {
//       const presentationId = match[1];
//       return `
//         <div class="embedded-document">
//           <iframe
//             src="https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000"
//             width="100%" height="400px"
//             allowfullscreen
//             onerror="this.parentElement.innerHTML='<p style=color:red>⚠️ Failed to load presentation. Please open manually:</p><a href=${url} target=_blank>${url}</a>'">
//           </iframe>
//           <p><a href="${url}" target="_blank">🔗 View Full Document</a></p>
//         </div>
//       `;
//     }
//     return `<p><a href="${url}" target="_blank">📎 View Document</a></p>`;
//   }

//   // -------------------------------
//   // STEP 3: Create Panel
//   // -------------------------------
//   function createCustomUI() {
//     if (document.querySelector(".myCustomWrapper")) return;

//     const mainWrapper = document.createElement("main");
//     mainWrapper.className = "kdAl3b myCustomWrapper";

//     const region = document.createElement("div");
//     region.className = "JryN0e jlxRme";
//     region.setAttribute("role", "region");
//     region.setAttribute("aria-label", "Actions");

//     const innerWrap = document.createElement("div");
//     innerWrap.className = "iCujF";

//     const panel = document.createElement("div");
//     panel.className = "LMQ9gf";
//     panel.innerHTML = `
//       <h3>📖 Classroom Content Viewer</h3>
//       <p>Click on a Classwork item to view its formatted content and attachments here.</p>
//     `;

//     innerWrap.appendChild(panel);
//     region.appendChild(innerWrap);
//     mainWrapper.appendChild(region);
//     document.body.appendChild(mainWrapper);

//     startObservingListItems(panel);
//   }

//   // -------------------------------
//   // STEP 4: Watch dynamically loaded items
//   // -------------------------------
//   function startObservingListItems(panel) {
//     console.log("👀 Watching for list items to attach click handlers...");

//     // Create a Trusted Types policy if allowed
//     let policy = null;
//     if (window.trustedTypes && trustedTypes.createPolicy) {
//       policy = trustedTypes.createPolicy("classroomPolicy", {
//         createHTML: (input) => input
//       });
//     }

//     const attachToListItems = () => {
//       const listItems = document.querySelectorAll('li[data-stream-item-id]');
//       if (!listItems.length) return;

//       listItems.forEach((item) => {
//         if (item.dataset.listenerAttached) return;
//         item.dataset.listenerAttached = "true";

//         item.addEventListener("click", () => {
//           const contentEl = item.querySelector(".bqKF7d span");
//           const htmlContent = contentEl ? contentEl.innerHTML.trim() : "<p>No content found.</p>";

//           const pptLink = item.querySelector(
//             'a[href*=".ppt"], a[href*=".pptx"], a[href*="docs.google.com/presentation"]'
//           );
//           const embedHTML = pptLink ? getDocumentEmbedHTML(pptLink.href) : "";

//           const fullHTML = `
//             <div style="white-space: normal; line-height: 1.6;">
//               ${htmlContent}
//               ${embedHTML}
//             </div>
//           `;

//           try {
//             if (policy) {
//               panel.innerHTML = policy.createHTML(fullHTML);
//             } else {
//               panel.innerHTML = fullHTML;
//             }
//           } catch (e) {
//             console.warn("⚠️ TrustedHTML not supported, using safe fallback.");
//             panel.innerHTML = fullHTML;
//           }
//         });
//       });
//     };

//     // Observe dynamically loaded nodes
//     const observer = new MutationObserver(() => attachToListItems());
//     observer.observe(document.body, { childList: true, subtree: true });

//     // Initial call
//     attachToListItems();
//   }

//   // -------------------------------
//   // STEP 5: Initialize
//   // -------------------------------
//   function initialize() {
//     injectCustomStyles();
//     createCustomUI();
//   }

//   setTimeout(initialize, 2000);

//   const reobserver = new MutationObserver(() => {
//     if (!document.querySelector(".myCustomWrapper")) initialize();
//   });
//   reobserver.observe(document.body, { childList: true, subtree: true });
// })();


// v-------------------------7

// (function () {
//   console.log("📘 Classroom UI Enhancer loaded.");

//   // -----------------------------------------------------
//   // STEP 1 — Generate embedded HTML for supported documents
//   // -----------------------------------------------------
//   function getDocumentEmbedHTML(url) {
//     if (!url) return "";

//     console.log("🔗 Found attachment URL:", url);

//     // ✅ Google Slides presentation (use full viewer, not embed)
//     if (url.includes("docs.google.com/presentation")) {
//       const match = url.match(/\/d\/([^\/]+)\//);
//       if (match && match[1]) {
//         const presentationId = match[1];
//         const viewerURL = `https://docs.google.com/presentation/d/${presentationId}/view?usp=sharing`;

//         console.log("🖼 Google Slides Viewer URL:", viewerURL);
//         return `
//           <div class="embedded-document">
//             <iframe
//               src="${viewerURL}"
//               width="100%"
//               height="480px"
//               allowfullscreen
//               onerror="this.parentElement.innerHTML='<p style=color:red>⚠️ Could not load Google Slides. <a href=${url} target=_blank>Open manually</a></p>'">
//             </iframe>
           
//           </div>
//         `;
//       }
//     }

//     // ✅ Google Drive PPTX (works with preview)
//     if (url.includes("drive.google.com/file/")) {
//       const match = url.match(/\/d\/([^\/]+)\//);
//       if (match && match[1]) {
//         const fileId = match[1];
//         const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;

//         console.log("📊 Google Drive Preview URL:", previewURL);
//         return `
//           <div class="embedded-document">
//             <iframe
//               src="${previewURL}"
//               width="100%"
//               height="480px"
//               allowfullscreen
//               onerror="this.parentElement.innerHTML='<p style=color:red>⚠️ PPT preview failed. <a href=${url} target=_blank>Open in Drive</a></p>'">
//             </iframe>
            
//           </div>
//         `;
//       }
//     }

//     // ✅ PPT/PPTX direct file
//     if (url.endsWith(".ppt") || url.endsWith(".pptx")) {
//       console.log("📄 Detected raw PPT file (no embed)");
//       return `
//         <p>⚠️ Browser cannot embed .pptx directly.</p>
//         <p><a href="${url}" target="_blank">📎 Download PowerPoint File</a></p>
//       `;
//     }

//     // Fallback
//     console.warn("⚠️ Unknown document link:", url);
//     return `<p><a href="${url}" target="_blank">📎 View Attachment</a></p>`;
//   }

//   // -----------------------------------------------------
//   // STEP 2 — Observe and attach event handlers
//   // -----------------------------------------------------
//   function startObservingListItems(panel) {
//     console.log("👀 Watching for classwork list items...");

//     let policy = null;
//     if (window.trustedTypes && trustedTypes.createPolicy) {
//       policy = trustedTypes.createPolicy("classroomPolicy", { createHTML: (input) => input });
//     }

//     const attachToListItems = () => {
//       const listItems = document.querySelectorAll('li[data-stream-item-id]');
//       if (!listItems.length) {
//         console.warn("⚠️ No list items found yet.");
//         return;
//       }

//       listItems.forEach((item) => {
//         if (item.dataset.listenerAttached) return;
//         item.dataset.listenerAttached = "true";

//         item.addEventListener("click", () => {
//           console.log("🖱 Clicked item:", item.dataset.streamItemId);

//           const contentEl = item.querySelector(".bqKF7d span");
//           const htmlContent = contentEl ? contentEl.innerHTML.trim() : "<p>No content found.</p>";

//           const pptLink = item.querySelector(
//             'a[href*=".ppt"], a[href*=".pptx"], a[href*="docs.google.com/presentation"], a[href*="drive.google.com/file"]'
//           );

//           if (pptLink) {
//             console.log("📘 Found document link:", pptLink.href);
//           } else {
//             console.warn("🚫 No Slides or PPT link found in this item.");
//           }

//           const embedHTML = pptLink ? getDocumentEmbedHTML(pptLink.href) : "";
//           const fullHTML = `
//             <div style="white-space: normal; line-height: 1.6;">
//               ${htmlContent}
//               ${embedHTML}
//             </div>
//           `;

//           try {
//             if (policy) panel.innerHTML = policy.createHTML(fullHTML);
//             else panel.innerHTML = fullHTML;
//           } catch (err) {
//             console.error("❌ TrustedHTML error:", err);
//             panel.innerHTML = `<p>⚠️ Rendering error. Showing raw content.</p>` + fullHTML;
//           }
//         });
//       });
//     };

//     const observer = new MutationObserver(() => attachToListItems());
//     observer.observe(document.body, { childList: true, subtree: true });

//     attachToListItems();
//   }

//   // -----------------------------------------------------
//   // STEP 3 — Inject CSS (matching native Google Classroom layout)
//   // -----------------------------------------------------
//   function injectStyles() {
//     if (document.getElementById("customStyleEnhancer")) return;
//     const style = document.createElement("style");
//     style.id = "customStyleEnhancer";
//     style.textContent = `
//       .kdAl3b {
//         position: absolute !important;
//         left: 1em !important;
//         width: 28% !important;
//         z-index: 1;
//       }
//       .JryN0e.jlxRme {
//         display: inline !important;
//         width: 25% !important;
//         position: fixed !important;
//         bottom: 1em !important;
//         z-index: 3 !important;
//       }
//       .iCujF {
//         display: block !important;
//         position: relative !important;
//         justify-content: center !important;
//       }
//       .myCustomWrapper {
//         // position: fixed;
//         // top: 11em;
//         // right: 1em;
//         // width: 50%;
//         // height: 70%;
//         // background: #f9fbff;
//         // border-radius: 10px;
//         // box-shadow: 0 0 10px rgba(0,0,0,0.3);
//         // overflow-y: auto;
//         // padding: 1em;
//         // z-index: 19;
//           padding: 1em !important;
//         position: fixed !important;
//         background-color: #f9fbff !important;
//         height: 70% !important;
//         width: 50% !important;
//         right: 1em !important;
//         top: 10em !important;
//         display: block !important;
//         border-radius: 10px !important;
//         font-size: large !important;
//         box-shadow: 0 0 10px rgba(0,0,0,0.3) !important;
//         z-index: 19 !important;
//         overflow-y: auto !important;
//         white-space: normal !important;
//       }
//       .embedded-document iframe {
//         border: none;
//         border-radius: 8px;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.15);
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   // -----------------------------------------------------
//   // STEP 4 — UI Panel Setup
//   // -----------------------------------------------------
//   function createCustomUI() {
//     if (document.querySelector(".myCustomWrapper")) return;

//     const wrapper = document.createElement("div");
//     wrapper.className = "myCustomWrapper";
//     wrapper.innerHTML = "<p>📖 Click a classwork item to view its content and slides.</p>";

//     document.body.appendChild(wrapper);
//     startObservingListItems(wrapper);
//   }

//   // -----------------------------------------------------
//   // STEP 5 — Initialize everything
//   // -----------------------------------------------------
//   function initialize() {
//     console.log("✅ Initializing Classroom Enhancer with Full Slide Controls...");
//     injectStyles();
//     createCustomUI();
//   }

//   setTimeout(initialize, 2000);
// })();

// v----------------------------------8

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
          const htmlContent = contentEl ? contentEl.innerHTML.trim() : "<p>No content found. Refresh the page.</p>";
          const pptLink = item.querySelector(
            'a[href*=".ppt"], a[href*=".pptx"], a[href*="docs.google.com/presentation"], a[href*="drive.google.com/file"]'
          );

          const embedHTML = pptLink ? getDocumentEmbedHTML(pptLink.href) : "";

let topicName = "Untitled Topic";

// Try 1: Check for nearest topic container
const topicContainer = item.closest('[guidedhelpid="classworkTopicListGh"], [jsname="dTDiAc"]');
if (topicContainer) {
  const titleEl = topicContainer.querySelector('.Vu2fZd.Cx437e');
  if (titleEl && titleEl.innerText.trim()) {
    topicName = titleEl.innerText.trim();
  }
}

// Try 2: Fallback — check if any visible topic name near item
if (topicName === "Untitled Topic") {
  const possibleTopic = item.parentElement?.previousElementSibling?.querySelector('.Vu2fZd.Cx437e');
  if (possibleTopic && possibleTopic.innerText.trim()) {
    topicName = possibleTopic.innerText.trim();
  }
}

console.log("📘 Topic Name:", topicName);

// Create a styled topic header
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


          try {
            if (policy) panel.innerHTML = policy.createHTML(fullHTML);
            else panel.innerHTML = fullHTML;
          } catch {
            panel.innerHTML = `<p>⚠️ Rendering error. Showing raw content.</p>` + fullHTML;
          }
        });
      });
    };

    const observer = new MutationObserver(() => attachToListItems());
    observer.observe(document.body, { childList: true, subtree: true });
    attachToListItems();
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
        height: 70% !important;
        width: 50% !important;
        right: 1em !important;
        top: 10em !important;
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
    `;
    document.head.appendChild(style);
  }

  // -----------------------------------------------------
  // STEP 4 — UI Panel Setup
  // -----------------------------------------------------
  function createCustomUI() {
    if (document.querySelector(".myCustomWrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "myCustomWrapper";
    wrapper.innerHTML = "<p>📖 Double Click a classwork item to view its content and slides.</p>";
    document.body.appendChild(wrapper);
    startObservingListItems(wrapper);
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
  function initializeEnhancer() {
    injectStyles();
    createCustomUI();
    console.log("✅ Classroom Enhancer active on /t/all");
  }

  // -----------------------------------------------------
  // STEP 7 — URL Watcher (detect page switches)
  // -----------------------------------------------------
  function watchURLChanges() {
    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        const newUrl = location.href;
        console.log("🔗 URL changed:", newUrl);
        lastUrl = newUrl;

        // Remove when leaving /t/all
        if (!newUrl.endsWith("/t/all")) {
          cleanupEnhancer();
        }

        // Reinit when coming back to /t/all
        else if (newUrl.endsWith("/t/all")) {
          console.log("♻️ Reinitializing enhancer for /t/all");
          setTimeout(() => initializeEnhancer(), 1000);
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
