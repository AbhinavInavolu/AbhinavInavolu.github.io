$(document).ready(function () {
    let isPowerShell = false;

    // Smooth scrolling and close menu on link click
    $(".nav-links a").on("click", function (e) {
        e.preventDefault();
        const targetId = $(this).attr("href")?.slice(1);
        const $target = $(`#${targetId}`);
        if ($target.length) {
            $("html, body").animate(
                {
                    scrollTop: $target.offset().top - 40,
                },
                500,
            );
        }

        // Close the menu after clicking
        $(".nav-links").removeClass("open");
    });

    $(window).on("scroll", function () {
        let current = "";
        $("section").each(function () {
            const sectionTop = $(this).offset().top - 120;
            if ($(window).scrollTop() >= sectionTop) {
                current = $(this).attr("id") || "";
            }
        });

        if ($(".path-dir").length) {
            if (isPowerShell) {
                // PowerShell-style path
                $(".path-dir").text(
                    current
                        ? `C:\\Users\\ainavolu\\${current}`
                        : "C:\\Users\\ainavolu",
                );
            } else {
                $(".path-dir").text(current ? `~/${current}` : "~");
            }
        }
    });

    // Mobile menu toggle
    $(".menu-toggle").on("click", function () {
        $(".nav-links").toggleClass("open");
    });

    $("#themeSwitch").on("change", function () {
        isPowerShell = !isPowerShell;

        const $icon = $("#themeIcon");
        if (isPowerShell) {
            $("html").addClass("powershell-theme");
            $icon.attr("src", "powershell.svg");

            // PowerShell-style path
            $(".path-user").text("PS");
            $(".path-separator").text(" ");
            $(".path-dir").text("C:\\Users\\ainavolu");
            $(".path-symbol").text(">");

            $("body").css("font-family", "'Fira Code', monospace");
        } else {
            $("html").removeClass("powershell-theme");
            $icon.attr("src", "bash.png");

            // Bash-style path
            $(".path-user").text("ainavolu");
            $(".path-separator").text(":");
            $(".path-dir").text("~");
            $(".path-symbol").text("$");

            $("body").css("font-family", "'Ubuntu Mono', monospace");
        }
    });

    const arrow = $("#scroll-indicator");
    $(window).on("scroll", function () {
        if (window.scrollY > 10) {
            arrow.addClass("hidden");
        } else {
            arrow.removeClass("hidden");
        }
    });

    arrow.on("click", function () {
        arrow.addClass("hidden");
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });

    const toggle = document.getElementById("themeSwitch");

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.body.classList.add("powershell-theme");
        } else {
            document.body.classList.remove("powershell-theme");
        }
    });
});
