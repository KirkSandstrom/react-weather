export default function ForecastCard({
  date,
  mintempF,
  maxTempF,
  dailyChanceOfRain,
  totalPrecipIn,
  dailyChanceOfSnow,
  totalSnowIn,
  conditionImage,
  conditionDescription,
}) {
  return (
    <div className="forecast-card">
      <div className="forecast-card--row">
        <p className="forecast-card--date">{date}</p>
        <img
          className="forecast-card--condition-img"
          src={conditionImage}
        ></img>
        <p className="forecast-card--temp-container">
          <span className="forecast-card--max-temp">{maxTempF}&deg;</span>
          <span className="forecast-card--min-temp"> /{mintempF}&deg;</span>
        </p>
      </div>
      <div className="forecast-card--row">
        <p className="forecast-card--condition">{conditionDescription}</p>
      </div>
      <div className="forecast-card--text-row">
        <div className="forecast-card--text-row-group">
          <div className="forecast-card--text-row-group-inner">
            <span>Chance of Rain</span>
            <span className="font-weight-bold">{dailyChanceOfRain}%</span>
          </div>
        </div>
        <div className="forecast-card--text-row-group">
          <div className="forecast-card--text-row-group-inner">
            <span>Total Rain Fall</span>
            <span className="font-weight-bold">{totalPrecipIn}"</span>
          </div>
        </div>
      </div>
      <div className="forecast-card--text-row">
        <div className="forecast-card--text-row-group">
          <div className="forecast-card--text-row-group-inner">
            <span>Chance of Snow</span>
            <span className="font-weight-bold">{dailyChanceOfSnow}%</span>
          </div>
        </div>
        <div className="forecast-card--text-row-group">
          <div className="forecast-card--text-row-group-inner">
            <span>Total Snow Fall</span>
            <span className="font-weight-bold">{totalSnowIn}"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
