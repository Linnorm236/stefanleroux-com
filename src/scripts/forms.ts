const contactForm = document.getElementById("contactForm") as HTMLFormElement;
const statusMessage = document.getElementById("statusMessage") as HTMLOutputElement;

contactForm.onsubmit = async (event) => {
	event.preventDefault();

	statusMessage.setAttribute("data-status", "processing");
	statusMessage.value = "Processing";

	try {
		const response = await fetch("https://lab.vivtec.co.za/forms/wp-json/contact-form-7/v1/contact-forms/20/feedback", {
			method: "POST",
			body: new FormData(contactForm),
		});

		const result = await response.json();

		if (result.status === "mail_sent") {
			statusMessage.setAttribute("data-status", "completed");
			statusMessage.value = result.message;
		} else {
			statusMessage.setAttribute("data-status", "error");
			statusMessage.value = "You made a mistake";
		}
	} catch (error) {
		statusMessage.setAttribute("data-status", "error");
		statusMessage.value = "Form doesn't do anything yet";

		if (error instanceof TypeError) {
			statusMessage.value = "Fucking CORS";
		}
	}
};
