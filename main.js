  import { createApp, ref, onMounted, computed, onUnmounted } from 'vue'
  
  const app = createApp({
    template: `
      <div>
        <!-- Start Screen with Hero Banner -->
        <div v-if="screen === 'start'">
          <h1 style="text-align: center; margin: 1rem 0;">Bem-vindo ao FILPLEY</h1>
          <div class="hero-banner">
            <img :src="heroBanners[currentHeroBannerIndex].backgroundImage" :alt="heroBanners[currentHeroBannerIndex].title" />
            <div>
              <h2>{{ heroBanners[currentHeroBannerIndex].title }}</h2>
              <p>{{ heroBanners[currentHeroBannerIndex].description }}</p>
              
            </div>
          </div>
          <div style="text-align: center;">
            <button @click="showLogin">Login</button>
            <button @click="showSignup">Cadastrar</button>
          </div>
        </div>
        
        <!-- Login Screen -->
        <div v-if="screen === 'login'" style="text-align: center; padding: 1rem;">
          <h2>Login</h2>
          <input v-model="email" type="email" placeholder="Email" />
          <br />
          <input v-model="password" type="password" placeholder="Senha" />
          <br />
          <button @click="login">Entrar</button>
          <button @click="goBackAuth('start')">Voltar</button>
        </div>
        
        <!-- Signup Screen -->
        <div v-if="screen === 'signup'" style="text-align: center; padding: 1rem;">
          <h2>Cadastro</h2>
          <input v-model="name" type="text" placeholder="Nome" />
          <br />
          <input v-model="email" type="email" placeholder="Email" />
          <br />
          <input v-model="password" type="password" placeholder="Senha" />
          <br />
          <button @click="signup">Registrar</button>
          <button @click="goBackAuth('start')">Voltar</button>
        </div>
        
        <!-- Main Content Screen -->
        <div v-if="screen === 'main'">
          <header class="main-header">
            <div>
              <label class="popup">
                <input type="checkbox">
                <div class="burger" tabindex="0">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <nav class="popup-window">
                  <legend>Categorias</legend>
                  <ul>
                    <li>
                      <button @click="filterByCategory('Todos')">
                        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                        </svg>
                        <span>Todos</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Filmes')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle r="4" cy="7" cx="9"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>Filmes</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Séries')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <span>Séries</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Animes')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                        </svg>
                        <span>Animes</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Desenhos')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <line y2="18" x2="6" y1="6" x1="18"></line>
                          <line y2="18" x2="18" y1="6" x1="6"></line>
                        </svg>
                        <span>Desenhos</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('TV Ao Vivo')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <polyline points="17 2 12 7 7 2"></polyline>
                        </svg>
                        <span>TV Ao Vivo</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('animação')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5"></path>
                          <circle r="4" cy="7" cx="9"></circle>
                        </svg>
                        <span>animação</span>
                      </button>
                    </li>
                   <li>
                      <button @click="filterByCategory('Ficção Científica')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5"></path>
                          <circle r="4" cy="7" cx="9"></circle>
                        </svg>
                        <span>Ficção Científica</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Ação')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5"></path>
                          <circle r="4" cy="7" cx="9"></circle>
                        </svg>
                        <span>Ação</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Aventura')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3"></path>
                        </svg>
                        <span>Aventura</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Comédia')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <span>Comédia</span>
                      </button>
                    </li>
                     <li>
                      <button @click="filterByCategory('Horror')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <span>Horror</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Romance')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M12 21C12 21 7 16 7 11C7 7 10 4 12 4C14 4 17 7 17 11C17 16 12 21 12 21Z"></path>
                        </svg>
                        <span>Romance</span>
                      </button>
                    </li>
                    <li>
                      <button @click="filterByCategory('Terror')">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14">
                          <path d="M12 2L12 6"></path>
                          <path d="M12 18L12 22"></path>
                          <path d="M22 12L18 12"></path>
                          <path d="M6 12L2 12"></path>
                        </svg>
                        <span>Terror</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </label>
            </div>
            <input v-model="searchQuery" placeholder="Buscar conteúdo..." class="search-input" />
            <button @click="goToProfile">Perfil</button>
          </header>
          <div v-for="(items, category) in filteredContent" :key="category" class="category-section">
            <h3>{{ category }}</h3>
            <div class="content-grid">
              <div class="content-card" v-for="item in items" :key="item.title">
                <img :src="item.image" :alt="item.title" class="content-img" />
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <p v-if="item.genres">
                  <strong>Gêneros:</strong> {{ item.genres.join(', ') }}
                </p>
                <p v-if="item.ageRating">
                  <strong>Classificação:</strong> {{ item.ageRating }}
                </p>
                <button @click="showContentDetails(item, category)">Detalhes</button>
                <button v-if="!isFavorite(item)" @click="addToFavorites(item)">Adicionar aos Favoritos</button>
                <button v-if="isFavorite(item)" @click="removeFromFavorites(item)">Remover dos Favoritos</button>
                <button @click="playContent(item)">Assistir</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content Details Screen -->
        <div v-if="screen === 'content-details'" style="padding: 1rem;">
          <h2>{{ currentContent.title }}</h2>
          <img :src="currentContent.image" :alt="currentContent.title" style="max-width: 100%; border-radius: 8px;" />
          <p>{{ currentContent.description }}</p>
          <p v-if="currentContent.genres">
            <strong>Gêneros:</strong> {{ currentContent.genres.join(', ') }}
          </p>
          <p v-if="currentContent.ageRating">
            <strong>Classificação:</strong> {{ currentContent.ageRating }}
          </p>
          <div v-if="currentContent.seasons">
            <h3>Temporadas</h3>
            <div>
              <button 
                v-for="season in Object.keys(currentContent.seasons)" 
                :key="season" 
                @click="selectSeasonInDetails(season)"
                :style="{ background: selectedSeasonInDetails === season ? 'var(--accent)' : 'var(--secondary)' }">
                Temporada {{ season }}
              </button>
            </div>
            <div v-if="selectedSeasonInDetails">
              <h4>Episódios - Temporada {{ selectedSeasonInDetails }}</h4>
              <ul>
                <li v-for="episode in currentContent.seasons[selectedSeasonInDetails]" :key="episode.name">
                  {{ episode.name }} 
                  <button @click="playContentFromDetails(episode)">Assistir</button>
                </li>
              </ul>
            </div>
          </div>
          <button @click="goBack('main')">Voltar</button>
        </div>
        
        <!-- Player Screen -->
        <div v-if="screen === 'player'" class="player-screen">
          <button class="btn-close" @click="goBack('main')">Voltar</button>
          <div class="video-container">
            <video id="videoPlayer" :src="currentVideoUrl" controls 
              @timeupdate="updateVideoTime" 
              @loadedmetadata="setVideoDuration"></video>
          </div>
          <div class="video-controls">
            <div class="video-progress">
              <span>{{ Math.floor(currentTime) }} / {{ Math.floor(videoDuration) }} seg</span>
            </div>
            <div class="video-options">
              <select v-model="selectedAudio" @change="changeAudio">
                <option v-for="track in audioTracks" :value="track.label">{{ track.label }}</option>
              </select>
              <button class="btn-toggle" @click="toggleSubtitles">
                {{ subtitlesEnabled ? 'Desligar Legendas' : 'Ligar Legendas' }}
              </button>
              <input type="range" min="0" max="1" step="0.1" v-model="volumeLevel" @input="adjustVolume">
              <button class="btn-toggle" @click="muteToggle">
                {{ isMuted ? 'Desmutar' : 'Mutar' }}
              </button>
            </div>
          </div>
          <div v-if="currentContent.seasons" class="player-seasons">
            <div class="seasons-header">
              <h3>Temporadas: {{ currentSeason }}</h3>
              <div class="season-buttons">
                <button v-for="season in Object.keys(currentContent.seasons)" 
                  :key="season" 
                  @click="selectSeason(season)" 
                  :class="{ 'active': season === currentSeason }">
                  Temporada {{ season }}
                </button>
              </div>
            </div>
            <div class="episodes-list">
              <h4>Episódios</h4>
              <ul>
                <li v-for="episode in currentContent.seasons[currentSeason]" :key="episode.name">
                  <button @click="selectEpisode(episode)" :class="{ 'active': currentEpisode && episode.name === currentEpisode.name }">
                    {{ episode.name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="rating-system">
            <h4>Avalie este conteúdo</h4>
            <div class="radio-input">
              <input type="radio" v-model="ratingValue" :value="1" name="value-radio" id="star-1" class="star s1" />
              <input type="radio" v-model="ratingValue" :value="2" name="value-radio" id="star-2" class="star s2" />
              <input type="radio" v-model="ratingValue" :value="3" name="value-radio" id="star-3" class="star s3" />
              <input type="radio" v-model="ratingValue" :value="4" name="value-radio" id="star-4" class="star s4" />
              <input type="radio" v-model="ratingValue" :value="5" name="value-radio" id="star-5" class="star s5" />
            </div>
            <button @click="submitRating">Salvar Avaliação</button>
          </div>
        </div>
        
        <!-- Profile Screen -->
        <div v-if="screen === 'profile'" style="text-align: center; padding: 1rem;">
          <h2>Perfil</h2>
          <div class="profile-info" style="background: var(--card-bg); padding: 1rem; border-radius: var(--border-radius); display: inline-block;">
            <p><strong>Nome:</strong> {{ currentUser && currentUser.name ? currentUser.name : 'Não definido' }}</p>
            <p><strong>Email:</strong> {{ currentUser && currentUser.email ? currentUser.email : 'Não definido' }}</p>
          </div>
          <div class="favorites-section" style="margin-top: 2rem;">
            <h3>Favoritos</h3>
            <div class="favorites-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div v-for="fav in favorites" :key="fav.title" class="favorite-card" style="background: var(--card-bg); padding: 0.5rem; border-radius: var(--border-radius); text-align: center;">
                <img :src="fav.image" :alt="fav.title" style="width: 100%; border-radius: var(--border-radius); margin-bottom: 0.5rem;" />
                <p>{{ fav.title }}</p>
                <button @click="removeFromFavorites(fav)">Remover</button>
                <button @click="playContent(fav)">Assistir</button>
              </div>
              <div v-if="favorites.length === 0" style="grid-column: 1 / -1; text-align: center; color: #ccc;">
                Nenhum favorito adicionado
              </div>
            </div>
          </div>
          <div style="margin-top: 1rem;">
            <button @click="goBackToMain">Voltar</button>
          </div>
        </div>
      </div>
    `,
    setup() {
      const screen = ref('start')
      const email = ref('')
      const password = ref('')
      const name = ref('')
      const currentVideoUrl = ref('')
      const videoDuration = ref(0)
      const currentTime = ref(0)
      const isEpisodeEnd = ref(false)
      const users = ref([])
      const currentContent = ref(null)
      const currentSeason = ref(null)
      const currentEpisode = ref(null)
      const searchQuery = ref('')
      const favorites = ref([])
      const audioTracks = ref([
        { label: 'Português (Dublado)', src: '' },
        { label: 'Original (Legendado)', src: '' }
      ])
      const selectedAudio = ref('Português (Dublado)')
      const subtitleTracks = ref([
        { label: 'Português', src: '', lang: 'pt' },
        { label: 'Inglês', src: '', lang: 'en' }
      ])
      const subtitlesEnabled = ref(false)
      const selectedSubtitle = ref('Português')
      const subtitleSize = ref(24)
      const subtitleColor = ref('#FFFFFF')
      const volumeLevel = ref(1)
      const isMuted = ref(false)
      const heroBanners = ref([
        {
          title: 'Dragon Ball Super: Broly',
          description: 'O próximo capítulo épico da saga que conquista gerações',
          backgroundImage: 'https://static-images.lpnt.fr/cd-cw809/images/2019/08/13/19197817lpw-19198225-article-jpg_6426493_660x287.jpg',
          content: { 
            title: 'dragon ball super: broly', 
            image: 'https://animesdigital.org/wp-content/uploads/2021/10/assistir-dragon-ball-super-broly-pt-br-todos-os-episodios-online-animesdigital.jpg',
            url: 'https://api.anivideo.net/videohls.php?d=https://cdn-s01.mywallpaper-4k-image.net/stream/d/dragon-ball-super-broly-dublado/01.mp4/index.m3u8' 
          }
        },
        {
          title: 'Solo Leveling',
          description: 'A série de ação e aventura que está conquistando o mundo dos animes',
          backgroundImage: 'https://i.ytimg.com/vi/75n91rq-9Ro/maxresdefault.jpg',
          content: {
            title: 'Solo Leveling',
            image: '',
            url: 'https://www-fontedecanais-app.72urnh57ivdu70.com/series/solo%20leveling/242091.mp4?username=Visionplay-vods&content_id=260689&token=QURQWVpbTVlcXg=='
          }
        },
        {
          title: 'Deadpool & Wolverine',
          description: 'Wolverine está se recuperando quando cruza seu caminho com Deadpool.',
          backgroundImage: 'https://www.telemadrid.es/2024/08/21/noticias/cultura/_2699440047_46715716_1300x731.jpg',
          content: {
            title: 'Stranger Things',
            image: 'https://occ-0-1723-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVuVC7HrxKlCBRl8WsWm8tqgKk0wfkPpyg-GsRUVf4BT9Gw2rWPALkzYI3CLrB7_7lUW9SBYvMvWMhAIGp1DQz4vZGe8NuoaIDoD.jpg',
            url: 'https://exemplo.com/stranger-s1e1'
          }
        }
      ])
      const currentHeroBannerIndex = ref(0)
      const rotateHeroBanner = () => {
        currentHeroBannerIndex.value = (currentHeroBannerIndex.value + 1) % heroBanners.value.length
      }
      const currentUser = ref(null)
      const showLogin = () => {
        screen.value = 'login'
      }
      const showSignup = () => {
        screen.value = 'signup'
      }
      const goBack = (targetScreen) => {
        screen.value = targetScreen
      }
      const goBackAuth = (targetScreen) => {
        screen.value = targetScreen
      }
      const login = () => {
        const user = users.value.find(u => u.email === email.value && u.password === password.value)
        if (user) {
          currentUser.value = user
          screen.value = 'main'
        } else {
          alert('Usuário ou senha incorretos')
        }
      }
      const signup = () => {
        const existingUser = users.value.find(u => u.email === email.value)
        if (existingUser) {
          alert('Já existe uma conta com este e-mail')
          return
        }
        if (!name.value || !email.value || !password.value) {
          alert('Preencha todos os campos')
          return
        }
        const newUser = { name: name.value, email: email.value, password: password.value }
        users.value.push(newUser)
        localStorage.setItem('users', JSON.stringify(users.value))
        currentUser.value = newUser
        screen.value = 'main'
      }
      const playContent = (contentItem) => {
        screen.value = 'player'
        currentContent.value = contentItem
        if (contentItem.seasons) {
          const firstSeasonNumber = Object.keys(contentItem.seasons)[0]
          currentSeason.value = firstSeasonNumber
          currentEpisode.value = contentItem.seasons[firstSeasonNumber][0]
          currentVideoUrl.value = currentEpisode.value.url
        } else {
          currentVideoUrl.value = contentItem.url1080p || contentItem.url4K || contentItem.url720p || contentItem.url480p || contentItem.url
        }
        const video = document.getElementById('videoPlayer');
        const videoSrc = currentVideoUrl.value;
        if (videoSrc.includes('.m3u8')) {
          if (Hls.isSupported()) {
            if (window.hls) {
              window.hls.destroy();
            }
            window.hls = new Hls();
            window.hls.loadSource(videoSrc);
            window.hls.attachMedia(video);
            window.hls.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play();
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', function() {
              video.play();
            });
          }
        } else {
          video.src = videoSrc;
          video.addEventListener('loadedmetadata', function() {
              video.play();
            });
        }
      }
      const selectEpisode = (episode) => {
        currentEpisode.value = episode
        currentVideoUrl.value = episode.url
      }
      const selectSeason = (seasonNumber) => {
        currentSeason.value = seasonNumber
        const firstEpisode = currentContent.value.seasons[seasonNumber][0]
        currentEpisode.value = firstEpisode
        currentVideoUrl.value = firstEpisode.url
      }
      const playNextEpisode = () => {
        if (!currentContent.value || !currentSeason.value || !currentEpisode.value) return
        const currentSeasonEpisodes = currentContent.value.seasons[currentSeason.value]
        const currentEpisodeIndex = currentSeasonEpisodes.findIndex(ep => ep === currentEpisode.value)
        if (currentEpisodeIndex < currentSeasonEpisodes.length - 1) {
          const nextEpisode = currentSeasonEpisodes[currentEpisodeIndex + 1]
          currentEpisode.value = nextEpisode
          currentVideoUrl.value = nextEpisode.url
        } else {
          const seasonNumbers = Object.keys(currentContent.value.seasons)
          const currentSeasonIndex = seasonNumbers.indexOf(currentSeason.value)
          if (currentSeasonIndex < seasonNumbers.length - 1) {
            const nextSeason = seasonNumbers[currentSeasonIndex + 1]
            currentSeason.value = nextSeason
            const firstEpisodeNextSeason = currentContent.value.seasons[nextSeason][0]
            currentEpisode.value = firstEpisodeNextSeason
            currentVideoUrl.value = firstEpisodeNextSeason.url
          }
        }
      }
      const closePlayer = () => {
        screen.value = 'main'
      }
      const addToFavorites = (item) => {
        const exists = favorites.value.some(fav => fav.title === item.title)
        if (!exists) {
          favorites.value.push(item)
          localStorage.setItem('favorites', JSON.stringify(favorites.value))
        }
      }
      const removeFromFavorites = (item) => {
        favorites.value = favorites.value.filter(fav => fav.title !== item.title)
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
      }
      const isFavorite = (item) => {
        return favorites.value.some(fav => fav.title === item.title)
      }
      const showPlans = () => {
        screen.value = 'main'
      }
      const showContentDetails = (item, category) => {
        currentContent.value = item
        screen.value = 'content-details'
        if (item.seasons) {
          const firstSeasonNumber = Object.keys(item.seasons)[0]
          selectedSeasonInDetails.value = firstSeasonNumber
        }
      }
      const selectedSeasonInDetails = ref(null)
      const selectSeasonInDetails = (seasonNumber) => {
        selectedSeasonInDetails.value = seasonNumber
      }
      const playContentFromDetails = (episode) => {
        if (currentContent.value.seasons) {
          currentSeason.value = selectedSeasonInDetails.value
          currentEpisode.value = episode
          currentVideoUrl.value = episode.url
        } else {
          currentVideoUrl.value = currentContent.value.url
        }
        screen.value = 'player'
      }
      const updateVideoTime = (event) => {
        currentTime.value = event.target.currentTime
      }
      const setVideoDuration = (event) => {
        videoDuration.value = event.target.duration
      }
      const changeAudio = () => {
        console.log(`Changing audio to ${selectedAudio.value}`)
      }
      const toggleSubtitles = () => {
        subtitlesEnabled.value = !subtitlesEnabled.value
      }
      const adjustVolume = () => {
        const videoElement = document.getElementById('videoPlayer')
        videoElement.volume = volumeLevel.value
        isMuted.value = volumeLevel.value === 0
      }
      const muteToggle = () => {
        const videoElement = document.getElementById('videoPlayer')
        isMuted.value = !isMuted.value
        videoElement.muted = isMuted.value
      }
      const selectedCategory = ref('')
      const filterByCategory = (category) => {
        if(category === 'Todos'){
          selectedCategory.value = ''
        } else {
          selectedCategory.value === category
            ? selectedCategory.value = ''
            : selectedCategory.value = category
        }
      }
      const content = ref({
        'Filmes': [
          { 
            title: 'Gantz:O', 
            image: 'https://resizing.flixster.com/4UsM9xLde5q2xzeO_ohc5cL6IT0=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13849642_v_h9_aa.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/647045.mp4?token=8f6114b81e51d6e1dae59b2eb3edafade09815724d14b1028e4722fdef1b7f19&expires=1743537002',
            description: 'Após o acidente, eles acordam com diversas pessoas numa sala com uma estranha esfera negra chamada Gantz, que os obriga a entrar num jogo cruel e mortal contra alienígenas que vagueiam pelo Japão.', 
            genres: ['acao','aventura','animacao','romance'],
            size: '1.5 GB', 
            ageRating: '18 anos' 
          },
          { 
            title: 'Plankton: O Filme', 
            image: 'https://pbs.twimg.com/media/Gi9Cz15a4AEW191.jpg', 
            url480p: 'https://sinalprivado.info/cache/3cfdcc01-8964-4a0c-946b-c0266cf8a1cf/playlist.m3u8',
            url720p: 'https://sinalprivado.info/cache/3cfdcc01-8964-4a0c-946b-c0266cf8a1cf/playlist.m3u8',
            url1080p: 'https://sinalprivado.info/cache/3cfdcc01-8964-4a0c-946b-c0266cf8a1cf/playlist.m3u8',
            url4K: 'https://sinalprivado.info/cache/3cfdcc01-8964-4a0c-946b-c0266cf8a1cf/playlist.m3u8',
            description: 'A confusa história de amor de Plâncton com a sua mulher-computador dá para o torto quando ela toma uma posição e decide destruir o mundo sem ele.', 
            genres: ['Aventura','animacao','comedia'],
            size: '800 MB',
            ageRating: 'Livre'
          },
          { 
            title: 'Deadpool & Wolverine', 
            image: 'https://www.telemadrid.es/2024/08/21/noticias/cultura/_2699440047_46715716_1300x731.jpg', 
            url480p: 'http://vods.conexao-vs.live:80/movie/648301.mp4',
            url720p: 'http://vods.conexao-vs.live:80/movie/648301.mp4',
            url1080p: 'http://vods.conexao-vs.live:80/movie/648301.mp4',
            url4K: 'http://vods.conexao-vs.live:80/movie/648301.mp4',
            description: 'Wolverine está se recuperando quando cruza seu caminho com Deadpool.', 
            genres: ['aventura','acao'],
            size: '2.1 GB',
            ageRating: '18 anos'
          },
          { 
            title: 'A Vingança de Jack', 
            image: 'https://image.tmdb.org/t/p/original/vqSNt2IxfazpHu58SymY5xBhsTM.jpg', 
            url480p: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url720p: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url4K: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            description: 'Um jornalista investigando assassinatos de um serial killer.', 
            genres: ['terror','horror'],
            size: '1.2 GB',
            ageRating: '18 anos'
          },
          { 
            title: 'Vingadores: Ultimato', 
            image: 'https://s2.glbimg.com/2C0hMRuCY_7NfDPjby4_Bjmq8Nc=/e.glbimg.com/og/ed/f/original/2018/03/22/avengers-infinity-war-official-poster-2018-4o.jpg',
            url1080p: 'http://vods.conexao-vs.live:80/movie/649227.mp4',
            description: 'Os Vingadores tentam desfazer as ações de Thanos.', 
            genres: ['aventura','acao'],
            size: '3.5 GB',
            ageRating: '16 anos'
          },
          { 
            title: 'Archive', 
            image: 'https://disneyplusbrasil.com.br/wp-content/uploads/2022/10/Archive-Star-Plus.jpg',
            url1080p: 'http://vods.conexao-vs.live:80/movie/644786.mp4',
            description: 'também é a mais arriscada. Especialmente porque ele tem um objetivo que deve estar oculto a todo custo: reunir-se com sua esposa morta.', 
            genres: ['ficcao científica','acao','aventura','romance'],
            size: '3.5 GB',
            ageRating: '13 anos'
          },
         { 
            title: 'Venom: A Última Rodada', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/f24b6fa98cc9962924a2444a1b327ad812dd25792d6ec6de1644a9cd4a57a93a.jpg',
            url1080p: 'http://vods.conexao-vs.live:80/movie/644556.mp4',
            description: 'Eddie e Venom estão fugindo. Perseguidos pelos dois mundos, a dupla é forçada a tomar uma decisão devastadora que vai fechar as cortinas da última rodada de Venom e Eddie',
            genres: ['acao','aventura','ficcao científica','terror'],
            size: '3.5 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Chappie', 
            image: 'https://i.ytimg.com/vi/sJ9lVOV7KB8/hq720.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/649948.mp4?token=6c1b3da785c86ec3742ce21e16d46a554f33241b66dd018d04dabfd411c44184&expires=1743169658',
            description: 'Mas Chappie é roubado por um grupo de ladrões que precisa da ajuda para um assalto a banco. Quando Vincent (Hugh Jackman), um engenheiro rival de Deon, decide sabotar as experiências do colega de trabalho, a segurança do país e o futuro de Chappie correm riscos.', 
            genres: ['aventura','acao','comedia','ficcao científica'],
            size: '2.5 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Deadpool', 
            image: 'https://p4.wallpaperbetter.com/wallpaper/1008/10/351/4k-deadpool-2-wallpaper-preview.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/649395.mp4?token=c9397e3f3bf67bed24d6b932906750ec6d71781c433991a7548319cb106d1746&expires=1743168695',
            description: 'Depois de ter sido sujeito a uma experiência clandestina que o deixa com o poder de cicatrização acelerada, Wade Wilson adopta o alter ego Deadpool. Armado com as suas novas habilidades, além dum negro e retorcido sentido de humor, Deadpool persegue o homem que quase destruiu a sua vida.', 
            genres: ['aventura','acao','comedia'],
            size: '2.5 GB',
            ageRating: '18 anos'
          },
          { 
            title: 'Anjos das Trevas', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/410bdf1eeb26c93830dc0b8fd8a50fffa610b88d9ad6444dcdebd6a76351fc2b._SX1080_FMjpg_.jpg', 
            url1080p: 'http://vods.conexao-vs.live:80/movie/654901.mp4',
            description: 'Gabriel deve confrontar seu passado trágico',
            genres: ['terror'],
            size: '900 MB',
            ageRating: '18 anos'
          },
          { 
            title: 'Venom: Tempo de Carnificina', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/20d6fcc99a38f59cf44c03aef94a205f38b266b05fe2f5788ffcfb59d2c70afb.jpg', 
            url1080p: 'http://vods.conexao-vs.live:80/movie/644717.mp4',
            description: 'Eddie tenta se restabelecer como jornalista ao entrevistar o serial killer Cletus Kasady, também portando um symbiote chamado Carnage e que acaba escapando da prisão após sua execução falhada.',
            genres: ['terror','ficcao científica','aventura'],
            size: '900 MB',
            ageRating: '16 anos'
          },
          { 
            title: 'A Lenda da Serpente', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/51d8c0540f392dd3e8ccb1c6b82527be71422a7ed771fdedb61164f19c0858b5.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646044.mp4',
            description: 'Seu passado, eles descobrem um enredo mais sombrio de forças sobrenaturais competindo pelo poder, com o destino do mundo em jogo.', 
            genres: ['aventura','acao','animacao'],
            size: '1.8 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Capitão América: O Primeiro Vingador', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/2b319a8ee036b1f0407fe76fc5b573368c39cfc6ea106d074a7a720b3c2c24a1.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/649243.mp4',
            description: 'Steve Rogers é um jovem que participa de experiências visando a criação do supersoldado americano. Quando os oficiais militares conseguem transformá-lo em uma arma humana, eles percebem que não podem arriscar a vida do jovem nas batalhas de guerra.', 
            genres: ['aventura','acao','ficcao científica'],
            size: '1.8 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo', 
            image: 'https://dougelias.tv/wp-content/uploads/2024/01/Os-Cavaleiros-do-Zodiaco-2023-Poster-scaled.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646766.mp4',
            description: 'Irmã sequestrada involuntariamente toca em vivaquepoderes ocultos, ele descobre que pode ser a única pessoa vivaque pode proteger uma Deusa', 
            genres: ['aventura','acao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'As Tartarugas Ninja', 
            image: 'https://segredosdomundo.r7.com/wp-content/uploads/2019/11/tartarugas-ninjas-historia-completa-personagens-e-filmes-7.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/647053.mp4',
            description: 'Vivendo nos esgotos de Manhattan, quatro jovens tartarugas, treinadas na arte de kung-fu, Leonardo, Rafael, Michelangelo e Donatello, junto com seu sensei, Mestre Splinter, tem que enfrentar o mal que habita cidade.', 
            genres: ['aventura','acao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Ben 10: Invasão Alienígena', 
            image: 'https://media.themoviedb.org/t/p/w780/oK190JudMVb0C5773Vab0TKcBbv.jpg', 
            url: 'ttps://sinalprivado.info/m3u8/MQ==/dnotNTgwOTllNWQtZGM2/ZjIwZGNjOTctODlhNS00YWY4LTliNzgtMmI0N2E4NWIxMTg5.m3u8',
            description: 'A batalha dos encanadores contra os invasores alienígenas será intensa e exigirá todo empenho da equipe liderada por Ben10, que deve usar seu relógio Omnitrix e evitar que a tecnologia alien seja vendida livremente em nosso mundo.', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'O Último Samurai', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/ccdcc86f9a6e6c1e4cda0087723392a31aa2b0a3eab5d905db9f929f2a300b15.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/649800.mp4',
            description: 'Em 1870 é enviado ao Japão o capitão Nathan Algren, um conceituado militar norte-americano. A missão de Algren é treinar as tropas do imperador Meiji, para que elas possam eliminar os últimos samurais que ainda vivem na região. Porém, após ser capturado pelo inimigo, Algren aprende com Katsumoto o código de honra dos samurais e passa a ficar em dúvida sobre que lado apoiar.', 
            genres: ['aventura','acao','romance'],
            size: '2.5 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Em Ruínas', 
            image: 'https://img56.tokyvideo.com/videos/483/483101/previews/previews_0012_custom_1706636955.2232.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/644615.mp4',
            description: 'Após um terremoto transformar Seul em uma terra sem lei, um caçador decide resgatar uma adolescente sequestrada por um médico insano.', 
            genres: ['aventura','ficcao científica','acao'],
            size: '2.5 GB',
            ageRating: '15 anos'
          },
          { 
            title: 'Pronto, Falei!', 
            image: 'https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2020/09/15/1789421635787/Blurt_Nordics_SA_Thumb_16.9_1920x1080_101620_382889_1920x1080.jpg', 
            url: 'https://sinalprivado.info/m3u8/MQ==/dnotYzIwYTAxMGMtYTk4/ZTNkMDQyYjMtZGM0Zi00NmMzLTljM2YtODA3YjE5ZTc5MmJm.m3u8',
            description: 'Um garoto "bonzinho" resolve experimentar óculos misteriosos de realidade virtual, ele acaba perdendo a sua "voz interna" e diz tudo o que pensa em voz alta!', 
            genres: ['comedia','romance'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          
          
           { 
            title: 'Vingadores: Era de Ultron', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/d5b18953b454a0d82e5a0e5b824a51b413d3d787f645e0b8cb1ba6804a4358a5.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/649237.mp4',
            description: 'Desta vez, a ameaça é uma forma de inteligência artificial chamada Ultron (voz de James Spader), degenerada de uma experiência de Tony Stark que tinha como objectivo conceber um programa informático que mantivesse a paz na Terra.',
            genres: ['acao','aventura','ficcao científica'],
            size: '2.5 GB',
            ageRating: '12 anos'
          }, 
          { 
            title: 'Ninja Assassino', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/c51f267a5ad686b0edd8ecaef93c922853b55725765523285b4e92a8d1da27f9.jpg',
            url: 'http://vods.conexao-vs.live:80/movie/648917.mp4',
            description: 'Raizo (Rain) é um dos assassinos mais temidos do mundo. Tirado das ruas na infância, foi treinado pelo clã Ozunu – um grupo secreto cuja existência', 
            genres: ['terror','acao','aventura'],
            size: '600 MB',
            ageRating: '18 anos'
          },
          { 
            title: 'A Morte do Superman', 
            image: 'https://image.tmdb.org/t/p/original/c3BQUy9AENkdd8us6OaB8GGBHc8.jpg', 
            url1080p: 'http://vods.conexao-vs.live/movie/646725.mp4',
            description: 'parece que só os poderes do Superman são compatíveis com o do terrível monstro. Em uma luta mortal, o destino do super-herói torna-se incerto.', 
            genres: ['aventura','acao'],
            size: '600 MB',
            ageRating: '14 anos'
          },
          { 
            title: 'No Limite do Amanhã', 
            image: 'https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2014/06/ed1.jpg', 
            url1080p: 'http://vods.conexao-vs.live:80/movie/648452.mp4',
            description: 'No entanto, quanto mais vezes ele luta, suas habilidades de guerreiro melhoram e ele fica mais perto de descobrir como derrotar o inimigo.', 
            genres: ['aventura','acao','ficcao científica'],
            size: '600 MB',
            ageRating: '16 anos'
          },
          { 
            title: 'As Branquelas', 
            image: 'https://img.tribunahoje.com/uI8dilXaJN47udUnz5y7fNkAaeo=/840x520/smart/s3.tribunahoje.com/uploads/imagens/asbranquelas2.jpg',
            url: 'http://vods.conexao-vs.live:80/movie/651445.mp4',
            description: 'Os irmãos Marcus (Marlon Wayans) e Kevin Copeland (Shawn Wayans) são detetives do FBI que estão com problemas no trabalho.', 
            genres: ['comedia','acao'],
            size: '600 MB',
            ageRating: '14 anos'
          }, 
           { 
            title: 'A Guerra do Amanhã', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/cc97bb7d0bbbf73ae48b8f1db71fa4b61837f1aff68d6f1194b6243f0effbde4._SX1080_FMjpg_.jpg',
            url: 'http://vods.conexao-vs.live:80/movie/649023.mp4',
            description: 'o futuro e se juntam à luta, entre eles Dan Forester, um pai de família determinado a salvar o mundo para sua filha.',
            genres: ['aventura','acao','ficcao científica'],
            size: '600 MB',
            ageRating: '12 anos'
          },
          { 
            title: 'O Filho do Máskara', 
            image: 'https://imagem.natelinha.uol.com.br/grande/ofilhodomaskara.jpg', 
            url480p: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url720p: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url1080p: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            url4K: 'http://vods.conexao-vs.live:80/movie/651244.mp4',
            description: 'Um bebê com super-poderes e Loki atrás da máscara.', 
            genres: ['comedia','aventura'],
            size: '1.1 GB',
            ageRating: '12 anos'
          },
          {
            title: "Loteria Fatal",
            image: "https://image.tmdb.org/t/p/original/rkmjKERkVIqG3DhwY4mcRYH1RFf.jpg",
            url1080p: "https://sinalprivado.info/cache/5eb80314-efce-4830-9349-21910f9a9b9f/playlist.m3u8",
            description: "Qualquer dia pode ser seu dia de sorte. Quando uma briga por um bilhete de loteria se torna mortal, o assassino (Angus Cloud) e as testemunhas do crime devem decidir até onde irão para obter uma parte dos 156 milhões de dólares.",
            genres: ["acao",'aventura'],
            size: "Unknown",
            ageRating: "18 anos"
          }
        ],
        'Séries': [
          { 
            title: 'Casa de Davi', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/b1a71a7669257836a43e41609f905e46860710310fb5344758eafb69d6b7f4f7.jpg',
            url1080p: '',
            description: 'Davi é ungido como rei pelo profeta Samuel, que o guia na sua jornada de descoberta e consumação do seu destino.',
            seasons: {
              1: [
                { name: 'Episódio 1x1', url: 'https://sinalprivado.info/cache/a11e36c4-7787-4309-b986-9317b9524d49/playlist.m3u8' },
               { name: 'Episódio 1x2', url: 'https://sinalprivado.info/cache/fff754a6-e174-4861-8b2d-6a3fd0c4d5fe/playlist.m3u8' },
               { name: 'Episódio 1x3', url: 'https://sinalprivado.info/cache/8df351b4-a00e-41ce-b0de-006ac7bb3523/playlist.m3u8' },
               { name: 'Episódio 1x4', url: 'https://sinalprivado.info/cache/78546026-1899-4ce2-9175-1a4ce05dc202/playlist.m3u8' },
               { name: 'Episódio 1x5', url: 'https://sinalprivado.info/cache/02ec24ac-c438-4bf6-99d8-a236c9520689/playlist.m3u8' },
               { name: 'Episódio 1x6', url: 'https://space.vscine.biz/series/CasadeDavi/1t/ep6/playlist.m3u8' }
              ]
            },
            genres: ['romance','aventura'],
            size: '10 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Demolidor: Renascido', 
            image: 'https://www.tupi.fm/wp-content/uploads/2025/03/demolidor_renascido.jpg',
            url1080p: 'https://exemplo.com/witcher-s1e1',
            description: 'Quando suas identidades passadas começam a emergir, seus caminhos se cruzam perigosamente',
            seasons: {
              1: [
                { name: 'Episódio 1x1', url: 'https://sinalprivado.info/cache/a11e36c4-7787-4309-b986-9317b9524d49/playlist.m3u8' },
               { name: 'Episódio 1x2', url: 'https://sinalprivado.info/cache/fff754a6-e174-4861-8b2d-6a3fd0c4d5fe/playlist.m3u8' },
               { name: 'Episódio 1x3', url: 'https://sinalprivado.info/cache/8df351b4-a00e-41ce-b0de-006ac7bb3523/playlist.m3u8' },
               { name: 'Episódio 1x4', url: 'https://sinalprivado.info/cache/78546026-1899-4ce2-9175-1a4ce05dc202/playlist.m3u8' },
               { name: 'Episódio 1x5', url: 'https://sinalprivado.info/cache/02ec24ac-c438-4bf6-99d8-a236c9520689/playlist.m3u8' },
               { name: 'Episódio 1x6', url: 'https://space.vscine.biz/series/CasadeDavi/1t/ep6/playlist.m3u8' }
              ]
            },
                 genres: ['aventura','acao'],
            size: '15 GB',
            ageRating: '13 anos'
          },
         { title: 'Cavaleiro da Lua', 
            image: 'https://rollingstone.com.br/media/uploads/2024/04/cavaleiro-da-lua-serie-da-marvel-com-oscar-isaac-tera-uma-2a-temporada-foto-divulgacaomarvel-studios.jpg',
            url1080p: 'https://exemplo.com/witcher-s1e1',
            description: 'navegar em suas complexas identidades enquanto mergulham em um mistério mortal entre os poderosos deuses do Egito.',
            seasons: {
              1: [
                { name: 'Episódio 1x1', url: 'http://vods.conexao-vs.live:80/series/178702.mp4' },
               { name: 'Episódio 1x2', url: 'http://vods.conexao-vs.live:80/series/178703.mp4' },
               { name: 'Episódio 1x3', url: 'http://vods.conexao-vs.live:80/series/178704.mp4' },
               { name: 'Episódio 1x4', url: 'http://vods.conexao-vs.live:80/series/178705.mp4' },
               { name: 'Episódio 1x5', url: 'http://vods.conexao-vs.live:80/series/178706.mp4' },
               { name: 'Episódio 1x6', url: 'http://vods.conexao-vs.live:80/series/178707.mp4' }
              ]
            },
                 genres: ['aventura','acao','ficcao científica'],
            size: '15 GB',
            ageRating: ' 14 anos'
          },  
          { 
            title: 'Série 2', 
            image: 'https://image.tmdb.org/t/p/w300/5qkog1Esn1OKoreg42Z1mIP0Fw.jpg', 
            url480p: 'https://embedder.net/e/1233208',
            url720p: 'https://embedder.net/e/1233208',
            url1080p: 'https://embedder.net/e/1233208',
            url4K: 'https://embedder.net/e/1233208',
            description: 'Descrição da Série 2', 
            genres: ['terror'],
            size: '8 GB',
            ageRating: '18 anos'
          }
        ],
        'Animes': [
          { 
            title: 'Solo Leveling', 
            image: 'https://i.ytimg.com/vi/75n91rq-9Ro/maxresdefault.jpg', 
            url1080p: 'https://www-fontedecanais-app.72urnh57ivdu70.com/series/solo%20leveling/242091.mp4?username=Visionplay-vods&content_id=260689&token=QURQWVpbTVlcXg==',
            description: 'O mundo de Solo Leveling é constantemente ameaçado por monstros e forças malignas. ',
            seasons: {
              1: [
                { name: 'Episódio 1x1', url: "http://vods.conexao-vs.live:80/series/260689.mp4" },
                { name: 'Episódio 1x2', url: 'http://vods.conexao-vs.live:80/series/270812.mp4' },
                { name: 'Episódio 1x3', url: 'http://vods.conexao-vs.live:80/series/270813.mp4' },
                { name: 'Episódio 1x4', url: 'http://vods.conexao-vs.live:80/series/270814.mp4' },
                { name: 'Episódio 1x5', url: 'http://vods.conexao-vs.live:80/series/275043.mp4' },
                { name: 'Episódio 1x6', url: 'http://vods.conexao-vs.live:80/series/279465.mp4' },
                { name: 'Episódio 1x7', url: 'http://vods.conexao-vs.live:80/series/285753.mp4' },
                { name: 'Episódio 1x8', url: 'http://vods.conexao-vs.live:80/series/301002.mp4' },
                { name: 'Episódio 1x9', url: 'http://vods.conexao-vs.live:80/series/307174.mp4' },
                { name: 'Episódio 1x10', url: 'http://vods.conexao-vs.live:80/series/313539.mp4' },
                { name: 'Episódio 1x11', url: '' },
                { name: 'Episódio 1x12', url: '' }
              ],
              2: [
                { name: 'Episódio 1 - Nova Aventura', url: 'sample-url-s2e1' },
                { name: 'Episódio 2 - Treinamento', url: 'sample-url-s2e2' }
              ]
            },
            genres: ['acao','aventura'],
            size: '20 GB',
            ageRating: '14 anos'
          },
         { 
            title: 'Dragon ball super: broly', 
            image: 'https://static-images.lpnt.fr/cd-cw809/images/2019/08/13/19197817lpw-19198225-article-jpg_6426493_660x287.jpg',
            url1080p: 'http://vods.conexao-vs.live:80/movie/646549.mp4',
            description: ' Como é possível que um Saiyajin esteja na Terra quando ele deveria ter sido destruído junto com o Planeta Vegeta? De volta do inferno mais uma vez, Freeza também aparece e os três Saiyajins que tiveram caminhos completamente diferentes se encontram em um intenso conflito.',
            seasons: {
             1 : [
                { name: 'Dragon Ball Super: Broly', url: 'http://vods.conexao-vs.live:80/movie/646549.mp4' }
              ]
            },
            genres: ['acao','drama'],
            size: '25 GB',
            ageRating: '14 anos'
          },
        { 
            title: 'Yasuke', 
            image: 'https://sm.ign.com/ign_br/gallery/a/assassins-/assassins-creed-shadows-art-and-concept-art_7a63.jpg',
            url1080p: '',
            description: 'Para proteger uma menininha que tem poderes misteriosos, o Samurai Negro, hoje um pacífico barqueiro, acaba se envolvendo em novas batalhas.',
            seasons: {
             1 : [
                { name: 'Episódio 1x1', url: 'http://vods.conexao-vs.live:80/series/144253.mp4' },
                { name: 'Episódio 1x2', url: 'http://vods.conexao-vs.live:80/series/144254.mp4' },
                { name: 'Episódio 1x3', url: 'http://vods.conexao-vs.live:80/series/144255.mp4' },
                { name: 'Episódio 1x4', url: 'http://vods.conexao-vs.live:80/series/144256.mp4' },
                { name: 'Episódio 1x5', url: 'http://vods.conexao-vs.live:80/series/144257.mp4' },
                { name: 'Episódio 1x6', url: 'http://vods.conexao-vs.live:80/series/144258.mp4' },
            ]
            },
            genres: ['aventura','romance'],
            size: '25 GB',
            ageRating: '14 anos'
          },
          { 
            title: 'Invincible', 
            image: 'https://www.serienjunkies.de/assets/images/33/649/33649689-mark-grayson-aka-invincible-37fe.jpg',
            url1080p: '',
            description: 'família e o próprio significado de ser um herói. Com reviravoltas chocantes, batalhas intensas e um enredo envolvente, "Invincible"',
            seasons: {
             1 : [
                { name: 'Episódio 1x1', url: 'http://vods.conexao-vs.live:80/series/250538.mp4' },
                { name: 'Episódio 1x2', url: 'http://vods.conexao-vs.live:80/series/250539.mp4' },
                { name: 'Episódio 1x3', url: 'http://vods.conexao-vs.live:80/series/250540.mp4' },
                { name: 'Episódio 1x4', url: 'http://vods.conexao-vs.live:80/series/250541.mp4' },
                { name: 'Episódio 1x5', url: 'http://vods.conexao-vs.live:80/series/250542.mp4' },
                { name: 'Episódio 1x6', url: 'http://vods.conexao-vs.live:80/series/250543.mp4' },
                { name: 'Episódio 1x7', url: 'http://vods.conexao-vs.live:80/series/250544.mp4' },
                { name: 'Episódio 1x8', url: 'http://vods.conexao-vs.live:80/series/250545.mp4' }
            ],
             2: [
                { name: 'Episódio 2x1', url: 'http://vods.conexao-vs.live:80/series/250546.mp4' },
                { name: 'Episódio 2x2', url: 'http://vods.conexao-vs.live:80/series/250547.mp4' },
                { name: 'Episódio 2x3', url: 'http://vods.conexao-vs.live:80/series/250548.mp4' },
                { name: 'Episódio 2x4', url: 'http://vods.conexao-vs.live:80/series/250549.mp4' },
                { name: 'Episódio 2x5', url: 'http://vods.conexao-vs.live:80/series/250550.mp4' },
                { name: 'Episódio 2x6', url: 'http://vods.conexao-vs.live:80/series/299940.mp4' },
                { name: 'Episódio 2x7', url: 'http://vods.conexao-vs.live:80/series/304596.mp4' },
                { name: 'Episódio 2x8', url: 'http://vods.conexao-vs.live:80/series/313295.mp4' },
                { name: 'Episódio 2x9', url: 'http://vods.conexao-vs.live:80/series/319593.mp4' }
              ],
              3: [
                { name: 'Episódio 3x1', url: 'https://space.vscine.biz/series/invencivel3t/1/playlist.m3u8' },
                { name: 'Episódio 3x2', url: 'https://space.vscine.biz/series/invencivel3t/2/playlist.m3u8' },
                { name: 'Episódio 3x3', url: 'https://space.vscine.biz/series/invencivel3t/3/playlist.m3u8' },
                { name: 'Episódio 3x4', url: 'ttps://space.vscine.biz/series/invencivel3t/4/playlist.m3u8' },
                { name: 'Episódio 3x5', url: 'https://space.vscine.biz/series/invencivel3t/5/playlist.m3u8' },
                { name: 'Episódio 3x6', url: 'https://space.vscine.biz/series/invencivel3t/6/playlist.m3u8' },
                { name: 'Episódio 3x7', url: 'https://space.vscine.biz/series/invencivel3t/7/playlist.m3u8' },
                { name: 'Episódio 3x8', url: 'https://space.vscine.biz/series/invencivel3t/8/playlist.m3u8' }
              ]
            },
            genres: ['acao','aventura'],
            size: '20 GB',
            ageRating: '16 anos'
          },
        ],
        'Desenhos': [
          { 
            title: '', 
            image: '',   
            url: '',
            description: '',
            seasons: {
              1: [
                { name: '', url: '' },
                { name: '', url: '' }
              ]
            },
            genres: [''],
            size: '',
            ageRating: ''
          },
          { 
            title: 'Meu Malvado Favorito', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/b4078edecb1ba5fd5bdcc9b1ff70d4311b44d4116ca9bd7dd0b5b60c11e2f31c.jpg', 
            url: 'https://sinalprivado.info/m3u8/MQ==/dnotYzIwYTAxMGMtYTk4/NTZlYmJhN2UtZTFmMy00ZmZmLTliZWYtYmFiN2E5MjAxNTZm.m3u8',
            description: 'Rodeado de um exército de pequenos ajudantes e seu arsenal de armas e máquinas de guerra, Gru se prepara para destruir quem atravessar seu caminho. Mas ele não esperava pelo seu maior desafio: três adoráveis órfãs que querem ter Gru como pai.', 
            genres: ['aventura','animacao','acao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Meu Malvado Favorito 2', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/7d6f42425ef00d2053f72b58f38ebb0e33109ba5f0f43784c9a4d405d9c9acc5.jpg', 
            url: 'https://sinalprivado.info/m3u8/MQ==/dnotYzIwYTAxMGMtYTk4/ZDdjNTQ4NzUtMzdjNC00ZWI3LTlkYzktNDllN2FkZTgzMjIz.m3u8',
            description: 'Ele só não contava que seu passado fosse responsável pelo seu recrutamento pela Liga Antivilões para salvar o mundo na companhia da agente Lucy. Juntos, eles precisam localizar o criminoso que roubou a fórmula PX41 e Gru desconfia que seu antigo concorrente El Macho possa ser o responsável.', 
            genres: ['aventura','animacao','acao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Meu Malvado Favorito 3', 
            image: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia14206/meu-malvado-favorito3.jpg', 
            url: 'https://sinalprivado.info/m3u8/MQ==/dnotYzIwYTAxMGMtYTk4/Y2Q5Y2ZjYzctZWNmZi00YjMwLWEyYzgtMjM2YTg4YjAzYWE1.m3u8',
            description: 'O ex-ator mirim e astro de TV, Balthazar Bratt, foi um típico malvado bem-sucedido nos anos 80 e agora está de volta à ativa. Ele vai aterrorizar a vida de Gru, Agnes, Margo, Edith, Dr. Nefario e os atrapalhados Minions. Em meio a tudo isso, Gru também vai encontrar o seu irmão gêmeo, Drew.', 
            genres: ['aventura','animacao','acao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Futebol em Apuros', 
            image: 'https://m.media-amazon.com/images/M/MV5BNWY5MGYxYmEtMTNkZi00ZGE2LTlkM2UtYTY1NjBkMThiZmNhXkEyXkFqcGc@._V1_.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646155.mp4',
            description: 'Quatro superfãs de futebol se unem para ajudar seus ídolos a recuperar o talento roubado por um cientista maluco.', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Meu Malvado Favorito 4', 
            image: 'https://d2s7f8q1bxluur.cloudfront.net/8ZTO0JXlKW9Dm__yS-KVUeYRPfQ=/954x500/https%3A//s3-sa-east-1.amazonaws.com/s3-eventos-saas/media/eventos/b7d2c3a0-fcfb-45d4-a4f4-f2d58c719faa.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/645979.mp4',
            description: 'Nesta sequência, o vilão mais amado do planeta retorna e agora Gru, Lucy, Margo, Edith e Agnes dão as boas-vindas a um novo membro da família: Gru Jr., que pretende atormentar seu pai. Enquanto se adapta com o pequeno, Gru enfrenta um novo inimigo, Maxime Le Mal, forçando sua namorada Valentina e a família a fugir do perigo.', 
            genres: ['aventura','animacao','acao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
            { 
            title: 'Hotel Transilvânia', 
            image: 'https://cinemacao.com/wp-content/uploads/2016/03/hotel-2.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646673.mp4',
            description: 'O local é comandado pelo Conde Drácula, que resolve convidar os amigos para comemorar o 118º aniversário de sua filha, Mavis. O que ele não esperava era que Jonathan, um humano sem noção, fosse aparecer no local justo quando o hotel está repleto de convidados e, ainda por cima, se apaixonasse por Mavis.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Hotel Transilvânia 2', 
            image: 'https://wallpapers.com/images/hd/dracula-with-family-hotel-transylvania-2-poster-c47cbvzgfyz1b7t6.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646675.mp4',
            description: 'Drácula percebe que seu neto, que é metade humano, não está mostrando seu lado vampiro. O avô preocupado, ao lado de seus amigos, decide colocar o menino em um treinamento especial enquanto Mavis e Johnny estão fora. Para piorar, o pai de Drácula aparece para uma visita.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Hotel Transilvânia 3: Férias Monstruosas', 
            image: 'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/CNJE2JSJZRLKBMM4HAWZPOV7WA.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646674.mp4',
            description: 'Solitário e infeliz, buscando um novo amor na internet, Drácula é surpreendido com um presente da querida filha: férias em um cruzeiro. Inicialmente resistente à ideia, ele acaba engajado no passeio ao se encantar pela comandante, que, no entanto, esconde um segredo nada amigável.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Hotel Transilvânia 4: Transformonstrão', 
            image: 'https://musicart.xboxlive.com/7/8e206500-0000-0000-0000-000000000002/504/image.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646232.mp4',
            description: 'Drac e sua turma acabam sendo transformados em humanos após uma invenção de Van Helsing. Agora, eles precisam viajar até a Floresta Amazônica para encontrar o que pode ser a única solução para reverter a transformação, antes que seus poderes se percam para sempre.',
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
           { 
            title: 'Gato Sórdido', 
            image: 'https://www.magazine-hd.com/apps/wp/wp-content/uploads/2018/10/gato-mau.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/651464.mp4?token=ecc673969e4b9cab1b37f9c112fc19ec3725c5b1235cd44fc3354f1dce8d87d8&expires=1743204464',
            description: 'Como os animais que habitam as ruas, Shero e seus amigos estão atrás do que qualquer pessoa na sua vizinhança de Istambul: fazendo deboche com mulheres, procurando comida e uma bebedeira ocasional.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '13 anos'
          },
           { 
            title: '', 
            image: '', 
            url: '',
            description: '', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: '', 
            image: '', 
            url: '',
            description: '', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: '', 
            image: '', 
            url: '',
            description: '', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: '', 
            image: '', 
            url: '',
            description: '', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: '', 
            image: '', 
            url: '',
            description: '', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          
          { 
            title: 'O Aprendiz do Tigre', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/a97181a42c03033e3d9e280a0a194379046aedfd6a13bae3144dc758160a953e.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646025.mp4',
            description: 'Conta a história de Tom, um menino que se torna aprendiz de feiticeiro ao conhecer o tigre falante Mr. Hu. O animal muda de forma e leva o garoto a um mundo mágico com outros seres mitológicos, como a fênix e o dragão.', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
           { 
            title: 'Flow', 
            image: 'https://m.media-amazon.com/images/S/pv-target-images/3d4f0a9dc2fd8e0dcbca256e5dc08e32f9c3bf8b560a1171ae7bcbea7814b7f3.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/645926.mp4',
            description: 'Gato é um animal solitário, mas quando seu lar é destruído por uma grande inundação, ele encontra refúgio em um barco habitado por diversas espécies, tendo que se juntar a elas apesar das diferenças.', 
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Orion e o Escuro', 
            image: 'https://i.ytimg.com/vi/2NZJRonxIp8/hq720.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646029.mp4',
            description: 'Com uma imaginação fértil, um garoto encara seus medos em uma jornada inesquecível pela noite ao lado do novo amigo Escuro, uma criatura gigante e sorridente.',
            genres: ['aventura','animacao'],
            size: '2.5 GB',
            ageRating: '12 anos'
          },
          { 
            title: 'Madagascar 3: Os Procurados', 
            image: 'https://img24.tokyvideo.com/videos/319/319562/previews/previews_0012_custom_1693064485.3845.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646661.mp4',
            description: 'Nossos amigos animais Alex, Marty, Glória e Melman vão para a Europa e passam a ser perseguidos por uma agente de controle de animais. Para despistá-la, eles se juntam a um grupo circense que sonha em se apresentar em Nova York, o lar dos animais.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '10 anos'
          },
          { 
            title: 'Madagascar 2: A Grande Escapada', 
            image: 'https://i.ytimg.com/vi/Kys85HD5_jg/maxresdefault.jpg',
            url: 'http://vods.conexao-vs.live:80/movie/646662.mp4',
            description: 'Para deixar o local os pingüins consertam um velho avião de guerra, mas logo em seu 1º vôo ele cai. Isto faz com que os animais do zoológico de Nova York tenham que lidar, pela 1ª vez na vida, com espécies semelhantes a eles, só que habituadas à vida selvagem.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '10 anos'
          },
           { 
            title: 'Madagascar', 
            image: 'https://comicbook.com/wp-content/uploads/sites/4/2022/08/fe1bee9d-a86f-4bea-92ef-45061f790df6.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646663.mp4',
            description: 'O trio encontra Marty na estação Grand Central do metrô, mas antes que consigam voltar para casa são atingidos por dardos tranquilizantes e capturados. Embarcados em um navio rumo à África, eles acabam na ilha de Madagascar, onde precisam encontrar meios de sobrevivência em uma selva verdadeira.', 
            genres: ['aventura','animacao','comedia'],
            size: '2.5 GB',
            ageRating: '10 anos'
          },
          { 
            title: 'Frozen: Uma Aventura Congelante', 
            image: 'https://br.web.img2.acsta.net/pictures/210/461/21046189_20131002174340886.jpg', 
            url: 'http://vods.conexao-vs.live:80/movie/646680.mp4',
            description: '',
            seasons: {
              1: [
                { name: 'Frozen 1 -Uma Aventura Congelante', url: 'http://vods.conexao-vs.live:80/movie/646680.mp4' },
                { name: 'Frozen 2 - O Reino do Gelo ', url: 'http://vods.conexao-vs.live:80/movie/646499.mp4' }
              ]
            },
            genres: ['aventura','animacao'],
            size: '15 GB',
            ageRating: 'Livre'
          }
        ],
        'TV Ao Vivo': [
          { 
            title: 'Globo', 
            image: 'http://192.168.1.6:8080/files/Download/filpley_icon_128x128.png', 
            description: 'Rede Globo - Programação ao vivo', 
            url: 'https://play.mycinevs.com/GLOBO/index.m3u8',
            genres: ['tv','entretenimento'],
            size: 'Live',
            ageRating: 'Livre'
          },
          { 
            title: 'SBT', 
            image: 'https://upload.wikimedia.org/wikipedia/pt/1/1d/Logotipo_do_SBT.png', 
            description: 'SBT - Sistema Brasileiro de Televisão', 
            url: 'https://play.mycinevs.com/SBT/index.m3u8',
            genres: ['tv','entretenimento'],
            size: 'Live',
            ageRating: 'Livre'
          },
          { 
            title: 'Record', 
            image: 'https://upload.wikimedia.org/wikipedia/pt/1/1b/Logotipo_da_Record.png',
            description: 'Record TV - Programação ao vivo', 
            url: 'https://play.mycinevs.com/RECORD/index.m3u8',
            genres: ['tv','entretenimento'],
            size: 'Live',
            ageRating: 'Livre'
          },
          { 
            title: 'Band', 
            image: 'https://upload.wikimedia.org/wikipedia/pt/c/c7/Logotipo_da_Band.png', 
            description: 'Band - Programação ao vivo', 
            url: 'https://play.mycinevs.com/BAND/index.m3u8',
            genres: ['tv','entretenimento'],
            size: 'Live',
            ageRating: 'Livre'
          },
          { 
            title: 'ESPN Brasil', 
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/ESPN_Logo.svg/1200px-ESPN_Logo.svg.png', 
            description: 'ESPN Brasil - Transmissão ao vivo', 
            url: 'https://exemplo.com/espn-live',
            genres: ['esportes','tv'],
            size: 'Live',
            ageRating: 'Livre'
          },
          { 
            title: 'Sport TV', 
            image: 'https://upload.wikimedia.org/wikipedia/pt/b/b5/Logo_SporTV.png', 
            description: 'SporTV - Canais Esportivos', 
            url: 'https://exemplo.com/sportv-live',
            genres: ['esportes','tv'],
            size: 'Live',
            ageRating: 'Livre'
          }
        ]
      })
      const filteredContent = computed(() => {
        const searchLower = searchQuery.value.toLowerCase()
        const result = {}
        const genreMapping = {
               "animação": "animacao",
 "Ficção Científica": "ficcao científica",
            "Ação": "acao",
         "Aventura": "aventura",
      "Comédia": "comedia",
      "Horror": "horror",
   "Romance": "romance",
 "Terror": "terror"
        }
        Object.keys(content.value).forEach(group => {
          let items = content.value[group]
          if (selectedCategory.value) {
            if (group === selectedCategory.value) {
            } 
            else if (genreMapping[selectedCategory.value]) {
              items = items.filter(item =>
                item.genres && item.genres.some(g => g.toLowerCase() === genreMapping[selectedCategory.value])
              )
            } 
            else {
              items = []
            }
          }
          if (searchQuery.value) {
            items = items.filter(item => item.title.toLowerCase().includes(searchLower))
          }
          if (items.length > 0) {
            result[group] = items
          }
        })
        return result
      })
      const goToProfile = () => {
        screen.value = 'profile'
      }
      const goBackToMain = () => {
        screen.value = 'main'
      }
      const logout = () => {
        currentUser.value = null
        screen.value = 'start'
      }
      const ratingValue = ref(null)
      const ratings = ref([])
      const submitRating = () => {
        if (!currentUser.value) {
          alert('Faça login para avaliar o conteúdo.')
          return
        }
        if (!ratingValue.value) {
          alert('Selecione uma avaliação.')
          return
        }
        const newRating = {
          user: currentUser.value.name,
          content: currentContent.value ? currentContent.value.title : 'Conteúdo desconhecido',
          rating: Number(ratingValue.value)
        }
        ratings.value.push(newRating)
        localStorage.setItem('ratings', JSON.stringify(ratings.value))
        alert('Avaliação salva com sucesso!')
        ratingValue.value = null
      }
      const getVideoUrl = (item) => {
        if (item.url4K) return item.url4K;
        if (item.url1080p) return item.url1080p;
        if (item.url720p) return item.url720p;
        return item.url480p || item.url;
      }
      onMounted(() => {
        const heroRotationInterval = setInterval(rotateHeroBanner, 5000)
        const savedUsers = localStorage.getItem('users')
        if (savedUsers) {
          users.value = JSON.parse(savedUsers)
        }
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
          favorites.value = JSON.parse(savedFavorites)
        }
        const savedRatings = localStorage.getItem('ratings')
        if (savedRatings) {
          ratings.value = JSON.parse(savedRatings)
        }
        
        const keydownHandler = (event) => {
          if (event.key.toLowerCase() === 'b' && screen.value === 'player') {
            submitRating();
          }
        }
        window.addEventListener('keydown', keydownHandler);
        
        return () => {
          clearInterval(heroRotationInterval);
          window.removeEventListener('keydown', keydownHandler);
        }
      })
      
      return {
        screen,
        email,
        password,
        name,
        currentVideoUrl,
        videoDuration,
        currentTime,
        isEpisodeEnd,
        users,
        content,
        currentContent,
        currentSeason,
        currentEpisode,
        searchQuery,
        favorites,
        audioTracks,
        selectedAudio,
        subtitleTracks,
        subtitlesEnabled,
        selectedSubtitle,
        subtitleSize,
        subtitleColor,
        volumeLevel,
        isMuted,
        heroBanners,
        currentHeroBannerIndex,
        showLogin,
        showSignup,
        goBack,
        goBackAuth,
        login,
        signup,
        playContent,
        selectEpisode,
        selectSeason,
        playNextEpisode,
        closePlayer,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        showPlans,
        showContentDetails,
        selectedSeasonInDetails,
        selectSeasonInDetails,
        playContentFromDetails,
        updateVideoTime,
        setVideoDuration,
        changeAudio,
        toggleSubtitles,
        adjustVolume,
        muteToggle,
        selectedCategory,
        filterByCategory,
        filteredContent,
        currentUser,
        goToProfile,
        goBackToMain,
        logout,
        ratingValue,
        ratings,
        submitRating
      }
    }
  })
    
  app.mount('#app')
