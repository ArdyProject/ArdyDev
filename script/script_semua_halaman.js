// Global Variables
let isLoggedIn = false
let currentUser = null
let visitorData = {
  today: 0,
  total: 0,
  hourlyData: [],
}

// Templates Data
const templatesData = [
  {
    id: 1,
    title: "Portfolio Template",
    image: "image/HTML.JPG",
    rating: 2.8,
    category: "html",
    link: "https://www.mediafire.com/file/b097zibgrz1do4x/portofolio.zip/file",
  },
  {
    id: 2,
    title: "Business Website",
    image: "image/HTML.JPG",
    rating: 4.9,
    category: "html",
    link: "https://www.mediafire.com/file/raxq0cwrb77ft2p/Bussiness.zip/file",
  },
  {
    id: 3,
    title: "Amelia Portfolio",
    image: "image/HTML.jpg",
    rating: 4.2,
    category: "html",
    link: "https://www.mediafire.com/file/gvmba4pk5rvnyb8/APortfolio.zip/file",
  },
  {
    id: 4,
    title: "Travel Website",
    image: "image/HTML.jpg",
    rating: 4.0,
    category: "html",
    link: "https://www.mediafire.com/file/hfe5xhm5fbkvnbm/Travel.zip/file",
  },
  {
    id: 5,
    title: "E-commerce Site",
    image: "image/HTML.jpg",
    rating: 4.4,
    category: "html",
    link: "https://www.mediafire.com/file/b9upp76zgskpv7o/ecomers.zip/file",
  },
  {
    id: 6,
    title: "Website Gabut",
    image: "image/HTML.jpg",
    rating: 4.8,
    category: "html",
    link: "https://www.mediafire.com/file/b4hxcznwy7ww0r9/Web_Gabut.zip/file",
  },
  {
    id: 7,
    title: "Church",
    image: "image/HTML.jpg",
    rating: 5.0,
    category: "html",
    link: "https://ardyproject.github.io/WelcomeGSJA/",
  },
]

// Tutorial Videos Data - Updated with your specific YouTube Shorts
const tutorialVideos = [
  {
    id: 1,
    title: "Tutorial singkat Part-1",
    description: "Tutorial Install Framework PySimpleGUI di Android Terkhusus Di aplikasi PyDroid...",
    videoId: "7Wk2flSehVQ",
    type: "shorts",
    originalUrl: "https://youtube.com/shorts/7Wk2flSehVQ?si=ZOjMnU5fMyfQRpEYLink",
  },
  {
    id: 2,
    title: "Tutorial singkat Part-2",
    description: "Tuttorial cara buka, akses, edit, preview template Web berupa file Zip yang telah di download dari website ARDY_DEV",
    videoId: "6vXQOI6OkLk",
    type: "shorts",
    originalUrl: "https://youtube.com/shorts/6vXQOI6OkLk?si=atRgWKoNFCGHlHkx",
  },
]

// DOM Elements
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobileMenu")
const profileIcon = document.getElementById("profileIcon")
const profilePopup = document.getElementById("profilePopup")
const logoutBtn = document.getElementById("logoutBtn")

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus()
  initializeComponents()
  updateVisitorCount()
  loadPageContent()

  // Check if on desktop and show alert for hamburger menu
  if (window.innerWidth >= 768) {
    setupDesktopRestrictions()
  }
})

// Authentication Functions
function checkAuthStatus() {
  const userData = localStorage.getItem("ardydev_user")
  if (userData) {
    currentUser = JSON.parse(userData)
    isLoggedIn = true
    updateUIForLoggedInUser()
  } else {
    redirectToLogin()
  }
}

function updateUIForLoggedInUser() {
  if (profileIcon) {
    profileIcon.style.display = "block"
  }

  const profileName = document.getElementById("profileName")
  const profileEmail = document.getElementById("profileEmail")

  if (profileName && currentUser) {
    profileName.textContent = currentUser.fullName || currentUser.email
  }
  if (profileEmail && currentUser) {
    profileEmail.textContent = currentUser.email
  }
}

function redirectToLogin() {
  const currentPage = window.location.pathname
  const authPages = ["/account/login.html", "/account/register.html", "/account/forgot_password.html"]

  if (!authPages.some((page) => currentPage.includes(page))) {
    window.location.href = "account/login.html"
  }
}

function logout() {
  localStorage.removeItem("ardydev_user")
  localStorage.removeItem("ardydev_remember")
  window.location.href = "account/login.html"
}

// Component Initialization
function initializeComponents() {
  // Hamburger Menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", toggleMobileMenu)
  }

  // Profile Popup
  if (profileIcon && profilePopup) {
    profileIcon.addEventListener("click", toggleProfilePopup)
  }

  // Logout Button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
  }

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu()
    }

    if (!profileIcon.contains(e.target) && !profilePopup.contains(e.target)) {
      closeProfilePopup()
    }
  })
}

