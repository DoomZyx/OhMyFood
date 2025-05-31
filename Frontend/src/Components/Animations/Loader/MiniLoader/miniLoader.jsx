import "./miniLoader.scss";

function MiniLoader() {
  return (
    <div className="sk-fading-circle">
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`sk-circle sk-circle${i + 1}`}></div>
      ))}
    </div>
  );
}

export default MiniLoader;
