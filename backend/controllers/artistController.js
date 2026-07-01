const DEEZER_BASE_URL = "https://api.deezer.com";

const searchArtists = async(req, res) => {

  try{
    const artistName = req.query.artistName;

    if(!artistName){
      return res.status(400).json({message: "Artist name is not found"});
    }

    const response = await fetch(
      `${DEEZER_BASE_URL}/search/artist?q=${artistName}`
    );

    const data = await response.json();

    res.status(200).json(data);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

const getArtistById = async(req, res) => {
  try{
    const artistId = req.params.id;

    const response = await fetch(
      `${DEEZER_BASE_URL}/artist/${artistId}`
    );
    const data = await response.json();
    res.status(200).json(data);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

const getRelatedArtists = async(req, res) => {
  try{
    const artistId = req.params.id;
    const response = await fetch(
      `${DEEZER_BASE_URL}/artist/${artistId}/related`
    );
    const data = await response.json();
    res.status(200).json(data);
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

export{searchArtists, getArtistById, getRelatedArtists};