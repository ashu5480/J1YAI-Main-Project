/*
 * JIYA avatar override for the Chatzy chat-widget launcher.
 *
 * The Chatzy widget script renders its floating launcher <img> inside an
 * OPEN shadow DOM attached to #chatzy-shadow-host, and the icon URL comes
 * from Chatzy's API (get_bot_interface -> settings.chatbot_icon_url).
 * Because the shadow root is open, we can watch it and swap the icon for
 * the in-house "JIYA" girl avatar so the launcher matches J1YAI branding.
 *
 * If Chatzy ever changes its DOM, the MutationObserver re-applies the
 * override. To change the icon permanently at the source, upload
 * /images/jiya-avatar.svg in the Chatzy dashboard (Bot Interface settings).
 */
(function () {
  "use strict";

  var ICON_SRC = "/images/jiya-avatar.svg";
  var ICON_ALT = "JIYA — J1YAI AI assistant";
  var MARK = "data-jiya-avatar";

  function applyIcon(img) {
    if (!img || img.getAttribute(MARK) === "1") return;
    img.setAttribute(MARK, "1");
    img.src = ICON_SRC;
    img.alt = ICON_ALT;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
  }

  function watchShadowRoot(root) {
    if (!root) return false;
    var applied = false;
    try {
      var imgs = root.querySelectorAll(".chatzy-chatbot-icon img");
      for (var i = 0; i < imgs.length; i++) {
        applyIcon(imgs[i]);
        applied = true;
      }
    } catch (e) {
      /* shadow root not ready yet */
    }
    try {
      new MutationObserver(function () {
        var list = root.querySelectorAll(".chatzy-chatbot-icon img");
        for (var j = 0; j < list.length; j++) applyIcon(list[j]);
      }).observe(root, { childList: true, subtree: true });
    } catch (e2) {
      /* ignore */
    }
    return applied;
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
    if (waitForHost()) return;

    if (document.body) {
      var bodyObserver = new MutationObserver(function () {
        if (waitForHost()) bodyObserver.disconnect();
      });
      bodyObserver.observe(document.body, { childList: true });
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
