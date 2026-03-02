export default function Button({
  textContent,
  className,
  onClick,
  type = 'button',
}) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {textContent}
    </button>
  );
}
