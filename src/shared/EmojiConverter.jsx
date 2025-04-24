// export const flagemojiToPNG2 = (flag) => {
//   const countryFlag = flag.toLowerCase();

//   return (
//     <img src={`https://flagcdn.com/24x18/${countryFlag}.png`} alt="flag" />
//   );
// };

export const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};
