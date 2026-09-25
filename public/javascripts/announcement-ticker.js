(function () {
    "use strict";

    /* ======================================================================
       Add / remove announcements here.
       Just add another { text: "..." } object to this array — the ticker
       will automatically pick it up, no other change needed.
       ====================================================================== */
    var announcements = [
        { text: "Tender invitation for AC purchase, last date for submission of tender  is  30/9/2026" }
        // { text: "Another announcement goes here" },
        // { text: "Yet another announcement goes here" },
    ];

    // Every ticker item redirects here when clicked.
    var ANNOUNCEMENTS_PAGE_URL = "/announcements";

    var SECONDS_PER_ITEM = 8;
    var MIN_DURATION = 12;

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function buildTicker() {
        var mount = document.getElementById("announcement-ticker");
        if (!mount || !announcements.length) return;

        var itemsHtml = announcements
            .map(function (item) {
                return (
                    '<a class="announcement-ticker__item" href="' +
                    ANNOUNCEMENTS_PAGE_URL +
                    '">' +
                    '<i class="fa fa-bullhorn" aria-hidden="true"></i>' +
                    escapeHtml(item.text) +
                    "</a>"
                );
            })
            .join("");

        // Content is duplicated once so the CSS animation loops seamlessly.
        mount.innerHTML =
            '<span class="announcement-ticker__label">Announcements</span>' +
            '<div class="announcement-ticker__viewport">' +
            '<div class="announcement-ticker__track">' +
            itemsHtml + itemsHtml +
            "</div></div>";

        var track = mount.querySelector(".announcement-ticker__track");
        var duration = Math.max(announcements.length * SECONDS_PER_ITEM, MIN_DURATION);
        track.style.animationDuration = duration + "s";
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildTicker);
    } else {
        buildTicker();
    }
})();
