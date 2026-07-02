<!-- index.php -->
<?php include("header.php"); ?>

<section class="hero-section">
  <div class="hero-content">
    <h4>12–14 July / New York</h4>
    <h1>The Ultimate Musical <br>Extravaganza!</h1>
    <a href="register.php" class="btn-primary">Register Now</a>
  </div>
</section>

<section class="event-section">
  <div class="container">
    <div class="columns">
      <!-- Left Content -->
      <div class="left">
        <span class="subheading">Rhythm & Harmony</span>
        <h2>About Last Night</h2>
        <p>
          Relive the magic and energy of last night's Music Event! The evening was
          filled with breathtaking performances by legendary artists that left the
          audience in awe. Whether it was the soulful tunes or the electrifying beat,
          the crowd couldn't have enough of it! Check out our post-event recap to
          relive those fantastic moments and feel the music once again.
        </p>

        <div class="stats">
          <div><span class="count">15+</span><br><small>Music Artists</small></div>
          <div><span class="count">100+</span><br><small>Songs</small></div>
          <div><span class="count">10+</span><br><small>Places</small></div>
        </div>
      </div>

      <!-- Right Image -->
      <div class="right">
        <div class="image-wrapper">
          <img src="assets/home-vid-img.jpg" alt="Music Event">
          <div class="play-button">
            <span>&#9658;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="intro-container" style=" margin-top: 30px;">
    <p class="intro-sub" style=" text-align: center; padding-top: 50px; color: #2ad0bc;">Get ready for an unforgettable journey through music</p>
    <h2 class="intro-heading" style=" text-align: center; padding-top: 30px; padding-bottom: 20px; font-size: 44px; padding-left: 200px; padding-right: 200px;">Here's a glimpse into the event schedule,<br> so you can plan your day and ensure you don't miss a single moment!</h2>
  </div>

  <style>
  .schedule-section {
    background-color: #0c1d3c;
    padding: 50px 20px;
    color: #fff;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .schedule-item {
    background-color: #172943;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
  }

  .schedule-item:hover {
    transform: translateY(-5px);
  }

  .schedule-item h3 {
    font-size: 22px;
    color: #00d084;
    margin-bottom: 10px;
  }

  .schedule-item p {
    font-size: 16px;
    font-weight: 500;
  }
</style>

  <div class="schedule-section">
  <div class="schedule-grid">
    <div class="schedule-item">
      <h3>6:00 PM</h3>
      <p>Opening Act</p>
    </div>
    <div class="schedule-item">
      <h3>7:30 PM</h3>
      <p>Ethan Anderson</p>
    </div>
    <div class="schedule-item">
      <h3>9:00 PM</h3>
      <p>Olivia Thompson</p>
    </div>
    <div class="schedule-item">
      <h3>10:30 PM</h3>
      <p>Benjamin Reed</p>
    </div>
    <div class="schedule-item">
      <h3>12:30 AM</h3>
      <p>Grand Finale - All-Star Jam</p>
    </div>
    <div class="schedule-item">
      <h3>2:30 AM</h3>
      <p>Luna Sparks – Acoustic Sunset Performance</p>
    </div>
    <div class="schedule-item">
      <h3>12:30 AM</h3>
      <p>Grand Finale - All-Star Jam</p>
    </div>
    <div class="schedule-item">
      <h3>12:30 AM</h3>
      <p>Grand Finale - All-Star Jam</p>
    </div>

  </div>
</div>

<div style="text-align: center;">
    <a href="register.php" class="btn-primary">Register Now</a>
</div>

<div class="intro-container">
    <p class="intro-sub" style=" text-align: center; padding-top: 50px; color: #2ad0bc;">GALLERY</p>
    <h2 class="intro-heading" style=" text-align: center; padding-top: 30px; padding-bottom: 20px; font-size: 44px; padding-left: 200px; padding-right: 200px;">Take a glimpse into the electrifying atmosphere and memorable moments from our past music events.
</h2>
  </div>

  <style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1250px;
    margin: auto;
  }
  .gallery img {
    width: 100%;
    height: auto;
    display: block;
    margin-top: 30px;
    object-fit: cover;
    border-radius: 8px;
  }
</style>
<section class="gallery">
   <img src="assets/gallery-04.jpg" alt="Image 1" />
  <img src="assets/gallery-01.jpg" alt="Image 2" />
  <img src="assets/gallery06.jpg" alt="Image 3" />
  <img src="assets/gallery-03.jpg" alt="Image 4" />
  <img src="assets/gallery-02.jpg" alt="Image 5" />
  <img src="assets/gallery-05.jpg" alt="Image 6" />
</section>

<div style="text-align: center; margin-top: 40px;">
    <a href="register.php" class="btn-primary">Register Now</a>
</div>
</section>


<?php include("footer.php"); ?>
