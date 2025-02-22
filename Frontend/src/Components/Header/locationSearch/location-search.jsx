import "./_location-search.scss";

function LocationSearch() {
  return (
    <div className="location-search">
      <div className="location-icon"></div>
      <form>
        <label htmlFor="city" className="icon-label">
          <i className="fa-solid fa-location-dot"></i>
        </label>
        <input
          type="search"
          id="city"
          name="city"
          placeholder="Paris, Belleville"
        />
      </form>
    </div>
  );
}

export default LocationSearch;
