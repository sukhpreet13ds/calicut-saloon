document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarLinks = document.querySelectorAll(".sidebar-links a");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.add("active");
        });
    }

    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener("click", function () {
            sidebar.classList.remove("active");
        });
    }

    if (sidebarLinks && sidebar) {
        sidebarLinks.forEach(link => {
            link.addEventListener("click", function () {
                sidebar.classList.remove("active");
            });
        });
    // Services Tabs Filtering
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabBtns && tabContents) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const targetTab = this.getAttribute("data-tab");

                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove("active"));
                // Add active class to clicked button
                this.classList.add("active");

                // Hide all tab contents and show targeted one
                tabContents.forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.add("active");
                    } else {
                        content.classList.remove("active");
                    }
                });
            });
        });
    }
}});
