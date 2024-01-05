export default function MessageCard({
  headingLead,
  heading,
  headingLight,
  headingTrailer,
  mainContent,
}) {
  return (
    <div className="message-card">
      <h1>
        <span className="message-card__heading message-card__heading--lead">
          {headingLead}
        </span>
        <span className="message-card__heading">{heading}</span>
        <span className="message-card__heading message-card__heading--light">
          {headingLight}
        </span>
        <span className="message-card__heading message-card__heading--trailer">
          {headingTrailer}
        </span>
      </h1>
      <p>{mainContent}</p>
    </div>
  );
}
