function CountryItem({ country }) {
  return (
    <li className="flex flex-col items-center gap-0.5 text-[1.7rem] font-semibold bg-dark-2 rounded-card px-5 py-2.5 border-l-5 border-l-brand-1">
      <span className="text-3xl leading-none">{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
