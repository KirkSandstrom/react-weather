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
      <div className="forecast-card__row forecast-card__row--flex-wrap">
        <p className="forecast-card__date">{date}</p>
        <img
          className="forecast-card__condition-img"
          src={conditionImage}
        ></img>
        <p className="forecast-card__temp-container">
          <span className="forecast-card__max-temp">{maxTempF}&deg;</span>
          <span className="forecast-card__min-temp"> /{mintempF}&deg;</span>
        </p>
      </div>
      <div className="forecast-card__row">
        <p className="forecast-card__condition">{conditionDescription}</p>
      </div>
      <div className="forecast-card__text-row">
        <div className="forecast-card__text-row-group">
          <div className="forecast-card__text-row-group-inner">
            <span>Chance of Rain</span>
            <span className="font-weight-bold">{dailyChanceOfRain}%</span>
          </div>
        </div>
        <div className="forecast-card__text-row-group">
          <div className="forecast-card__text-row-group-inner">
            <span>Total Rain Fall</span>
            <span className="font-weight-bold">{totalPrecipIn}"</span>
          </div>
        </div>
      </div>
      <div className="forecast-card__text-row">
        <div className="forecast-card__text-row-group">
          <div className="forecast-card__text-row-group-inner">
            <span>Chance of Snow</span>
            <span className="font-weight-bold">{dailyChanceOfSnow}%</span>
          </div>
        </div>
        <div className="forecast-card__text-row-group">
          <div className="forecast-card__text-row-group-inner">
            <span>Total Snow Fall</span>
            <span className="font-weight-bold">{totalSnowIn}"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
