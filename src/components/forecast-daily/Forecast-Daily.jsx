import MessageCard from "./sub-components/Message-Card";
import ForecastCard from "./sub-components/Forecast-Card";

export default function ForecastDaily({ weatherData, loading, error }) {
  // prevents the issue noted here: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  function formatDate(dateString) {
    const date = new Date(dateString.replace(/-/g, "/"));

    const formattedDate = date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });

    return formattedDate;
  }

  function roundedToFixed(input, digits) {
    var rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
  }

  const dailyForecastCards = weatherData?.forecast?.forecastday.map(
    (
      {
        date,
        day: {
          mintemp_f,
          maxtemp_f,
          daily_chance_of_rain,
          totalprecip_in,
          daily_chance_of_snow,
          totalsnow_cm,
          condition: { text, icon },
        },
      },
      key
    ) => (
      <ForecastCard
        date={formatDate(date)}
        mintempF={Math.round(mintemp_f)}
        maxTempF={Math.round(maxtemp_f)}
        dailyChanceOfRain={daily_chance_of_rain}
        totalPrecipIn={totalprecip_in}
        dailyChanceOfSnow={daily_chance_of_snow}
        totalSnowIn={roundedToFixed(totalsnow_cm / 2.54, 0)}
        conditionImage={icon}
        conditionDescription={text}
        key={key}
      ></ForecastCard>
    )
  );

  if (loading) {
    return (
      <>
        <MessageCard mainContent="loading" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MessageCard mainContent={error} />
      </>
    );
  }

  if (!weatherData.forecast) {
    return (
      <>
        <MessageCard mainContent="Please use the search box above to make a selection" />
      </>
    );
  }

  return (
    <>
      <MessageCard
        headingLead="weather for"
        heading={weatherData?.location?.name + ", "}
        headingLight={weatherData?.location?.region}
        headingTrailer={weatherData?.location?.country}
      />
      {dailyForecastCards}
    </>
  );
}