function toggleMobileMenu() {
  if (window.innerWidth >= 768) {
    alert("Fitur hanya didukung di tampilan mobile")
    return
  }

  hamburger.classList.toggle("active")
  mobileMenu.classList.toggle("active")
}

function closeMobileMenu() {
  hamburger.classList.remove("active")
  mobileMenu.classList.remove("active")
}

function toggleProfilePopup() {
  profilePopup.classList.toggle("active")
}

function closeProfilePopup() {
  profilePopup.classList.remove("active")
}

// Desktop Restrictions
function setupDesktopRestrictions() {
  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Fitur hanya didukung di tampilan mobile")
    })
  }
}

// Visitor Counter and Chart
function updateVisitorCount() {
  // Get stored visitor data
  const storedData = localStorage.getItem("ardydev_visitors")
  if (storedData) {
    visitorData = JSON.parse(storedData)
  }

  // Check if it's a new day
  const today = new Date().toDateString()
  const lastVisit = localStorage.getItem("ardydev_last_visit")

  if (lastVisit !== today) {
    visitorData.today = 1
    localStorage.setItem("ardydev_last_visit", today)
  } else {
    visitorData.today++
  }

  visitorData.total++

  // Update hourly data for chart
  const currentHour = new Date().getHours()
  if (!visitorData.hourlyData[currentHour]) {
    visitorData.hourlyData[currentHour] = 0
  }
  visitorData.hourlyData[currentHour]++

  // Save data
  localStorage.setItem("ardydev_visitors", JSON.stringify(visitorData))

  // Update UI
  const visitorCountEl = document.getElementById("visitorCount")
  const totalVisitorsEl = document.getElementById("totalVisitors")

  if (visitorCountEl) {
    animateNumber(visitorCountEl, visitorData.today)
  }
  if (totalVisitorsEl) {
    animateNumber(totalVisitorsEl, visitorData.total)
  }

  // Update chart
  updateVisitorChart()
}

function animateNumber(element, targetNumber) {
  let currentNumber = 0
  const increment = targetNumber / 50
  const timer = setInterval(() => {
    currentNumber += increment
    if (currentNumber >= targetNumber) {
      currentNumber = targetNumber
      clearInterval(timer)
    }
    element.textContent = Math.floor(currentNumber)
  }, 20)
}

function updateVisitorChart() {
  const canvas = document.getElementById("visitorChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Chart data
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const data = hours.map((hour) => visitorData.hourlyData[hour] || 0)
  const maxValue = Math.max(...data, 1)

  // Chart styling
  const barWidth = width / 24
  const chartHeight = height - 40

  // Draw bars
  ctx.fillStyle = "#667eea"
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * chartHeight
    const x = index * barWidth
    const y = height - barHeight - 20

    ctx.fillRect(x + 2, y, barWidth - 4, barHeight)
  })

  // Draw labels
  ctx.fillStyle = "#333"
  ctx.font = "10px Arial"
  ctx.textAlign = "center"

  for (let i = 0; i < 24; i += 4) {
    const x = i * barWidth + barWidth / 2
    ctx.fillText(i + ":00", x, height - 5)
  }
}

// Page Content Loading
function loadPageContent() {
  const currentPage = window.location.pathname

  if (currentPage.includes("template.html")) {
    loadTemplates()
    setupTemplateSearch()
    setupTemplateFilter()
  } else if (currentPage.includes("galeri.html")) {
    loadGallery()
  } else if (currentPage.includes("tutorial.html")) {
    loadTutorials()
  } else if (currentPage.includes("kontak.html")) {
    setupContactForm()
    console.log("Contact page loaded") // Debug log
  }
}

// Template Functions
function loadTemplates() {
  const templatesGrid = document.getElementById("templatesGrid")
  if (!templatesGrid) return

  templatesGrid.innerHTML = ""

  templatesData.forEach((template) => {
    const templateCard = createTemplateCard(template)
    templatesGrid.appendChild(templateCard)
  })
}

function createTemplateCard(template) {
  const card = document.createElement("div")
  card.className = "template-card"
  card.dataset.category = template.category
  card.dataset.title = template.title.toLowerCase()

  card.innerHTML = `
    <img src="${template.image}" alt="${template.title}" class="template-image">
    <div class="template-content">
        <h3 class="template-title">${template.title}</h3>
        <div class="template-rating">
            <div class="stars">
                ${generateStars(template.rating)}
            </div>
            <span class="rating-text">${template.rating}</span>
        </div>
        <a href="${template.link}" target="_blank" class="template-link">
            <i class="fas fa-download"></i>
            Download Template
        </a>
    </div>
`

  return card
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>'
  }

  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>'
  }

  return starsHTML
}

