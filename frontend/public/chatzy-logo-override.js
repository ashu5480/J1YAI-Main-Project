/*
 * JIYA branding override for the Chatzy chat-widget launcher.
 *
 * The Chatzy widget renders its launcher inside an OPEN shadow DOM on
 * #chatzy-shadow-host. IMPORTANT: the widget attaches the launcher's
 * click handler INSIDE the <img>'s own `onload` handler, so mutating
 * that <img> (e.g. swapping its src) re-fires `onload` and stacks a
 * SECOND click listener — every click then toggles the chat open AND
 * closed again, which looks like "clicking does nothing".
 *
 * This script therefore NEVER mutates the widget's DOM nodes. It only
 * injects a stylesheet into the shadow root that paints the launcher
 * button with the in-house "JIYA" avatar and hides the original <img>
 * served by Chatzy. All click behaviour is left entirely to the widget.
 *
 * To change the icon permanently at the source, upload the same image in
 * the Chatzy dashboard (Bot Interface settings).
 */
(function () {
  "use strict";

  var STYLE_ATTR = "data-jiya-style";
  var MENU_OPEN_CLASS = "j1yai-mobile-menu-open";
  var MENU_CHANGE_EVENT = "j1yai-mobile-menu-change";
  var JIYA_CSS =
    ".chatzy-chatbot-icon {" +
    "background-image: url('/images/jiya-avatar.svg') !important;" +
    "background-size: cover !important;" +
    "background-position: center !important;" +
    "background-repeat: no-repeat !important;" +
    "}" +
    ".chatzy-chatbot-icon img { display: none !important; }" +
    "@media (max-width: 1023px) {" +
    ".chatzy-chatbot-wrapper { position: fixed !important; right: 1rem !important; bottom: 1rem !important; margin: 0 !important; z-index: 30 !important; }" +
    ".chatzy-chatbot-container-mobile { position: fixed !important; top: 4.5rem !important; right: 0.75rem !important; bottom: 0.75rem !important; left: 0.75rem !important; width: auto !important; min-width: 0 !important; height: auto !important; max-height: calc(100dvh - 6rem) !important; z-index: 30 !important; border-radius: 1rem !important; }" +
    ".chatzy-chatbot-container-mobile iframe { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; }" +
    "}";

  function injectStyle(root) {
    if (!root || root.querySelector("style[" + STYLE_ATTR + "]")) return;
    try {
      var style = document.createElement("style");
      style.setAttribute(STYLE_ATTR, "1");
      style.textContent = JIYA_CSS;
      root.appendChild(style);

      var btn = root.querySelector(".chatzy-chatbot-icon");
      if (btn && !btn.getAttribute("aria-label")) {
        btn.setAttribute("aria-label", "Open the JIYA chat assistant");
        btn.setAttribute("title", "Chat with JIYA");
      }
    } catch (e) {
      /* shadow root not ready yet */
    }
  }

  function mobileViewport() {
    return window.matchMedia("(max-width: 1023px)").matches;
  }

  function closeChatIfOpen(root) {
    var panel = root.querySelector(".chatzy-chatbot-container-mobile.show, .chatzy-chatbot-container.show");
    var icon = root.querySelector(".chatzy-chatbot-icon");
    if (panel && icon) icon.click();
  }

  function syncMenuState(root) {
    if (!root) return;
    var host = root.host || document.getElementById("chatzy-shadow-host");
    if (!host) return;

    var menuOpen = mobileViewport() && document.body && document.body.classList.contains(MENU_OPEN_CLASS);
    if (mobileViewport()) {
      host.style.position = "relative";
      host.style.zIndex = "30";
    } else {
      host.style.removeProperty("position");
      host.style.removeProperty("z-index");
    }

    if (menuOpen) {
      closeChatIfOpen(root);
      host.style.visibility = "hidden";
      host.style.pointerEvents = "none";
    } else {
      host.style.removeProperty("visibility");
      host.style.removeProperty("pointer-events");
    }
  }

  var watchedShadowRoot = null;

  function watchShadowRoot(root) {
    if (!root || root === watchedShadowRoot) return;
    watchedShadowRoot = root;
    injectStyle(root);
    syncMenuState(root);
    try {
      new MutationObserver(function () {
        injectStyle(root);
        syncMenuState(root);
      }).observe(root, { childList: true, subtree: true });
    } catch (e2) {
      /* ignore */
    }
  }

  function hostReady() {
    var host = document.getElementById("chatzy-shadow-host");
    return host && host.shadowRoot ? host.shadowRoot : null;
  }

  function waitForHost() {
    var root = hostReady();
    if (root) {
      watchShadowRoot(root);
      return true;
    }
    return false;
  }

  function start() {
    window.addEventListener(MENU_CHANGE_EVENT, function () {
      syncMenuState(hostReady());
    });

    if (document.body) {
      var bodyObserver = new MutationObserver(function () {
        syncMenuState(hostReady());
        if (waitForHost()) bodyObserver.disconnect();
      });
      bodyObserver.observe(document.body, { childList: true, attributes: true, attributeFilter: ["class"] });
    }

    /* Safety-net polling in case the observer misses the host insertion */
    var tries = 0;
    var timer = setInterval(function () {
      if (waitForHost() || ++tries >= 150) clearInterval(timer);
    }, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
