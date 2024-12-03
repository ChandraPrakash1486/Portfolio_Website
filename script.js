const feedUrl = 'https://medium.com/feed/@chandraprakashtekwani8'; // Replace with your Medium RSS feed URL
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    async function fetchMediumArticles() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const articlesList = document.getElementById('medium-articles');
        data.items.forEach(item => {
          const pubDate = new Date(item.pubDate);
          const listItem = document.createElement('li');
          listItem.classList.add('article-item');
          listItem.setAttribute('data-month', pubDate.getMonth() + 1);
          listItem.setAttribute('data-year', pubDate.getFullYear());
          listItem.innerHTML = `
            <div class="timeline-content">
              <img src="${item.thumbnail}" alt="${item.title}" class="article-banner">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="article-title">${item.title}</a>
              <p class="article-date">${item.pubDate.split(' ')[0]}</p>
              <p class="article-description">${item.description.slice(0, 100)}...</p>
            </div>
          `;
          articlesList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching Medium RSS feed:', error);
      }
    }

    function generateYearButtons() {
      const currentYear = new Date().getFullYear();
      const yearSlider = document.getElementById('year-slider');
      for (let year = 2020; year <= currentYear + 1; year++) {
        const button = document.createElement('button');
        button.classList.add('year-btn');
        button.setAttribute('data-year', year);
        button.textContent = year;
        yearSlider.appendChild(button);
      }
    }

    fetchMediumArticles();
    generateYearButtons();

    document.querySelectorAll('.month-btn').forEach(button => {
      button.addEventListener('click', () => {
        const month = button.getAttribute('data-month');
        document.querySelectorAll('.article-item').forEach(item => {
          if (item.getAttribute('data-month') === month) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    document.querySelectorAll('.year-btn').forEach(button => {
      button.addEventListener('click', () => {
        const year = button.getAttribute('data-year');
        document.querySelectorAll('.article-item').forEach(item => {
          if (item.getAttribute('data-year') === year) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });