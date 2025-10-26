const events = document.querySelectorAll('.timeline-event');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let startIndex = 0;
const visibleCount = 3;

function updateTimeline(direction = null) {
    events.forEach((event, i) => {
        if (i >= startIndex && i < startIndex + visibleCount) {
            event.classList.add('active');
        } else {
            event.classList.remove('active');
        }
    });

    leftBtn.style.opacity = startIndex === 0 ? '0.3' : '1';
    rightBtn.style.opacity = startIndex + visibleCount >= events.length ? '0.3' : '1';

    const offset = -(startIndex * (events[0].offsetWidth + 40));
    const timeline = document.querySelector('.timeline-horizontal');
    timeline.style.transform = `translateX(${offset}px)`;
}

leftBtn.addEventListener('click', () => {
    if (startIndex > 0) {
        startIndex--;
        updateTimeline('left');
    }
});

rightBtn.addEventListener('click', () => {
    if (startIndex + visibleCount < events.length) {
        startIndex++;
        updateTimeline('right');
    }
});

// Custom Cursor

const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
});

// Create scrollbar elements
const scrollbar = document.createElement('div');
scrollbar.id = 'custom-scrollbar';
const handle = document.createElement('div');
handle.id = 'custom-scrollbar-handle';
scrollbar.appendChild(handle);
document.body.appendChild(scrollbar);

let isScrolling;
const updateHandle = () => {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const handleHeight = Math.max((window.innerHeight / document.body.scrollHeight) * window.innerHeight, 30);
    handle.style.height = handleHeight + 'px';
    const maxTop = window.innerHeight - handleHeight;
    handle.style.top = (scrollTop / docHeight) * maxTop + 'px';
};

// Show scrollbar on scroll
window.addEventListener('scroll', () => {
    scrollbar.style.opacity = '1';
    updateHandle();

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        scrollbar.style.opacity = '0';
    }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("about-btn");
  const skillsBtn = document.getElementById("skills-btn");
  const ratingBtn = document.getElementById("rating-btn");
  const aboutCard = document.getElementById("about-card");

  const aboutContent = document.createElement("div");
  aboutContent.classList.add("about-content");
  aboutCard.appendChild(aboutContent);

  // Default content (About)
  aboutContent.innerHTML = `
    <h2>About Me</h2>
    <p>Hello! I am Serhat, a passionate Tester & QA Specialist. I focus on Roblox games, helping developers identify bugs, improve gameplay, and enhance user experience.</p>
    <p>My testing experience ranges from small indie games to larger projects with teams of 20+ people. I enjoy exploring game mechanics, providing detailed feedback, and ensuring smooth and fun gameplay for players.</p>
  `;
  aboutBtn.classList.add("active");

  function switchContent(type) {
    // Disable all buttons
    aboutBtn.classList.remove("active");
    skillsBtn.classList.remove("active");
    ratingBtn.classList.remove("active");

    // Fade out current content
    aboutContent.style.opacity = "0";
    aboutContent.style.transform = "translateY(10px)";

    setTimeout(() => {
      if (type === "about") {
        aboutContent.innerHTML = `
          <h2>About Me</h2>
          <p>Hello! I am Serhat, a passionate Tester & QA Specialist. I focus on Roblox games, helping developers identify bugs, improve gameplay, and enhance user experience.</p>
          <p>My testing experience ranges from small indie games to larger projects with teams of 20+ people. I enjoy exploring game mechanics, providing detailed feedback, and ensuring smooth and fun gameplay for players.</p>
        `;
        aboutBtn.classList.add("active");
      } else if (type === "skills") {
        aboutContent.innerHTML = `
          <h2>My Skills</h2>
          <div class="skills-grid">
            <ul>
              <li>QA Testing & Bug Tracking</li>
              <li>Game Balancing & Mechanics Analysis</li>
              <li>Team Collaboration & Reporting</li>
              <li>Roblox Studio Debugging</li>
              <li>UI/UX Feedback & User Experience</li>
            </ul>
            <ul>
              <li>Documentation & Notes</li>
              <li>Creative Problem Solving</li>
              <li>Communication & Feedback</li>
              <li>Adaptability & Learning</li>
              <li>Testing Automation</li>
            </ul>
          </div>
        `;
        skillsBtn.classList.add("active");
      } else if (type === "rating") {
        const categories = [
          { name: "Problem Solving", rating: 5 },
          { name: "Communication", rating: 4 },
          { name: "Attention to Detail", rating: 5 },
          { name: "Adaptability", rating: 4 },
          { name: "Time Management", rating: 4 },
          { name: "Teamwork", rating: 5 }
        ];

        const total = categories.reduce((a,b) => a + b.rating, 0);
        const average = total / categories.length;

        const leftCol = categories.slice(0,3);
        const rightCol = categories.slice(3,6);

        let ratingsHTML = `<h2>My Rating</h2>`;
        ratingsHTML += `
          <div class="skills-grid">
            <ul>
              ${leftCol.map(c => `<li>${c.name}: <span class="star">${"★".repeat(c.rating)}${"☆".repeat(5-c.rating)}</span></li>`).join("")}
            </ul>
            <ul>
              ${rightCol.map(c => `<li>${c.name}: <span class="star">${"★".repeat(c.rating)}${"☆".repeat(5-c.rating)}</span></li>`).join("")}
            </ul>
          </div>
          <h2 style="margin-top:25px; text-align:center; color:#00ff99; text-shadow:0 0 10px rgba(0,255,153,0.6); font-family:'Oxanium', cursive;">
            Average Rating
          </h2>
          <div class="average-rating" style="font-size:3rem; color:#00ff99; text-align:center; text-shadow:0 0 10px rgba(0,255,153,0.6);">
            ★★★★⯪
          </div>
        `;
        aboutContent.innerHTML = ratingsHTML;
        ratingBtn.classList.add("active");
      }

      // Fade in new content
      aboutContent.style.opacity = "1";
      aboutContent.style.transform = "translateY(0)";
    }, 400);
  }

  aboutBtn.addEventListener("click", () => switchContent("about"));
  skillsBtn.addEventListener("click", () => switchContent("skills"));
  ratingBtn.addEventListener("click", () => switchContent("rating"));
});



// Initialize on load
updateHandle();

// Initialize
updateTimeline();
