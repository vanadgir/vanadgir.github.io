const OverlayContentLink = ({ title, description, onActivate }) => {
  return (
    <button
      type="button"
      className="info-item-button"
      onClick={onActivate}
    >
      <span className="info-item-title">{title}</span>
      {description && (
        <span className="info-item-description">{description}</span>
      )}
    </button>
  );
};

export default OverlayContentLink;
