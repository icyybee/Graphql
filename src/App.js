import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const DisplayLocations = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const {name, currency, capital, native, emoji} = data.country;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div key={name}>
      <h3>{name}</h3>
      <br />
      <b>About this location:</b>
      <ol>
        <li>Capital is known as {capital}</li>
        <li>Its symbol is {emoji}</li>
        <li>Its native is {native}</li>
        <li>Currency: {currency}</li> 
        {data.country.languages.map( (lang) => (
        <ol>
          <li>Languages: {lang.name}</li>
          <li>Languages Code: {lang.code}</li>
        </ol>
        ))}
      </ol>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h2>Let's Know Our Countries 🚀</h2>
      <DisplayLocations />
    </div>
  );
}

export default App;