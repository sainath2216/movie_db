import "./index.css"

const MoviesDetails = props =>{
    const {moviesData} = props
    const{
        years,
        launchYear,
        players,
        rank,
        show,
        genre,
        title,
        imageUrl,
    } = moviesData
    
    return(
        <div className="list-container">
            <li className="list">
            <img
              src={imageUrl} alt="img"
            />
            <h1 className="title-heading">Title: {title}</h1>
            <p className="title-heading">Genre: {genre}</p>
            <p className="title-heading">Show Type: {show}</p>
            <p className="title-heading">Rank: {rank}</p>
            <p className="title-heading">Cast: {players}</p>
            <p className="title-heading">Released Year: {launchYear}</p>
            <p className="title-heading">Years: {years}</p>
            </li>
        </div>
    )
}

export default MoviesDetails