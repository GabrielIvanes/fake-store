import data from "../data.json";
import "../styles/Filters.css";

interface Artist {
  name: string;
}

interface Filter {
  artist: string;
  isChecked: boolean;
}

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: number;
  name: string;
  artist: string;
  liked: boolean;
}

interface Props {
  handleInputCheck: (artist: string) => void;
  filtersArray: Filter[];
}

function Filters({ handleInputCheck, filtersArray }: Props) {
  const artists: Artist[] = data.reduce((acc: Artist[], paint: Product) => {
    const isArtistInAcc = acc.find(
      (item: Artist) => item.name === paint.artist
    );
    if (!isArtistInAcc) {
      acc.push({ name: paint.artist });
    }
    return acc;
  }, []);
  return (
    <div className="filter-artist-box">
      <div className="filter-artist-dropdown">
        <span>Artists</span>
        <div className="filter-artist-dropdownContent">
          {artists.map((artist) => {
            return (
              <div key={artist.name}>
                {filtersArray[
                  filtersArray.findIndex(
                    (filter) => filter.artist === artist.name
                  )
                ]?.isChecked ? (
                  <input
                    type="checkbox"
                    onClick={() => handleInputCheck(artist.name)}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="checkbox"
                    onClick={() => handleInputCheck(artist.name)}
                  />
                )}

                <div key={artist.name}>{artist.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
