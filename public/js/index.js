document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the report button
    const reportButton = document.getElementById("reportButton");
    if (reportButton) {
        reportButton.addEventListener("click", function() {
            redirectToReportPage();
        });
    }
});

function redirectToReportPage() {
    window.location.href = '/report';
}