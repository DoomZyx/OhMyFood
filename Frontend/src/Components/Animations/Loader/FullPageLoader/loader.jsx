import "./_loader.scss";

function Loader() {
  return (
    <div className="sk-fading-circle-fp">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`sk-circle-fp sk-circle${i + 1}-fp`}></div>
        ))}
    </div>
  );
}

export default Loader;
