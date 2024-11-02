export const Message = ({ className, title, text }) => {
  return (
    <div className={`px-4 py-3 rounded ${className}`} role="alert" id="alert">
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline">{text}</span>
    </div>
  );
};
