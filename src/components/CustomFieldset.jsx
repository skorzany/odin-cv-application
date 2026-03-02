export default function CustomFieldset({
  legend,
  wrapperClass,
  legendClass,
  children,
}) {
  return (
    <fieldset className={wrapperClass}>
      <legend className={legendClass}>{legend}</legend>
      {children}
    </fieldset>
  );
}
