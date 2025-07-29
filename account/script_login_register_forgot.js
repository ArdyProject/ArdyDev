// DOM Elements
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")
const forgotForm = document.getElementById("forgotForm")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle()
  setupForms()
})

// Password Toggle Functionality
function setupPasswordToggle() {
  const toggleButtons = document.querySelectorAll(".toggle-password")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input")
      const icon = this.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        input.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })
}

// Form Setup
function setupForms() {
  if (loginForm) {
    setupLoginForm()
  }

  if (registerForm) {
    setupRegisterForm()
  }

  if (forgotForm) {
    setupForgotForm()
  }
}

// Login Form
function setupLoginForm() {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const email = formData.get("email")
    const password = formData.get("password")
    const rememberMe = formData.get("rememberMe")

    // Validate form
    if (!validateEmail(email)) {
      showMessage("Email tidak valid", "error")
      return
    }

    if (password.length < 6) {
      showMessage("Password minimal 6 karakter", "error")
      return
    }

    // Show loading
    const submitBtn = this.querySelector('button[type="submit"]')
    setButtonLoading(submitBtn, true)

    // Simulate login process
    setTimeout(() => {
      const users = getStoredUsers()
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Save user session
        localStorage.setItem("ardydev_user", JSON.stringify(user))

        if (rememberMe) {
          localStorage.setItem("ardydev_remember", "true")
        }

        showMessage("Login berhasil! Mengalihkan...", "success")

        setTimeout(() => {
          window.location.href = "../index.html"
        }, 1500)
      } else {
        showMessage("Email atau password salah", "error")
        setButtonLoading(submitBtn, false)
      }
    }, 1000)
  })
}

// Register Form
function setupRegisterForm() {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")
    const agreeTermsCheckbox = document.getElementById("agreeTerms")
    const agreeTerms = agreeTermsCheckbox.checked

    // Validate form
    if (fullName.length < 2) {
      showMessage("Nama lengkap minimal 2 karakter", "error")
      return
    }

    if (!validateEmail(email)) {
      showMessage("Email tidak valid", "error")
      return
    }

    if (password.length < 6) {
      showMessage("Password minimal 6 karakter", "error")
      return
    }

    if (password !== confirmPassword) {
      showMessage("Konfirmasi password tidak cocok", "error")
      return
    }

    if (!agreeTerms) {
      showMessage("Anda harus menyetujui syarat dan ketentuan", "error")
      return
    }

    // Show loading
    const submitBtn = this.querySelector('button[type="submit"]')
    setButtonLoading(submitBtn, true)

    // Simulate registration process
    setTimeout(() => {
      const users = getStoredUsers()

      // Check if email already exists
      if (users.find((u) => u.email === email)) {
        showMessage("Email sudah terdaftar", "error")
        setButtonLoading(submitBtn, false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        fullName,
        email,
        password,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem("ardydev_users", JSON.stringify(users))

      showMessage("Registrasi berhasil! Mengalihkan ke login...", "success")

      setTimeout(() => {
        window.location.href = "login.html"
      }, 1500)
    }, 1000)
  })
}

// Forgot Password Form
function setupForgotForm() {
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const email = formData.get("email")

    // Validate email
    if (!validateEmail(email)) {
      showMessage("Email tidak valid", "error")
      return
    }

    // Show loading
    const submitBtn = this.querySelector('button[type="submit"]')
    setButtonLoading(submitBtn, true)

    // Simulate forgot password process
    setTimeout(() => {
      const users = getStoredUsers()
      const user = users.find((u) => u.email === email)

      if (user) {
        showMessage("Link reset password telah dikirim ke email Anda", "success")

        // For demo purposes, show the password
        setTimeout(() => {
          showMessage(`Password Anda: ${user.password}`, "info")
        }, 2000)
      } else {
        showMessage("Email tidak ditemukan", "error")
      }

      setButtonLoading(submitBtn, false)
    }, 1000)
  })
}

// Utility Functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function getStoredUsers() {
  const users = localStorage.getItem("ardydev_users")
  return users ? JSON.parse(users) : []
}

function showMessage(text, type = "info") {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".message")
  existingMessages.forEach((msg) => msg.remove())

  const message = document.createElement("div")
  message.className = `message ${type}`
  message.textContent = text

  const form = document.querySelector(".auth-form")
  form.insertBefore(message, form.firstChild)

  setTimeout(() => {
    message.remove()
  }, 5000)
}

function setButtonLoading(button, loading) {
  if (loading) {
    button.classList.add("loading")
    button.disabled = true
  } else {
    button.classList.remove("loading")
    button.disabled = false
  }
}

// Auto-fill for demo purposes
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  setTimeout(() => {
    if (loginForm) {
      const emailInput = loginForm.querySelector('input[name="email"]')
      const passwordInput = loginForm.querySelector('input[name="password"]')

      if (emailInput && passwordInput) {
        emailInput.value = "demo@ardydev.com"
        passwordInput.value = "demo123"
      }
    }
  }, 1000)
}
