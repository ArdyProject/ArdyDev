        // Define the security password here
        const SECURITY_PASSWORD = "0000000001001011 0000000001001001 0000000001001110 0000000001000111 0000000001011111 0000000001010000 0000000001010010 0000000001001111 0000000001001010 0000000001000101 0000000001000011 0000000001010100";
        const TARGET_URL = "1.html";
        const CONVERTER_URL = "bin/konverter.html";
        const verificationForm = document.getElementById('verificationForm');
        const notRobotCheckbox = document.getElementById('notRobot');
        const securityPasswordInput = document.getElementById('securityPassword');
        const messageDiv = document.getElementById('message');
        const converterButton = document.getElementById('converterButton');

        /**
         * Handles the form submission for verification.
         * This function is called when the "Lanjutkan ke Website" button is clicked.
         * @param {Event} event - The submit event object.
         */
        verificationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const isCheckboxChecked = notRobotCheckbox.checked;
            const enteredPassword = securityPasswordInput.value;

            // Clear previous message classes and content
            messageDiv.className = '';
            messageDiv.textContent = '';

            if (isCheckboxChecked && enteredPassword === SECURITY_PASSWORD) {
                messageDiv.textContent = 'Verifikasi berhasil! Mengarahkan Anda ke website...';
                messageDiv.classList.add('show', 'success');
                // Redirect user to the target website after a short delay
                setTimeout(() => { window.location.href = TARGET_URL; }, 1500); // Redirect after 1.5 seconds
            } else {
                messageDiv.textContent = 'Akses Tidak Diberikan. Mohon Periksa Password Anda Dan Ceklist Bukan Robot!!!';
                messageDiv.classList.add('show', 'error');
                securityPasswordInput.value = ''; // Clear password input
                notRobotCheckbox.checked = false; // Uncheck the checkbox
            }
        });

        /**
         * Handles the click event for the "Alat Konversi" button.
         * This function redirects the user to the converter page.
         */
        converterButton.addEventListener('click', function() {
            window.location.href = CONVERTER_URL;
        });