function setupTemplateSearch() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const templateCards = document.querySelectorAll(".template-card")

    templateCards.forEach((card) => {
      const title = card.dataset.title
      if (title.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
}

function setupTemplateFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const filter = this.dataset.filter
      const templateCards = document.querySelectorAll(".template-card")

      templateCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Gallery Functions
function loadGallery() {
  const galleryGrid = document.getElementById("galleryGrid")
  if (!galleryGrid) return

  galleryGrid.innerHTML = ""

  templatesData.forEach((template) => {
    const galleryItem = createGalleryItem(template)
    galleryGrid.appendChild(galleryItem)
  })
}

function createGalleryItem(template) {
  const item = document.createElement("div")
  item.className = "gallery-item"

  item.innerHTML = `
    <img src="${template.image}" alt="${template.title}" class="gallery-image">
`

  item.addEventListener("click", () => {
    window.location.href = `template.html#template-${template.id}`
  })

  return item
}

// Tutorial Functions
function loadTutorials() {
  const tutorialsGrid = document.getElementById("tutorialsGrid")
  if (!tutorialsGrid) return

  tutorialsGrid.innerHTML = ""

  tutorialVideos.forEach((video) => {
    const tutorialItem = createTutorialItem(video)
    tutorialsGrid.appendChild(tutorialItem)
  })
}

function createTutorialItem(video) {
  const item = document.createElement("div")
  item.className = "tutorial-item"

  // Create proper embed URL for YouTube Shorts
  const embedUrl = `https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0&autoplay=0`

  item.innerHTML = `
        <div class="tutorial-video">
            <iframe src="${embedUrl}" 
                    title="${video.title}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
            </iframe>
        </div>
        <div class="tutorial-content">
            <h3 class="tutorial-title">${video.title}</h3>
            <p class="tutorial-description">${video.description}</p>
            <div class="tutorial-actions">
                <a href="${video.originalUrl}" target="_blank" class="view-original-btn">
                    <i class="fab fa-youtube"></i>
                    Lihat di YouTube
                </a>
                <a href="https://youtube.com/@kingproject_ar?si=LVLQB6ViZRZgg4rB" target="_blank" class="subscribe-btn">
                    <i class="fab fa-youtube"></i>
                    Subscribe Channel KingProject
                </a>
            </div>
        </div>
    `

  return item
}

// Contact Form Functions
function setupContactForm() {
  const contactForm = document.getElementById("contactForm")
  console.log("Setting up contact form:", contactForm) // Debug log

  if (!contactForm) {
    console.error("Contact form not found!")
    return
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log("Form submitted") // Debug log

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validate required fields
    if (!name || !email || !message) {
      showMessage("Mohon lengkapi semua field yang wajib diisi", "error")
      return
    }

    // Create WhatsApp message
    const whatsappMessage = `Halo, saya ${name} (${email}). ${message}`
    const whatsappUrl = `https://wa.me/6283146557755?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form
    this.reset()

    // Show success message
    showMessage("Pesan berhasil dikirim! Anda akan diarahkan ke WhatsApp.", "success")
  })

  // Setup file input preview
  const photoInput = document.getElementById("photo")
  if (photoInput) {
    photoInput.addEventListener("change", function (e) {
      const file = e.target.files[0]
      const label = this.nextElementSibling

      if (file) {
        label.querySelector("span").textContent = file.name
        label.style.background = "#e7f3ff"
        label.style.borderColor = "#667eea"
      } else {
        label.querySelector("span").textContent = "Pilih Foto"
        label.style.background = "#f8f9fa"
        label.style.borderColor = "#e9ecef"
      }
    })
  }
}

// Utility Functions
function showMessage(text, type = "info") {
  const message = document.createElement("div")
  message.className = `message ${type}`
  message.textContent = text

  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 5000)
}

// Real-time updates
setInterval(() => {
  updateVisitorChart()

  // Update subscriber count with animation
  const subscriberCount = document.getElementById("subscriberCount")
  if (subscriberCount) {
    const currentCount = Number.parseInt(subscriberCount.textContent.replace(",", ""))
    const newCount = currentCount + Math.floor(Math.random() * 3)
    subscriberCount.textContent = newCount.toLocaleString()
  }

  // Update template downloads
  const templateDownloads = document.getElementById("templateDownloads")
  if (templateDownloads) {
    const currentDownloads = Number.parseInt(templateDownloads.textContent.replace(",", ""))
    const newDownloads = currentDownloads + Math.floor(Math.random() * 5)
    templateDownloads.textContent = newDownloads.toLocaleString()
  }
}, 30000) // Update every 30 seconds
