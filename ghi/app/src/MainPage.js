
function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="title display-5 fw-bold">Double I Auto</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
        Please contact carmax if you really need it.
        </p>
      </div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://img2.carmax.com/assets/23394508/hero.jpg?width=800&height=450" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className="slide-label">$14,599</h5>
        <p className="description-text">2014 Dodge Journey American Value</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://img2.carmax.com/assets/23696116/hero.jpg?width=800&height=450" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className="slide-label">$23,998</h5>
        <p className="description-text">2013 Land Rover Range Rover Evoque Pure Plus</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://img2.carmax.com/assets/23669840/hero.jpg?width=800&height=450" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className="slide-label">$21,998</h5>
        <p className="description-text">2013 Mercedes-Benz GLK350</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  );
}

export default MainPage;
